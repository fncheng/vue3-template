import { inject, type App, type ObjectPlugin } from 'vue'

const myPlugin: ObjectPlugin<{ message: string }> = {
    install(app: App, options) {
        console.log('app: ', app)
        // 不推荐
        app.config.globalProperties.$myPluginMethod = () => {
            console.log('myPluginMethod')
        }
        // 推荐
        const myPluginMethod = () => {
            console.log('myPluginMethod', options.message)
        }
        app.provide('myPluginMethod', myPluginMethod)
    }
}

export function useMyPlugin() {
    const myPluginMethod = inject<() => void>('myPluginMethod')
    if (!myPluginMethod) {
        throw new Error('myPlugin is not provided. Make sure to use app.use(myPlugin)!')
    }
    return { myPluginMethod }
}

export default myPlugin
