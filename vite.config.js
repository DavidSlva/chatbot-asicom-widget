import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'SmartbotWidget',
      fileName: (format) => `smartbot.${format}.js`,
      formats: ['umd', 'es'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'smartbot.css';
          }
          return assetInfo.name;
        },
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    sourcemap: false,
    assetsInlineLimit: 0,
    copyPublicDir: false
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: []
  }
}) 