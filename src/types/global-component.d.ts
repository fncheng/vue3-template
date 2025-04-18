import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        Await: (typeof import('../components/Await.vue'))['default']
        SvgIcon: (typeof import('../components/SvgIcon/SvgIcon.vue'))['default']
        AbComponent: DefineComponent<{ number: string }>
        MarkdownPreview: (typeof import('../components/MarkdownPreview/index.vue'))['default']
    }
}
