<template>
    <ElForm ref="formRef" :model="addForm">
        <ElFormItem
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
        >
            <div>
                <ElInput v-model:model-value="addForm.name"></ElInput>
                <div>姓名dsadasda</div>
            </div>
        </ElFormItem>
        <ElFormItem
            label="年龄"
            prop="age"
            :rules="[{ required: true, message: '请输入年龄', trigger: 'blur' }]"
        >
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
import { ElButton, ElForm, ElFormItem, ElInput, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
defineOptions({ name: 'ElFormView' })

const addForm = reactive({
    name: '',
    age: undefined
})

const formRef = ref<FormInstance | null>(null)

const handleSubmit = () => {
    formRef.value &&
        formRef.value.validate(async (valid) => {
            console.log('valid: ', valid)
            if (valid) {
                console.log('submit!')
            }
        })
}
</script>
