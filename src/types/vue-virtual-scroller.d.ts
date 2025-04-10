declare module 'vue-virtual-scroller' {
    import type { DefineComponent } from 'vue'
    export const RecycleScroller: DefineComponent<{
        items: Array<any>
        itemSize?: number
        minItemSize?: number
        keyField?: string
    }>

    export const DynamicScroller: DefineComponent<{
        items: Array<any>
        itemSize: number
    }>

    export const DynamicScrollerItem: DefineComponent<{}>
}
