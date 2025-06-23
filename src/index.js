// Archivo de entrada principal del chatbot
import { ChatbotWidget } from './ChatbotWidget.js';

// Exportar la clase principal como exportación nombrada
export { ChatbotWidget };

// También exportar como default para compatibilidad
const SmartbotWidget = ChatbotWidget;
export default SmartbotWidget;

// Hacer disponible globalmente para uso en CDN
if (typeof window !== 'undefined') {
    window.SmartbotWidget = SmartbotWidget;
    window.ChatbotWidget = ChatbotWidget;
} 