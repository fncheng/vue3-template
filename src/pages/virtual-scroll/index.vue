<script setup lang="ts">
import { ref, computed } from 'vue'

const showCount = ref(5)

const itemHeight = computed(() => 200 / showCount.value)

const list = ref(
    Array.from({ length: 100 }, (v, i) => ({
        id: String(i),
        title: `title ${i}`
    }))
)
</script>

<template>
    <div class="flex w-full gap-x-8 pb-4">
        <!-- <ElSlider v-model="showCount" :max="10" :min="1"></ElSlider> -->
        <RecycleScroller
            class="scroller h-[200px] w-1/2"
            :items="list"
            :min-item-size="itemHeight"
            key-field="id"
        >
            <template #default="{ item }">
                <div class="user">
                    {{ item }}
                </div>
            </template>
        </RecycleScroller>

        <div class="flex flex-1 flex-col">
            <div class="mb-4">
                <span>知识切片</span>
            </div>
            <DynamicScroller class="scroller flex-1" :items="list" :min-item-size="50">
                <template #default="{ item, index }">
                    <DynamicScrollerItem :item="item" :size-dependencies="[item.title]">
                        <div class="dynamic-item flex">
                            <h4>{{ index + 1 }}</h4>
                            <p>{{ item.title }}</p>
                        </div>
                    </DynamicScrollerItem>
                </template>
            </DynamicScroller>
        </div>
    </div>
</template>

<style lang="css" scoped>
.wrapper {
    width: 400px;
}
.scroller {
    /* height: 200px; */
    border: 1px solid #ccc;
}
</style>
