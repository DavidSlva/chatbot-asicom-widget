# 🤖 SmartbotWidget - Chatbot Flotante Modular

Una librería JavaScript moderna y modular para integrar un chatbot inteligente y flotante en cualquier sitio web. El chatbot aparece como un botón flotante y se expande cuando el usuario lo necesita.

## ✨ Características

- 🎯 **Botón flotante**: Aparece en la esquina inferior derecha
- 💬 **Chat inteligente**: Respuestas automáticas sobre créditos hipotecarios
- 📱 **Responsive**: Funciona en móviles, tablets y escritorio
- 🎨 **Personalizable**: Colores, SVGs y respuestas configurables
- ⚡ **Optimizado**: Código minificado y sin dependencias externas
- 🔍 **Búsqueda integrada**: Funcionalidad de búsqueda en el chat
- 📊 **Modo expandido**: Vista ampliada del chatbot
- 🎭 **Animaciones suaves**: Transiciones fluidas y efectos visuales

## 🚀 Uso

### Instalación Básica

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smartbot-widget@latest/dist/smartbot.css">
</head>
<body>
    <div id="app"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/smartbot-widget@latest/dist/smartbot.umd.js"></script>
    <script>
        const chatbot = new SmartbotWidget('app');
    </script>
</body>
</html>
```

### API del Chatbot

El widget expone una API completa para controlar y monitorear el chatbot:

```javascript
// Control básico
chatbot.showChatbot();           // Mostrar el chatbot
chatbot.hideChatbot();           // Ocultar el chatbot
chatbot.toggleExpand();          // Expandir/contraer
chatbot.destroy();               // Destruir el widget

// Gestión de mensajes
chatbot.getMessages();           // Obtener todos los mensajes
chatbot.getLastMessage();        // Obtener el último mensaje
chatbot.clearMessages();         // Limpiar todos los mensajes

// Estado y información
chatbot.getState();              // Obtener estado completo
chatbot.isVisible();             // Verificar si está visible
chatbot.isExpanded();            // Verificar si está expandido
chatbot.getStats();              // Obtener estadísticas de uso

// Sistema de debug
chatbot.enableDebug();           // Habilitar modo debug
chatbot.disableDebug();          // Deshabilitar modo debug
chatbot.getDebugLogs();          // Obtener logs de debug
chatbot.exportDebugLogs();       // Exportar logs como JSON
chatbot.checkStatus();           // Verificar estado del sistema
chatbot.getSystemInfo();         // Obtener información del sistema
```

### Sistema de Debug

El chatbot incluye un sistema de debug completo:

```javascript
// Habilitar debug (persiste en localStorage)
chatbot.enableDebug();

// O habilitar temporalmente via URL
// https://tu-sitio.com?debug=true

// Ver logs en consola
console.log(chatbot.getDebugLogs());

// Exportar logs para análisis
const logs = chatbot.exportDebugLogs();
```

**Funcionalidades de Debug:**
- ✅ Logs automáticos de todas las acciones
- ✅ Verificación de estado del sistema
- ✅ Información del navegador y plataforma
- ✅ Exportación de logs en formato JSON
- ✅ Persistencia de configuración de debug
- ✅ Activación via URL parameter

### Personalización

#### Configuración Básica

```javascript
// Modificar configuración antes de inicializar
window.SMARTBOT_CONFIG = {
    WIDTH: 400,
    HEIGHT: 600,
    EXPANDED_WIDTH: 600,
    EXPANDED_HEIGHT: 800,
    CHATBOT_POSITION: {
        BOTTOM: '20px',
        RIGHT: '20px'
    }
};

const chatbot = new SmartbotWidget('app');
```

#### Personalizar Respuestas del Bot

```javascript
// En src/utils/botUtils.js
export const BOT_RESPONSES = {
    CREDITO: [
        'Los créditos hipotecarios de ASICOM ofrecen tasas competitivas...',
        'Tenemos diferentes tipos de créditos hipotecarios...'
    ],
    TASA: [
        'Nuestras tasas de interés son muy competitivas...'
    ]
    // ... más categorías
};
```

#### Agregar Nuevos SVGs

```javascript
// En src/svg-icons.js
export const svgIcons = {
    LOGO: `<svg>...</svg>`,
    BOT_AVATAR: `<svg>...</svg>`,
    // ... más iconos
};
```

## 🚀 Instalación

### Opción 1: CDN (Recomendado)
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://tu-cdn.com/smartbot.css">
</head>
<body>
    <div id="app"></div>
    <script src="https://tu-cdn.com/smartbot.umd.js"></script>
</body>
</html>
```

