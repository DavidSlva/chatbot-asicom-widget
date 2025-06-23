import { BOT_RESPONSES } from '../config/constants.js';

/**
 * Obtiene la respuesta del bot basada en el mensaje del usuario
 * @param {string} userMessage - Mensaje del usuario
 * @returns {string} Respuesta del bot
 */
export function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Verificar diferentes tipos de consultas
    if (message.includes('crédito') || message.includes('hipotecario') || message.includes('hipoteca')) {
        return getRandomResponse(BOT_RESPONSES.CREDITO);
    }
    
    if (message.includes('tasa') || message.includes('interés')) {
        return getRandomResponse(BOT_RESPONSES.TASA);
    }
    
    if (message.includes('requisito') || message.includes('documento')) {
        return getRandomResponse(BOT_RESPONSES.REQUISITO);
    }
    
    if (message.includes('plazo') || message.includes('año')) {
        return getRandomResponse(BOT_RESPONSES.PLAZO);
    }
    
    if (message.includes('simula') || message.includes('calcula') || message.includes('cuota')) {
        return getRandomResponse(BOT_RESPONSES.SIMULA);
    }
    
    if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
        return getRandomResponse(BOT_RESPONSES.SALUDO);
    }
    
    if (message.includes('ayuda') || message.includes('información')) {
        return getRandomResponse(BOT_RESPONSES.AYUDA);
    }
    
    // Respuesta general por defecto
    return getRandomResponse(BOT_RESPONSES.GENERAL);
}

/**
 * Obtiene una respuesta aleatoria de un array de respuestas
 * @param {Array} responses - Array de respuestas posibles
 * @returns {string} Respuesta aleatoria
 */
export function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Simula un delay de escritura
 * @param {number} minDelay - Delay mínimo en ms
 * @param {number} maxDelay - Delay máximo en ms
 * @returns {Promise}
 */
export function simulateTyping(minDelay = 1500, maxDelay = 2500) {
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Valida si un mensaje está vacío
 * @param {string} message - Mensaje a validar
 * @returns {boolean} True si el mensaje es válido
 */
export function isValidMessage(message) {
    return message && message.trim().length > 0;
}

/**
 * Formatea un mensaje para mostrar
 * @param {string} message - Mensaje a formatear
 * @returns {string} Mensaje formateado
 */
export function formatMessage(message) {
    return message.trim();
}

/**
 * Crea un timestamp para los mensajes
 * @returns {Date} Timestamp actual
 */
export function createTimestamp() {
    return new Date();
} 