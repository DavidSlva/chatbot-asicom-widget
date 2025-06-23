// Utilidades para manipulación del DOM

/**
 * Crea un elemento HTML con atributos y contenido
 * @param {string} tag - Tag del elemento
 * @param {Object} attributes - Atributos del elemento
 * @param {string} content - Contenido HTML
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Agregar atributos
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // Agregar contenido
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * Agrega estilos CSS al head del documento
 * @param {string} styles - Estilos CSS
 */
export function addStyles(styles) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

/**
 * Enfoca un elemento después de un delay
 * @param {string} selector - Selector del elemento
 * @param {number} delay - Delay en milisegundos
 */
export function focusElement(selector, delay = 0) {
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            element.focus();
        }
    }, delay);
}

/**
 * Hace scroll al final de un contenedor
 * @param {string} selector - Selector del contenedor
 * @param {number} delay - Delay en milisegundos
 */
export function scrollToBottom(selector, delay = 100) {
    setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, delay);
}

/**
 * Agrega efecto ripple a un botón
 * @param {HTMLElement} button - Elemento botón
 */
export function addRippleEffect(button) {
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
}

/**
 * Agrega efecto ripple a todos los botones
 */
export function addRippleToAllButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => addRippleEffect(button));
} 