#!/usr/bin/env node

import { build } from 'vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Configuración de build
const buildConfig = defineConfig({
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
      }
    },
    sourcemap: false,
    assetsInlineLimit: 0,
    copyPublicDir: false
  }
});

async function buildChatbot() {
  console.log('🚀 Iniciando build del Chatbot Widget...');
  
  try {
    // Crear directorio dist si no existe
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }
    
    // Ejecutar build
    await build(buildConfig);
    
    console.log('✅ Build completado exitosamente!');
    console.log('📁 Archivos generados en /dist:');
    
    // Listar archivos generados
    const distFiles = fs.readdirSync('dist');
    distFiles.forEach(file => {
      const stats = fs.statSync(path.join('dist', file));
      const size = (stats.size / 1024).toFixed(2);
      console.log(`   📄 ${file} (${size} KB)`);
    });
    
    // Crear archivo de información del build
    const buildInfo = {
      version: '1.0.0',
      buildDate: new Date().toISOString(),
      files: distFiles,
      entryPoint: 'src/index.js',
      formats: ['umd', 'es']
    };
    
    fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
    
    console.log('\n🎯 Archivos listos para CDN:');
    console.log('   • smartbot.umd.js - Para uso en navegador');
    console.log('   • smartbot.es.js - Para uso con bundlers');
    console.log('   • smartbot.css - Estilos del chatbot');
    
    console.log('\n📋 Instrucciones de uso:');
    console.log('   1. Sube los archivos a tu CDN');
    console.log('   2. Incluye el CSS y JS en tu HTML');
    console.log('   3. El chatbot se inicializará automáticamente');
    
  } catch (error) {
    console.error('❌ Error durante el build:', error);
    process.exit(1);
  }
}

// Ejecutar build
buildChatbot(); 