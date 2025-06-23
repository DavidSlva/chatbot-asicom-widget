// Configuración del chatbot
export const CHATBOT_CONFIG = {
    // Dimensiones del chatbot
    WIDTH: 400,
    HEIGHT: 600,
    EXPANDED_WIDTH: 800,
    EXPANDED_HEIGHT: 700,
    
    // Posicionamiento del botón flotante
    FLOATING_BUTTON: {
        BOTTOM: '20px',
        RIGHT: '20px',
        SIZE: 60
    },
    
    // Posicionamiento del chatbot
    CHATBOT_POSITION: {
        BOTTOM: '100px',
        RIGHT: '20px'
    },
    
    // Colores del tema
    COLORS: {
        PRIMARY: '#1FA2E6',
        PRIMARY_DARK: '#1890D1',
        SECONDARY: '#6b7280',
        BACKGROUND: '#ffffff',
        BOT_BUBBLE: '#E3E3E3',
        USER_BUBBLE: '#D6EDF7',
        BUTTON_BG: '#3030304D'
    },
    
    // Tiempos de animación
    ANIMATION_DURATION: 300,
    TYPING_DELAY: 1500,
    
    // Configuración de mensajes
    MESSAGE_CONFIG: {
        MAX_WIDTH: '80%',
        BUBBLE_PADDING: '12px 16px',
        BORDER_RADIUS: '18px'
    }
};

// Configuración de respuestas del bot
export const BOT_RESPONSES = {
    CREDITO: [
        'Los créditos hipotecarios de ASICOM ofrecen tasas competitivas y plazos flexibles. ¿Te gustaría conocer más detalles sobre nuestras opciones de financiamiento?',
        'Tenemos diferentes tipos de créditos hipotecarios adaptados a tus necesidades. ¿Cuál es el valor aproximado de la propiedad que te interesa?',
        'Nuestros créditos hipotecarios pueden financiar hasta el 90% del valor de la propiedad. ¿Te gustaría simular tu crédito?'
    ],
    
    TASA: [
        'Nuestras tasas de interés son muy competitivas y varían según el plazo y el monto del crédito. ¿Te gustaría que te contacte un asesor para una cotización personalizada?',
        'Las tasas de interés actuales para créditos hipotecarios van desde el 8.5% anual. ¿Tienes algún monto específico en mente?'
    ],
    
    REQUISITO: [
        'Los requisitos principales son: tener ingresos demostrables, buen historial crediticio, y aportar el 10% del valor de la propiedad. ¿Cumples con estos requisitos?',
        'Necesitarás: cédula de identidad, certificado de ingresos, referencias comerciales y el 10% de cuota inicial. ¿Te gustaría la lista completa de documentos?'
    ],
    
    PLAZO: [
        'Ofrecemos plazos desde 5 hasta 30 años para que puedas elegir la cuota que mejor se adapte a tu presupuesto. ¿Qué plazo te interesa más?',
        'Los plazos más populares son de 15 y 20 años. Un plazo más largo significa cuotas menores pero más intereses totales. ¿Te ayudo a calcular?'
    ],
    
    SIMULA: [
        'Perfecto, puedo ayudarte a simular tu crédito. ¿Cuál es el valor de la propiedad que te interesa y qué plazo prefieres?',
        'Para hacer la simulación necesito saber: valor de la propiedad, plazo deseado e ingresos mensuales. ¿Puedes proporcionarme estos datos?'
    ],
    
    SALUDO: [
        '¡Hola! Me alegra que me contactes. Estoy aquí para ayudarte con toda la información sobre nuestros créditos hipotecarios. ¿En qué puedo asistirte?',
        '¡Buen día! Soy tu asistente virtual de ASICOM. ¿Te interesa conocer sobre nuestros créditos hipotecarios?'
    ],
    
    AYUDA: [
        'Puedo ayudarte con información sobre: tasas de interés, requisitos, plazos, simulaciones de crédito y todo lo relacionado con hipotecas. ¿Qué te interesa saber?',
        'Estoy aquí para resolver todas tus dudas sobre créditos hipotecarios. ¿Tienes alguna pregunta específica?'
    ],
    
    GENERAL: [
        'Entiendo tu consulta. Te recomiendo que te pongas en contacto con uno de nuestros asesores especializados para obtener información más detallada. ¿Te gustaría que programe una cita?',
        'Esa es una excelente pregunta. Para brindarte la mejor asesoría personalizada, te sugiero hablar con nuestro equipo de expertos. ¿Cuál es tu número de contacto?',
        'Gracias por tu consulta. Para ayudarte mejor, ¿podrías ser más específico sobre qué aspecto de los créditos hipotecarios te interesa más?'
    ]
}; 