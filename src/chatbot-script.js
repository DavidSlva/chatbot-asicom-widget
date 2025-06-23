import './chatbot-styles.css'
import {svgIcons} from './svg-icons'

class SmartbotWidget {
    constructor(containerId = 'app') {
        this.isExpanded = false;
        this.isVisible = false;
        this.messages = [];
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`No se encontró el contenedor con id '${containerId}'`);
        }
        // Crear el botón flotante y el chatbot
        this.createFloatingButton();
        this.container.innerHTML = this.getChatbotHTML();
        this.init();
    }

    createFloatingButton() {
        const floatingBtn = document.createElement('div');
        floatingBtn.id = 'chatbot-floating-btn';
        floatingBtn.innerHTML = `
            <button class="floating-chat-btn">
                ${svgIcons.FLOAT_BUTTON}
            </button>
        `;
        
        // Agregar estilos para el botón flotante
        const floatingStyles = document.createElement('style');
        floatingStyles.textContent = `
            #chatbot-floating-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .floating-chat-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: none;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .floating-chat-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(31, 162, 230, 0.4);
            }
            
            .chatbot-container {
                position: fixed;
                bottom: 100px;
                right: 20px;
                z-index: 999;
                display: none;
            }
            
            .chatbot-container.visible {
                display: flex;
            }
            
            .chatbot-container.minimized {
                display: none;
            }
        `;
        document.head.appendChild(floatingStyles);
        
        // Agregar el botón al DOM
        document.body.appendChild(floatingBtn);
        
        // Event listener para mostrar/ocultar el chatbot
        floatingBtn.addEventListener('click', () => this.toggleChatbot());
    }

    toggleChatbot() {
        const chatbotContainer = document.querySelector('.chatbot-container');
        const floatingBtn = document.getElementById('chatbot-floating-btn');
        
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
        
        // Enfocar el input cuando se muestra
        setTimeout(() => {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.focus();
            }
        }, 300);
    }

    hideChatbot() {
        const chatbotContainer = document.querySelector('.chatbot-container');
        this.isVisible = false;
        chatbotContainer.classList.remove('visible');
        chatbotContainer.classList.add('minimized');
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
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.796875 19.2033V10.9283H3.07187V15.331L15.3311 3.07175H10.9284V0.796753H19.2034V9.07175H16.9284V4.669L4.66913 16.9283H9.07188V19.2033H0.796875Z" fill="white"/>
                            </svg>
                        </button>
                        <button class="dropdown-btn" id="closeBtn">
                            ${svgIcons.DROPDOWN}
                        </button>
                    </div>
                </div>

                <div class="search-container">
                    <div class="search-box">
                        <input type="text" id="searchInput">
                        <button class="search-btn" id="searchBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                            </svg>
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
        this.bindEvents();
        this.setupInitialState();
        this.addWelcomeMessage();
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
        // El foco se establecerá cuando se muestre el chatbot
    }

    addWelcomeMessage() {
        // El mensaje de bienvenida ya está en el HTML
        this.scrollToBottom();
    }

    toggleExpand() {
        const container = document.querySelector('.chatbot-container');
        const expandBtn = document.getElementById('expandBtn');
        
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            container.classList.add('expanded');
            // Cambiar al ícono de minimizar
            expandBtn.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.38813 21.2033L0.796875 19.612L7.13388 13.275H2.79687V11H11.0001V19.2033H8.72513V14.8663L2.38813 21.2033ZM11.0001 11V2.79675H13.2751V7.13375L19.6121 0.796753L21.2034 2.388L14.8664 8.725H19.2034V11H11.0001Z" fill="white"/>
                </svg>
            `;
        } else {
            container.classList.remove('expanded');
            // Cambiar al ícono de expandir
            expandBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.796875 19.2033V10.9283H3.07187V15.331L15.3311 3.07175H10.9284V0.796753H19.2034V9.07175H16.9284V4.669L4.66913 16.9283H9.07188V19.2033H0.796875Z" fill="white"/>
                </svg>
            `;
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

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (message.length === 0) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        this.validateInput();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addBotResponse(message);
        }, 1500 + Math.random() * 1000);
    }

    addMessage(text, type) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = this.createAvatar(type);
        const content = this.createMessageContent(text, type);
        
        if (type === 'user') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        }
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store message
        this.messages.push({ text, type, timestamp: new Date() });
    }

    createAvatar(type) {
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (type === 'bot') {
            avatarDiv.innerHTML = `
                <div class="bot-avatar">
                    ${svgIcons.BOT_AVATAR}
                </div>
            `;
        } else {
            avatarDiv.innerHTML = `
                <div class="user-avatar">
                    U
                </div>
            `;
        }
        
        return avatarDiv;
    }

    createMessageContent(text, type) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `message-bubble ${type}-bubble`;
        bubbleDiv.textContent = text;
        
        contentDiv.appendChild(bubbleDiv);
        return contentDiv;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        const avatar = this.createAvatar('bot');
        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        typingContent.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addBotResponse(userMessage) {
        const responses = this.getBotResponse(userMessage);
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(response, 'bot');
    }

    getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('crédito') || message.includes('hipotecario') || message.includes('hipoteca')) {
            return [
                'Los créditos hipotecarios de ASICOM ofrecen tasas competitivas y plazos flexibles. ¿Te gustaría conocer más detalles sobre nuestras opciones de financiamiento?',
                'Tenemos diferentes tipos de créditos hipotecarios adaptados a tus necesidades. ¿Cuál es el valor aproximado de la propiedad que te interesa?',
                'Nuestros créditos hipotecarios pueden financiar hasta el 90% del valor de la propiedad. ¿Te gustaría simular tu crédito?'
            ];
        }
        
        if (message.includes('tasa') || message.includes('interés')) {
            return [
                'Nuestras tasas de interés son muy competitivas y varían según el plazo y el monto del crédito. ¿Te gustaría que te contacte un asesor para una cotización personalizada?',
                'Las tasas de interés actuales para créditos hipotecarios van desde el 8.5% anual. ¿Tienes algún monto específico en mente?'
            ];
        }
        
        if (message.includes('requisito') || message.includes('documento')) {
            return [
                'Los requisitos principales son: tener ingresos demostrables, buen historial crediticio, y aportar el 10% del valor de la propiedad. ¿Cumples con estos requisitos?',
                'Necesitarás: cédula de identidad, certificado de ingresos, referencias comerciales y el 10% de cuota inicial. ¿Te gustaría la lista completa de documentos?'
            ];
        }
        
        if (message.includes('plazo') || message.includes('año')) {
            return [
                'Ofrecemos plazos desde 5 hasta 30 años para que puedas elegir la cuota que mejor se adapte a tu presupuesto. ¿Qué plazo te interesa más?',
                'Los plazos más populares son de 15 y 20 años. Un plazo más largo significa cuotas menores pero más intereses totales. ¿Te ayudo a calcular?'
            ];
        }
        
        if (message.includes('simula') || message.includes('calcula') || message.includes('cuota')) {
            return [
                'Perfecto, puedo ayudarte a simular tu crédito. ¿Cuál es el valor de la propiedad que te interesa y qué plazo prefieres?',
                'Para hacer la simulación necesito saber: valor de la propiedad, plazo deseado e ingresos mensuales. ¿Puedes proporcionarme estos datos?'
            ];
        }
        
        if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
            return [
                '¡Hola! Me alegra que me contactes. Estoy aquí para ayudarte con toda la información sobre nuestros créditos hipotecarios. ¿En qué puedo asistirte?',
                '¡Buen día! Soy tu asistente virtual de ASICOM. ¿Te interesa conocer sobre nuestros créditos hipotecarios?'
            ];
        }
        
        if (message.includes('ayuda') || message.includes('información')) {
            return [
                'Puedo ayudarte con información sobre: tasas de interés, requisitos, plazos, simulaciones de crédito y todo lo relacionado con hipotecas. ¿Qué te interesa saber?',
                'Estoy aquí para resolver todas tus dudas sobre créditos hipotecarios. ¿Tienes alguna pregunta específica?'
            ];
        }
        
        // Respuestas generales
        return [
            'Entiendo tu consulta. Te recomiendo que te pongas en contacto con uno de nuestros asesores especializados para obtener información más detallada. ¿Te gustaría que programe una cita?',
            'Esa es una excelente pregunta. Para brindarte la mejor asesoría personalizada, te sugiero hablar con nuestro equipo de expertos. ¿Cuál es tu número de contacto?',
            'Gracias por tu consulta. Para ayudarte mejor, ¿podrías ser más específico sobre qué aspecto de los créditos hipotecarios te interesa más?'
        ];
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm.length === 0) return;
        
        // Simulate search by adding a message
        this.addMessage(`Buscar: "${searchTerm}"`, 'user');
        searchInput.value = '';
        
        // Show typing and respond
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(`He encontrado información relacionada con "${searchTerm}". ¿Te gustaría que profundice en algún aspecto específico?`, 'bot');
        }, 1000);
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

// Export for UMD library
export default SmartbotWidget;

// Initialize chatbot when DOM is loaded (for backward compatibility)
document.addEventListener('DOMContentLoaded', () => {
    new SmartbotWidget();
});

// Add some CSS animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);