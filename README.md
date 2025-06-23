# Smartbot Widget

A modern, customizable chatbot widget for customer support and AI interactions. Built with vanilla JavaScript and CSS, designed to be lightweight and easy to integrate.

## 🚀 Features

- **Lightweight**: No dependencies, pure vanilla JavaScript
- **Customizable**: Easy to style and configure
- **Responsive**: Works on all devices
- **Debug Mode**: Built-in debugging tools
- **Modern UI**: Clean and professional design
- **Easy Integration**: Simple CDN or npm installation

## 📦 Installation

### Via CDN (Recommended)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smartbot-widget@1.0.0/dist/smartbot.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/smartbot-widget@1.0.0/dist/smartbot.umd.js"></script>
```

### Via npm

```bash
npm install smartbot-widget
```

```javascript
import { ChatbotWidget } from 'smartbot-widget';
```

## 🎯 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smartbot-widget@1.0.0/dist/smartbot.css">
</head>
<body>
    <!-- Container for the chatbot -->
    <div id="app"></div>
    
    <!-- Load the widget -->
    <script src="https://cdn.jsdelivr.net/npm/smartbot-widget@1.0.0/dist/smartbot.umd.js"></script>
    <script>
        // Initialize the chatbot
        const chatbot = new SmartbotWidget('app');
    </script>
</body>
</html>
```

### Advanced Usage

```javascript
// Create instance with custom configuration
const chatbot = new SmartbotWidget('app');

// Show/hide the chatbot
chatbot.showChatbot();
chatbot.hideChatbot();

// Expand/collapse
chatbot.toggleExpand();

// Get chatbot state
const state = chatbot.getState();
console.log('Is visible:', state.isVisible);
console.log('Is expanded:', state.isExpanded);

// Get messages
const messages = chatbot.getMessages();
console.log('Total messages:', messages.length);

// Clear messages
chatbot.clearMessages();

// Enable debug mode
chatbot.enableDebug();

// Get debug logs
const logs = chatbot.getDebugLogs();
console.log('Debug logs:', logs);

// Get system information
const systemInfo = chatbot.getSystemInfo();
console.log('Platform:', systemInfo.platform);
console.log('Language:', systemInfo.language);

// Get statistics
const stats = chatbot.getStats();
console.log('Session duration:', stats.sessionDuration);
console.log('Total messages:', stats.totalMessages);
```

## 🎨 Customization

### CSS Customization

You can customize the appearance by overriding CSS variables or classes:

```css
/* Custom colors */
.chatbot-container {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}

/* Custom positioning */
.chatbot-container {
    bottom: 20px;
    right: 20px;
}
```

## 🔧 API Reference

### Methods

| Method | Description |
|--------|-------------|
| `showChatbot()` | Shows the chatbot |
| `hideChatbot()` | Hides the chatbot |
| `toggleExpand()` | Expands or collapses the chatbot |
| `clearMessages()` | Clears all messages |
| `getMessages()` | Returns all messages |
| `getLastMessage()` | Returns the last message |
| `getState()` | Returns current state |
| `getStats()` | Returns session statistics |
| `enableDebug()` | Enables debug mode |
| `disableDebug()` | Disables debug mode |
| `getDebugLogs()` | Returns debug logs |
| `exportDebugLogs()` | Exports debug logs as JSON |
| `getSystemInfo()` | Returns system information |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `isVisible` | Boolean | Whether the chatbot is visible |
| `isExpanded` | Boolean | Whether the chatbot is expanded |
| `messages` | Array | Array of all messages |

## 🐛 Debug Mode

Enable debug mode to get detailed logs:

```javascript
// Enable debug
chatbot.enableDebug();

// Get logs
const logs = chatbot.getDebugLogs();

// Export logs
const exportedLogs = chatbot.exportDebugLogs();
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with vanilla JavaScript and CSS
- Icons from various open source libraries
- Inspired by modern chat interfaces

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [DavidSlva](https://github.com/DavidSlva)

