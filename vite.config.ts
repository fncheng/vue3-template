import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'node:path'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    console.log('VITE_APP_ROUTER_BASE', env.VITE_APP_ROUTER_BASE)
    return {
        base: (process.env as any).__POWERED_BY_QIANKUN__ ? '/app-vue2/' : '/vue-app/',
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
            Pages({
                dirs: 'src/app/pages'
            }),
            // AutoImport({
            //     resolvers: [ElementPlusResolver()]
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()]
            // }),
            ElementPlus({}),
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, 'src/assets/svg/')],
                symbolId: `icon-[name]`,
                inject: 'body-first'
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
                        dest: 'assets'
                    },
                    {
                        src: './src/pages/file-upload/worker.ts',
                        dest: 'assets'
                    }
                ]
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@app': fileURLToPath(new URL('./src/app', import.meta.url))
            }
        },
        server: {
            port: 7101,
            cors: true,
            host: '0.0.0.0',
            proxy: {
                '/proxyApi': {
                    target: 'http://127.0.0.1:3000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/proxyApi/, '')
                },
                '/audio/downloadFile': {
                    target: 'http://10.1.200.39:38899',
                    changeOrigin: true
                },
                '/ws': {
                    target: "wss://flames.iflytek.com:2443",
                    changeOrigin: true,
                    ws: true,
                    rewrite: path => path.replace(/^\/ws/, ''),
                }
            }
        }
    }
})
