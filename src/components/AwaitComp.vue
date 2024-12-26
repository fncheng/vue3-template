<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  resolve: Promise<any>
}

const props = defineProps<Props>()
const error = ref<Error | null>(null)
const data = ref<any>(null)

// 暴露给父组件的数据
defineExpose({
  error,
  data
})

// 直接在setup中处理Promise
try {
  data.value = await props.resolve
} catch (e) {
  error.value = e as Error
}


</script>

<template>
  <div class="await-component">
    <!-- 错误状态显示 -->
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <!-- 数据加载成功后的插槽 -->
    <slot v-else :data="data"></slot>
  </div>
</template>

<style scoped>
.await-component {
  width: 100%;
}

.error {
  color: #ff4d4f;
  padding: 8px;
}
</style>
