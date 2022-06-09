//Url für Pfad
import path from 'path';
import { fileURLToPath, URL } from 'url';
//Vite
import { defineConfig } from 'vite';
//Vue
import vue from '@vitejs/plugin-vue';
//Vite-PWA
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['/WebsiteIcons/favicon.ico', '/WebsiteIcons/apple-touch-icon.png'],
      manifest: {
        name: 'BenniApp',
        short_name: 'BenniApp',
        description: 'BenniApp-Description ',
        theme_color: '#000000',
        icons: [
          {
            src: '/WebsiteIcons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/WebsiteIcons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        importScripts: ['service_worker_chs.js'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  //! DAS WIRD ERST GANZ ZUM SCHLUSS WENN WIR DEPLOYEN AUSKOMMENTIERT, NOCH BRUACHEN WIR DEN .dist-ORDNER (für Preview)
  // build: {
  //   outDir: path.resolve(__dirname, '../Backend/public'),
  // },
});
