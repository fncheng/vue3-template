import { inject, provide, reactive, readonly } from 'vue'

type StoreType = {
    name: string
    age: number
}

type ContextType = {
    state: Readonly<StoreType>
    incrementAge: () => void
}

export function ProvideContext() {
    const state = reactive<StoreType>({
        name: 'zs',
        age: 20
    })
    const incrementAge = () => {
        state.age++
    }
    provide('GlobalContext', { state: readonly(state), incrementAge })
}

export function useContext() {
    const context = inject<ContextType>('GlobalContext')
    if (!context) {
        throw new Error('useContext must be used within a ProvideContext!')
    }
    return context
}