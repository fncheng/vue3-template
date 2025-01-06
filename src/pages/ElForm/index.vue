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
</template>

<script setup lang="ts">
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

const handleSubmit = () => {
    formRef.value &&
        formRef.value.validate(async (valid) => {
            console.log('valid: ', valid)
            if (valid) {
                console.log('submit!', addForm)
            }
        })
}
</script>
