<template>
    <ElForm ref="formRef" :model="addForm" :rules="rules">
        <ElFormItem label="姓名" prop="name">
            <div>
                <ElInput v-model:model-value="addForm.name"></ElInput>
                <div>姓名dsadasda</div>
            </div>
        </ElFormItem>
        <ElFormItem label="年龄" prop="age">
            <ElInput v-model:model-value="addForm.age"></ElInput>
        </ElFormItem>
        <ElButton type="primary" @click="handleSubmit">Submit</ElButton>
    </ElForm>
    <div>
        <p class="text-red-400 text-[20px]">文字abcd</p>
        <p class="text-[#646566]">文字abcd</p>
    </div>
    <div>
        <p>接口并发控制</p>
        <ElButton @click="handleRequest">按钮</ElButton>
    </div>
</template>

<script setup lang="ts">
import { getNumber } from '@/api/api'
import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    type FormRules,
    type FormInstance
} from 'element-plus'
import { reactive, ref } from 'vue'
defineOptions({ name: 'ElFormView' })

type RuleForm = {
    name: string
    age: number
}

const addForm = reactive<RuleForm>({
    name: '',
    age: 20
})

const rules = reactive<FormRules<RuleForm>>({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    age: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
})

const formRef = ref<FormInstance | null>(null)

/**
 * 发起任务
 */
const handleSubmit = () => {
    formRef.value &&
        formRef.value.validate(async (valid) => {
            console.log('valid: ', valid)
            if (valid) {
                console.log('submit!', addForm)
            }
        })
}

//#region 
const taskCount = ref(10)
/** 最大并发数 */
const MAX_CONCURRENT_REQUESTS = 3
/** 当前请求数 */
let currentRequests = 0
/** 等待上传的任务队列 */
const queue: Array<() => Promise<void>> = []

/**
 * 运行任务
 * @param task
 */
const runTask = async (task: () => Promise<void>) => {
    currentRequests++
    try {
        await task()
    } catch (error) {
        console.log('error: ', error)
    } finally {
        currentRequests--
        if (queue.length > 0) {
            const nextTask = queue.shift()
            nextTask && runTask(nextTask)
        }
    }
}

/**
 * 添加任务到队列
 * @param task
 */
const enqueueTask = async (task: () => Promise<void>) => {
    if (currentRequests < MAX_CONCURRENT_REQUESTS) {
        runTask(task)
    } else queue.push(task)
}

const handleRequest = () => {
    console.log(`开始 ${taskCount.value} 个任务`)
    for (let i = 0; i < taskCount.value; i++) {
        enqueueTask(async () => {
            await getNumber({ id: i })
            console.log(`任务 ${i} 完成`)
        })
    }
}
//#endregion
</script>
