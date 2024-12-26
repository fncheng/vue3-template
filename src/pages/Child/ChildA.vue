<template>
    <div :class="[$style['box-wrapper']]">Pack: 123</div>
    <button @click="count++">{{ count }}</button>
    <p @click="globalContext.incrementAge">{{ globalContext.state.age }}</p>

    <my-pack>
        <template #header>header</template>
        <template #footer>footer</template>
    </my-pack>
</template>

<script setup lang="ts">
import { useContext } from '@/context'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

const count = ref<number>(1)

const globalContext = useContext()

watch(
    () => count.value,
    (val) => {
        if (val > 5) {
            ElMessage.success({
                message: '123',
                duration: 2000
            })
        }
    }
)
</script>

<style lang="scss" module>
.box-wrapper {
    border: 1px solid #ccc;
    &:hover {
        background-color: pink;
        color: blue;
    }
}
.box-wrapper:active {
    background-color: bisque;
}
</style>
