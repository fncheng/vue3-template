<template>
    <div class="w-full">
        <h5>vapor</h5>
        <input type="text" v-model="msg" />
        <div>
            <SvgIcon name="deepseek" />
            <SvgIcon name="address" />
        </div>
        <section class="flex">
            <div>
                1
                <img width="50" v-for="img in imageUrls" :key="img" :src="img" />
            </div>
            <div>
                2
                <img width="50" v-for="img in images2Urls" :key="img" :src="img" />
            </div>
            <div>
                3
                <img width="50" v-for="img in imgList" :key="img.name" :src="imageMap[img.name]" />
            </div>
        </section>
        <ElRow :gutter="16" class="gap-y-4">
            <ElCol :span="spanConfig"><div class="bg-red-300">1</div></ElCol>
            <ElCol :span="spanConfig"><div class="bg-red-300">1</div></ElCol>
            <ElCol :span="spanConfig"><div class="bg-red-300">1</div></ElCol>
            <ElCol :span="spanConfig"><div class="bg-red-300">1</div></ElCol>
        </ElRow>
        <section class="3xl:grid-cols-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            <div><div class="bg-yellow-200">1</div></div>
            <div><div class="bg-yellow-200">1</div></div>
            <div><div class="bg-yellow-200">1</div></div>
            <div><div class="bg-yellow-200">1</div></div>
        </section>
    </div>
</template>

<script setup lang="ts">
import useDefaultSpanConfig from '@/hooks/useDefaultSpanConfig'
import { AutoloadImages } from '@/utils'
import { ElCol, ElRow } from 'element-plus'
import { ref } from 'vue'

defineOptions({ name: 'VaporView' })

const msg = ref('')

//#region 方法一
const images = import.meta.glob(`@/assets/images/platform-icon*.png`)

const imageUrls = ref<string[]>([])
AutoloadImages(images).then((urls) => (imageUrls.value = urls))
//#endregion

//#region 方法二
const images2 = import.meta.glob<string>('@/assets/images/platform-icon*.png', {
    eager: true,
    import: 'default'
})
const images2Urls = Object.values(images2)
//#endregion

//#region 方法三
const imgList = [
    { name: 'platform-icon1' },
    { name: 'platform-icon2' },
    { name: 'platform-icon3' },
    { name: 'platform-icon4' }
]

const imageMap: Record<string, string> = {}

Object.entries(images2).forEach(([key, value]) => {
    const filename = key.split('/').pop()?.replace('.png', '')
    if (filename) {
        imageMap[filename] = value as string
    }
})
//#endregion
const spanConfig = useDefaultSpanConfig()
</script>
