import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
    base: (process.env as any).__POWERED_BY_QIANKUN__ ? '/app-vue2/' : '/',
    // build: {
    //   lib: {
    //     entry: './src/main.ts', // 入口文件
    //     name: 'sub-app-vue2',
    //     fileName: (format) => `sub-app-vue2.${format}.js`,
    //     formats: ['umd']
    //   },
    //   rollupOptions: {
    //     external: ['vue'],
    //     output: {
    //       globals: {
    //         vue: 'Vue'
    //       }
    //     }
    //   }
    // },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', 'vue-router'],
                    'element-plus': ['element-plus']
                }
            }
        },
        cssCodeSplit: true
    },
    plugins: [
        vue(),
        vueJsx(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
                    dest: 'assets'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 7101,
        cors: true,
        host: '0.0.0.0'
    }
})
