<template>
    <v-md-editor v-model="content" height="100%"></v-md-editor>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import { katexStr, renderBlockMath, renderInlineMath } from '@/app/utils/katex'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'

VMdEditor.use(vuepressTheme)
VMdEditor.use(createKatexPlugin())

const text = ref(katexStr)

// const content = computed(() => {
//     let processed = renderBlockMath(text.value)
//     processed = renderInlineMath(processed)
//     return processed
// })
const content = computed(() =>
    text.value.replace(/\\\[((.|\n)+?)\\\]/g, '$$$$$1$$$').replace(/\\\(\s(.+?)\s\\\)/g, '$$$1$')
)
</script>
