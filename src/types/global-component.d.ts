import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        AsComponent: typeof import('../components/AsyncComponent.vue')['default']
        AbComponent: DefineComponent<{ number: string }>
    }
}