### Opción 2: Descarga directa
Descarga los archivos compilados desde la carpeta `dist/`:
- `smartbot.umd.js` - Librería JavaScript (187 KB)
- `smartbot.css` - Estilos CSS (4.6 KB)

### Opción 3: Compilación desde fuente
```bash
git clone https://github.com/asicom/chatbot-widget.git
cd chatbot-widget
npm install
npm run build:cdn
```

## 📖 Uso

### Uso Básico
El chatbot se inicializa automáticamente cuando se cargan los archivos:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio Web</title>
    <link rel="stylesheet" href="smartbot.css">
</head>
<body>
    <!-- El chatbot aparecerá automáticamente como botón flotante -->
    <div id="app"></div>
    
    <script src="smartbot.umd.js"></script>
</body>
</html>
```

### Uso Programático
```javascript
// El chatbot está disponible globalmente
const chatbot = window.SmartbotWidget;

// Mostrar el chatbot
chatbot.showChatbot();

// Ocultar el chatbot
chatbot.hideChatbot();

// Destruir el chatbot
chatbot.destroy();
```

### Configuración Personalizada
```javascript
// Inicializar con contenedor específico
const chatbot = new SmartbotWidget('mi-contenedor');

// Controlar el estado
chatbot.toggleChatbot(); // Mostrar/ocultar
```

## 🛠️ Desarrollo

### Estructura del Proyecto
```
widget-precomp-chat/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── FloatingButton.js    # Botón flotante
│   │   └── MessageManager.js    # Gestor de mensajes
│   ├── config/             # Configuración y constantes
│   │   └── constants.js         # Configuración del chatbot
│   ├── styles/             # Archivos de estilos
│   │   └── main.css             # Estilos principales
│   ├── utils/              # Utilidades y helpers
│   │   ├── botUtils.js          # Lógica del bot
│   │   └── domUtils.js          # Manipulación del DOM
│   ├── ChatbotWidget.js    # Clase principal del chatbot
│   ├── index.js            # Punto de entrada principal
│   └── svg-icons.js        # Iconos SVG del chatbot
├── dist/                   # Archivos compilados
│   ├── smartbot.umd.js     # Para CDN
│   ├── smartbot.es.js      # Para bundlers
│   ├── smartbot.css        # Estilos
│   └── build-info.json     # Información del build
├── vite.config.js          # Configuración de Vite
├── build.js                # Script de build personalizado
├── cdn-example.html        # Ejemplo de uso CDN
├── dist-example.html       # Test de archivos compilados
└── CDN-README.md           # Documentación CDN
```

### Scripts Disponibles
```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run preview          # Vista previa del build

