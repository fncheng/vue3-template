import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})

export const useUserStore = defineStore(
    'user',
    () => {
        const state = reactive({
            name: 'pinia',
            age: 100
        })
        const setName = (name: string) => {
            state.name = name
        }
        return { state, setName }
    },
    {
        persist: {
            key: 'user', // 存储的key
            storage: localStorage, // 存储方式
            pick: ['state.name', 'state.age'] // 指定要持久化的字段
        }
    }
)
