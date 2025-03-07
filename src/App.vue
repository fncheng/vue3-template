<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { loadWithDelay } from './router'
import { ProvideGlobalContext } from './context'

// const AsyncComponent = defineAsyncComponent(() =>
//     loadWithDelay(import('./pages/AsyncComponent.vue'), 2000)
// )

const AsyncComponent = defineAsyncComponent({
    loader: () => loadWithDelay(import('@/components/AsyncComponent.vue'), 100, 'AsyncComponent'),
    delay: 200
})
const showAsyncComponent = ref<boolean>(false)

ProvideGlobalContext()
</script>

<template>
    <div class="app-layout">
        <ul class="sidebar-wrapper">
            <RouterLink to="/">/</RouterLink>
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/suspense/cache">SuspenseCache</RouterLink>
            <RouterLink to="/suspense/no-cache">SuspenseNoCache</RouterLink>
            <RouterLink to="/test">Test</RouterLink>
            <RouterLink to="/context">Context</RouterLink>
            <RouterLink to="/child-a">child-a</RouterLink>
            <RouterLink to="/child-a/vapor">vapor</RouterLink>
            <RouterLink to="/child-b">child-b</RouterLink>
            <RouterLink to="/pdf">pdf</RouterLink>
            <RouterLink to="/file-upload">file-upload</RouterLink>
            <RouterLink to="/sse">sse</RouterLink>
            <RouterLink to="/chat">chat</RouterLink>
            <RouterLink to="/el/form">el-form</RouterLink>
            <RouterLink to="/el/cascader">el-cascader</RouterLink>
            <RouterLink to="/editor">editor</RouterLink>
            <RouterLink to="/canvas">canvas</RouterLink>
            <RouterLink to="/big-img">big-img</RouterLink>
            <RouterLink to="/virtual-scroll">virtual-scroll</RouterLink>
            <RouterLink to="/ckeditor">ckeditor</RouterLink>
        </ul>
        <Suspense>
            <template #fallback>Loading number...</template>
            <template #default>
                <async-component
                    v-if="showAsyncComponent"
                    :key="showAsyncComponent"
                ></async-component>
            </template>
        </Suspense>

        <!-- <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition name="fade" mode="out-in">
                <Suspense>
                    <component :is="Component"></component>
                    <template #fallback>正在加载中...</template>
                </Suspense>
            </Transition>
        </template>
    </RouterView> -->
        <Suspense>
            <template #fallback>Loading...</template>
            <template #default>
                <main class="h-full w-full">
                    <RouterView :key="$route.fullPath" />
                </main>
            </template>
        </Suspense>
    </div>
</template>

<style>
.app-layout {
    display: flex;
    height: 100%;
    flex: 1;
}
.sidebar-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    min-width: fit-content;
    padding-right: 10px;
}
</style>
