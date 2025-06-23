import { createElement, addStyles } from '../utils/domUtils.js';
import { CHATBOT_CONFIG } from '../config/constants.js';
import { svgIcons } from '../svg-icons.js';

export class FloatingButton {
    constructor(onClick) {
        this.onClick = onClick;
        this.element = null;
        this.createButton();
        this.addStyles();
    }

    createButton() {
        this.element = createElement('div', { id: 'chatbot-floating-btn' }, `
            <button class="floating-chat-btn">
                ${svgIcons.FLOAT_BUTTON}
            </button>
        `);

        this.element.addEventListener('click', this.onClick);
    }

    addStyles() {
        const styles = `
            #chatbot-floating-btn {
                position: fixed;
                bottom: ${CHATBOT_CONFIG.FLOATING_BUTTON.BOTTOM};
                right: ${CHATBOT_CONFIG.FLOATING_BUTTON.RIGHT};
                z-index: 1000;
            }
            
            .floating-chat-btn {
                width: ${CHATBOT_CONFIG.FLOATING_BUTTON.SIZE}px;
                height: ${CHATBOT_CONFIG.FLOATING_BUTTON.SIZE}px;
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
            }
        `;

        addStyles(styles);
    }

    show() {
        if (this.element && !document.body.contains(this.element)) {
            document.body.appendChild(this.element);
        }
    }

    hide() {
        if (this.element && document.body.contains(this.element)) {
            document.body.removeChild(this.element);
        }
    }

    destroy() {
        if (this.element && document.body.contains(this.element)) {
            document.body.removeChild(this.element);
        }
        this.element = null;
    }
} 