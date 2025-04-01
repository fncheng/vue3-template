<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

defineOptions({ name: 'HomeView' })

const visible = ref(false)
</script>

<template>
    <main>
        <!-- <img src="/images/baogang.png" alt="">
        <img :src="img" alt=""> -->
        <SvgIcon name="logo" :size="120" />
        <h1>Home</h1>
        <button @click="visible = !visible">show drawer</button>
        <ElDrawer
            :model-value="visible"
            @update:model-value="visible = $event"
            title="I'm the title"
            :with-header="false"
            :append-to-body="true"
        >
            <span>I'm the content</span>
        </ElDrawer>
    </main>
</template>

<style lang="css" module>
.bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    transform: scaleX(-1);
}
</style>

<style lang="css">
/* body {
    height: 100vh;
    background-image: url('../assets/images/banner1.png');
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
} */
</style>
