import './public-path'
import './assets/reset.css'
import './assets/main.css'

import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import myPlugin from './plugins'
import directives from './directives'
import Pack from './components/Pack.ce.vue'

const MyPack = defineCustomElement(Pack)

customElements.define('my-pack', MyPack)


const app = createApp(App)

Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key as keyof typeof directives])
})

app.use(myPlugin, { message: 'hello' })
app.use(router)

app.mount('#app')

// let instance:ReturnType<typeof createApp>

// function render(props = {}) {
//   const { container } = props
//   const app = createApp(App)
//   app.use(router)
//   instance = app.mount(container ? container.querySelector('#app') : '#app')
// }

// // 独立运行时
// if (!window.__POWERED_BY_QIANKUN__) {
//   render()
// }

// // 微前端环境下的生命周期钩子
// export async function bootstrap() {
//   console.log('[vue] vue app bootstraped')
// }

// export async function mount(props) {
//   console.log('[vue] props from main framework', props)
//   console.log('window.__POWERED_BY_QIANKUN__: ', window.__POWERED_BY_QIANKUN__);

//   render(props)
//   props.onGlobalStateChange((state) => {
//     if (state.language) {
//       console.log('子应用接收', state)
//     }
//   })
// }

// export async function unmount() {
//   console.log('[Vue] app unmounted')
//   instance.unmount()
//   instance = null
// }
