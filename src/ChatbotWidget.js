import './styles/main.css';
import { svgIcons } from './svg-icons.js';
import { CHATBOT_CONFIG } from './config/constants.js';
import { FloatingButton } from './components/FloatingButton.js';
import { MessageManager } from './components/MessageManager.js';
import { getBotResponse, simulateTyping, isValidMessage, formatMessage } from './utils/botUtils.js';
import { focusElement, addStyles, addRippleToAllButtons } from './utils/domUtils.js';
import { debugManager, checkChatbotStatus, getSystemInfo } from './utils/debugUtils.js';

export class ChatbotWidget {
    constructor(containerId = 'app') {
        this.isExpanded = false;
        this.isVisible = false;
        this.startTime = new Date(); // Tiempo de inicio para estadísticas
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`No se encontró el contenedor con id '${containerId}'`);
        }

        // Inicializar debug
        debugManager.info('ChatbotWidget initialized', { containerId });

        // Crear el chatbot PRIMERO
        this.container.innerHTML = this.getChatbotHTML();
        
        // Inicializar componentes DESPUÉS de crear el HTML
        this.messageManager = new MessageManager('chatMessages');
        this.floatingButton = new FloatingButton(() => this.toggleChatbot());
        
        this.init();
    }

    getChatbotHTML() {
        return `
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="header-left">
                        <div class="logo-container">
                           ${svgIcons.LOGO} 
                        </div>
                        <h2 class="chatbot-title">Smartbot</h2>
                    </div>
                    <div class="header-controls">
                        <button class="expand-btn" id="expandBtn">
                            ${svgIcons.EXPAND}
                        </button>
                        <button class="dropdown-btn" id="closeBtn">
                            ${svgIcons.DROPDOWN}
                        </button>
                    </div>
                </div>

                <div class="search-container">
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Buscar información...">
                        <button class="search-btn" id="searchBtn">
                            ${svgIcons.SEARCH}
                        </button>
                    </div>
                </div>

                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-avatar">
                            <div class="bot-avatar">
                                ${svgIcons.BOT_AVATAR}
                            </div>
                        </div>
                        <div class="message-content">
                            <div class="message-bubble bot-bubble">
                                ¡Hola! soy tu smartbot. Estoy aquí para ayudarte en lo que necesites o quieras saber sobre créditos hipotecarios.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chat-input-container">
                    <div class="input-wrapper">
                        <button class="attachment-btn">
                            ${svgIcons.ATTACHMENT}
                        </button>
                        <input type="text" id="messageInput" placeholder="Escribe un mensaje">
                        <button class="send-btn" id="sendBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        this.addChatbotStyles();
        this.bindEvents();
        this.setupInitialState();
        this.addWelcomeMessage();
        this.floatingButton.show();
    }

    addChatbotStyles() {
        const styles = `
            .chatbot-container {
                position: fixed;
                bottom: ${CHATBOT_CONFIG.CHATBOT_POSITION.BOTTOM};
                right: ${CHATBOT_CONFIG.CHATBOT_POSITION.RIGHT};
                z-index: 999;
                display: none;
                width: ${CHATBOT_CONFIG.WIDTH}px;
                height: ${CHATBOT_CONFIG.HEIGHT}px;
            }
            
            .chatbot-container.visible {
                display: flex;
            }
            
            .chatbot-container.minimized {
                display: none;
            }
            
            .chatbot-container.expanded {
                width: ${CHATBOT_CONFIG.EXPANDED_WIDTH}px;
                height: ${CHATBOT_CONFIG.EXPANDED_HEIGHT}px;
            }
        `;
        addStyles(styles);
    }

    bindEvents() {
        // Expand button
        const expandBtn = document.getElementById('expandBtn');
        expandBtn.addEventListener('click', () => this.toggleExpand());

        // Close button
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', () => this.hideChatbot());

        // Send message
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Input validation
        messageInput.addEventListener('input', () => this.validateInput());

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        searchBtn.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
    }

    setupInitialState() {
        // No enfocar automáticamente el input ya que el chatbot está oculto inicialmente
    }

    addWelcomeMessage() {
        this.messageManager.scrollToBottom();
    }

    toggleChatbot() {
        if (!this.isVisible) {
            this.showChatbot();
        } else {
            this.hideChatbot();
        }
    }

    showChatbot() {
        const chatbotContainer = document.querySelector('.chatbot-container');
        this.isVisible = true;
        chatbotContainer.classList.add('visible');
        chatbotContainer.classList.remove('minimized');
        
        debugManager.info('Chatbot shown');
        
        // Enfocar el input cuando se muestra
        focusElement('#messageInput', 300);
    }

    hideChatbot() {
        const chatbotContainer = document.querySelector('.chatbot-container');
        this.isVisible = false;
        chatbotContainer.classList.remove('visible');
        chatbotContainer.classList.add('minimized');
        
        debugManager.info('Chatbot hidden');
    }

    toggleExpand() {
        const container = document.querySelector('.chatbot-container');
        const expandBtn = document.getElementById('expandBtn');
        
        this.isExpanded = !this.isExpanded;
        
        debugManager.info('Chatbot expanded state changed', { isExpanded: this.isExpanded });
        
        if (this.isExpanded) {
            container.classList.add('expanded');
            expandBtn.innerHTML = svgIcons.CONTRACT;
        } else {
            container.classList.remove('expanded');
            expandBtn.innerHTML = svgIcons.EXPAND;
        }
    }

    validateInput() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const message = messageInput.value.trim();
        
        if (message.length > 0) {
            sendBtn.classList.add('active');
        } else {
            sendBtn.classList.remove('active');
        }
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = formatMessage(messageInput.value);
        
        if (!isValidMessage(message)) return;

        debugManager.info('Sending message', { message });

        // Agregar mensaje del usuario
        this.messageManager.addMessage(message, 'user');
        
        // Limpiar input
        messageInput.value = '';
        this.validateInput();
        
        // Mostrar indicador de escritura
        this.messageManager.showTypingIndicator();
        
        // Simular respuesta del bot
        await simulateTyping();
        this.messageManager.hideTypingIndicator();
        
        const botResponse = getBotResponse(message);
        debugManager.info('Bot response', { response: botResponse });
        this.messageManager.addMessage(botResponse, 'bot');
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim();
        
        if (!isValidMessage(searchTerm)) return;
        
        debugManager.info('Performing search', { searchTerm });
        
        // Simular búsqueda agregando un mensaje
        this.messageManager.addMessage(`Buscar: "${searchTerm}"`, 'user');
        searchInput.value = '';
        
        // Mostrar indicador de escritura y responder
        this.messageManager.showTypingIndicator();
        setTimeout(() => {
            this.messageManager.hideTypingIndicator();
            const searchResponse = `He encontrado información relacionada con "${searchTerm}". ¿Te gustaría que profundice en algún aspecto específico?`;
            debugManager.info('Search response', { response: searchResponse });
            this.messageManager.addMessage(searchResponse, 'bot');
        }, 1000);
    }

    destroy() {
        debugManager.info('ChatbotWidget destroyed');
        this.floatingButton.destroy();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // Métodos adicionales para API pública
    getState() {
        return {
            isVisible: this.isVisible,
            isExpanded: this.isExpanded,
            messages: this.messageManager.getMessages(),
            timestamp: new Date().toISOString()
        };
    }

    getMessages() {
        return this.messageManager.getMessages();
    }

    clearMessages() {
        this.messageManager.clearMessages();
        debugManager.info('Messages cleared');
    }

    getLastMessage() {
        return this.messageManager.getLastMessage();
    }

    // Métodos de debug
    enableDebug() {
        debugManager.enableDebug();
    }

    disableDebug() {
        debugManager.disableDebug();
    }

    getDebugLogs() {
        return debugManager.getLogs();
    }

    exportDebugLogs() {
        return debugManager.exportLogs();
    }

    checkStatus() {
        return checkChatbotStatus();
    }

    getSystemInfo() {
        return getSystemInfo();
    }

    // Métodos de utilidad
    isVisible() {
        return this.isVisible;
    }

    isExpanded() {
        return this.isExpanded;
    }

    // Método para obtener estadísticas
    getStats() {
        const messages = this.messageManager.getMessages();
        const userMessages = messages.filter(m => m.type === 'user').length;
        const botMessages = messages.filter(m => m.type === 'bot').length;
        
        return {
            totalMessages: messages.length,
            userMessages,
            botMessages,
            sessionDuration: this.getSessionDuration(),
            timestamp: new Date().toISOString()
        };
    }

    getSessionDuration() {
        // Calcular duración de la sesión desde la inicialización
        const now = new Date();
        const startTime = this.startTime || now;
        return Math.floor((now - startTime) / 1000); // en segundos
    }
}

// Export para compatibilidad
export default ChatbotWidget;

// Inicializar chatbot cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new ChatbotWidget();
    addRippleToAllButtons();
}); 