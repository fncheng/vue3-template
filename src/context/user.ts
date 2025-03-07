import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useUserState = createGlobalState(() => {
    const count = ref(0)
    const increment = () => {
        count.value++
    }
    return {
        count,
        increment
    }
})
