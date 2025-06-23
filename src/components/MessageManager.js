import { createElement, scrollToBottom } from '../utils/domUtils.js';
import { svgIcons } from '../svg-icons.js';

export class MessageManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            throw new Error(`No se encontró el contenedor con id '${containerId}' para MessageManager`);
        }
        
        this.messages = [];
    }

    /**
     * Agrega un mensaje al chat
     * @param {string} text - Texto del mensaje
     * @param {string} type - Tipo de mensaje ('user' o 'bot')
     */
    addMessage(text, type) {
        const messageDiv = createElement('div', { className: `message ${type}-message` });
        
        const avatar = this.createAvatar(type);
        const content = this.createMessageContent(text, type);
        
        if (type === 'user') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        }
        
        this.container.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Almacenar mensaje
        this.messages.push({ 
            text, 
            type, 
            timestamp: new Date() 
        });
    }

    /**
     * Crea el avatar para un mensaje
     * @param {string} type - Tipo de mensaje
     * @returns {HTMLElement}
     */
    createAvatar(type) {
        const avatarDiv = createElement('div', { className: 'message-avatar' });
        
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

    /**
     * Crea el contenido del mensaje
     * @param {string} text - Texto del mensaje
     * @param {string} type - Tipo de mensaje
     * @returns {HTMLElement}
     */
    createMessageContent(text, type) {
        const contentDiv = createElement('div', { className: 'message-content' });
        const bubbleDiv = createElement('div', { 
            className: `message-bubble ${type}-bubble` 
        }, text);
        
        contentDiv.appendChild(bubbleDiv);
        return contentDiv;
    }

    /**
     * Muestra el indicador de escritura
     */
    showTypingIndicator() {
        const typingDiv = createElement('div', { 
            className: 'message bot-message',
            id: 'typing-indicator'
        });
        
        const avatar = this.createAvatar('bot');
        const typingContent = createElement('div', { className: 'message-content' }, `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `);
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        this.container.appendChild(typingDiv);
        this.scrollToBottom();
    }

    /**
     * Oculta el indicador de escritura
     */
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    /**
     * Hace scroll al final del chat
     */
    scrollToBottom() {
        scrollToBottom('#chatMessages');
    }

    /**
     * Limpia todos los mensajes
     */
    clearMessages() {
        this.container.innerHTML = '';
        this.messages = [];
    }

    /**
     * Obtiene todos los mensajes
     * @returns {Array}
     */
    getMessages() {
        return this.messages;
    }

    /**
     * Obtiene el último mensaje
     * @returns {Object|null}
     */
    getLastMessage() {
        return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
    }
} 