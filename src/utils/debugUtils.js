// Utilidades de debug para el chatbot

class DebugManager {
    constructor() {
        this.isDebugEnabled = this.checkDebugMode();
        this.logs = [];
        this.maxLogs = 100;
    }

    checkDebugMode() {
        return localStorage.getItem('smartbot-debug') === 'true' || 
               window.location.search.includes('debug=true');
    }

    log(message, type = 'info', data = null) {
        if (!this.isDebugEnabled) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            type,
            message,
            data
        };

        this.logs.push(logEntry);

        // Mantener solo los últimos logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Mostrar en consola
        const consoleMethod = type === 'error' ? 'error' : 
                             type === 'warn' ? 'warn' : 'log';
        
        console[consoleMethod](`[SmartbotWidget] ${message}`, data || '');
    }

    info(message, data = null) {
        this.log(message, 'info', data);
    }

    warn(message, data = null) {
        this.log(message, 'warn', data);
    }

    error(message, data = null) {
        this.log(message, 'error', data);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }

    exportLogs() {
        return JSON.stringify(this.logs, null, 2);
    }

    enableDebug() {
        localStorage.setItem('smartbot-debug', 'true');
        this.isDebugEnabled = true;
        this.info('Debug mode enabled');
    }

    disableDebug() {
        localStorage.removeItem('smartbot-debug');
        this.isDebugEnabled = false;
        console.log('[SmartbotWidget] Debug mode disabled');
    }
}

// Instancia global del debug manager
export const debugManager = new DebugManager();

// Función para verificar el estado del chatbot
export function checkChatbotStatus() {
    const status = {
        loaded: !!window.SmartbotWidget,
        container: !!document.getElementById('app'),
        css: !!document.querySelector('link[href*="smartbot.css"]'),
        js: !!document.querySelector('script[src*="smartbot.umd.js"]'),
        timestamp: new Date().toISOString()
    };

    debugManager.info('Chatbot status check', status);
    return status;
}

// Función para obtener información del sistema
export function getSystemInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenSize: `${screen.width}x${screen.height}`,
        windowSize: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: new Date().toISOString()
    };
} 