# Build
npm run build            # Build estándar
npm run build:cdn        # Build optimizado para CDN
npm run build:prod       # Build completo con limpieza
npm run clean            # Limpiar directorio dist
```

## ⚙️ Configuración

### Personalizar Colores y Dimensiones
Edita `src/config/constants.js`:

```javascript
export const CHATBOT_CONFIG = {
    // Dimensiones
    WIDTH: 400,
    HEIGHT: 600,
    EXPANDED_WIDTH: 800,
    
    // Colores
    COLORS: {
        PRIMARY: '#1FA2E6',
        PRIMARY_DARK: '#1890D1',
        BOT_BUBBLE: '#E3E3E3',
        USER_BUBBLE: '#D6EDF7'
    },
    
    // Posicionamiento
    FLOATING_BUTTON: {
        BOTTOM: '20px',
        RIGHT: '20px',
        SIZE: 60
    }
};
```


### Agregar Nuevos SVGs
1. Agrega el SVG a `src/svg-icons.js`:
```javascript
export const svgIcons = {
    LOGO: `<svg>...</svg>`,
    BOT_AVATAR: `<svg>...</svg>`,
    // ... más iconos
};
```

2. Usa la referencia en los componentes:
```javascript
${svgIcons.LOGO}
```

## 🎨 Personalización Visual

### Cambiar Colores del Tema
```css
/* En src/styles/main.css */
.chatbot-header {
    background: linear-gradient(135deg, #tu-color 0%, #tu-color-oscuro 100%);
}

.floating-chat-btn {
    background: #tu-color-principal;
}
```

### Modificar Posicionamiento
```javascript
// En src/config/constants.js
FLOATING_BUTTON: {
    BOTTOM: '30px',    // Distancia desde abajo
    RIGHT: '30px',     // Distancia desde la derecha
    SIZE: 70           // Tamaño del botón
}
```

## 📱 Compatibilidad

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Móviles, tablets, escritorio
- **Frameworks**: Compatible con React, Vue, Angular, vanilla JS
- **Tamaño**: ~192 KB total (comprimido)

## 🔧 API

### Métodos Disponibles

| Método | Descripción |
|--------|-------------|
| `showChatbot()` | Muestra el chatbot |
| `hideChatbot()` | Oculta el chatbot |
| `toggleChatbot()` | Alterna visibilidad |
| `toggleExpand()` | Expande/contrae el chat |
| `destroy()` | Destruye la instancia |

### Eventos
```javascript
// El chatbot se inicializa automáticamente
document.addEventListener('DOMContentLoaded', () => {
    // El chatbot ya está disponible
    console.log('Chatbot listo:', window.SmartbotWidget);
});
```

## 🚨 Troubleshooting

### Problemas Comunes

1. **Chatbot no aparece**
   - Verificar que el contenedor `#app` existe
   - Revisar la consola del navegador
   - Verificar que los archivos se cargan correctamente

2. **Estilos no se aplican**
   - Verificar que el CSS se carga antes que el JS
   - Revisar que la URL del CSS es correcta

3. **Errores de CORS**
   - Configurar headers CORS en el servidor
   - Verificar que el CDN permite acceso desde tu dominio

### Debug
```javascript
// Habilitar logs de debug
localStorage.setItem('smartbot-debug', 'true');

// Verificar estado del chatbot
console.log('SmartbotWidget:', window.SmartbotWidget);
```

### Panel de Debug Interactivo

Incluimos un panel de debug completo en `debug-example.html` que te permite probar todas las funcionalidades:

```bash
# Abrir el panel de debug
open debug-example.html
```

**Funcionalidades del Panel:**
- 🔧 Control completo del chatbot (mostrar/ocultar/expandir)
- 🐛 Sistema de debug (habilitar/deshabilitar/exportar logs)
- 📊 Información del sistema (estado/estadísticas/info del navegador)
- 💬 API de mensajes (obtener/limpiar/enviar mensajes de prueba)
- 📝 Salida de debug en tiempo real

### Ejemplos de Uso

#### Ejemplo 1: Chatbot con Debug Habilitado

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smartbot-widget@latest/dist/smartbot.css">
</head>
<body>
    <div id="app"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/smartbot-widget@latest/dist/smartbot.umd.js"></script>
    <script>
        const chatbot = new SmartbotWidget('app');
        
        // Habilitar debug
        chatbot.enableDebug();
        
        // Mostrar chatbot después de 2 segundos
        setTimeout(() => {
            chatbot.showChatbot();
        }, 2000);
    </script>
</body>
</html>
```

#### Ejemplo 2: Monitoreo de Uso

```javascript
// Obtener estadísticas cada 30 segundos
setInterval(() => {
    const stats = chatbot.getStats();
    console.log('Estadísticas:', stats);
    
    if (stats.totalMessages > 10) {
        console.log('¡Mucha actividad en el chat!');
    }
}, 30000);
```

#### Ejemplo 3: Exportar Logs para Análisis

```javascript
// Exportar logs al final de la sesión
window.addEventListener('beforeunload', () => {
    const logs = chatbot.exportDebugLogs();
    // Enviar logs a tu servidor para análisis
    fetch('/api/logs', {
        method: 'POST',
        body: logs,
        headers: { 'Content-Type': 'application/json' }
    });
});
```

**Desarrollado con ❤️ por ASICOM**

