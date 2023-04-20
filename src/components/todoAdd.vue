<script setup lang="ts">
import { reactive } from 'vue'

// pinia
import useTodoListStore from '@/store/index'
// 接口
import { form } from '@/ts/form'

const formState = reactive<form>({
    content: ''
})

const store = useTodoListStore()

const handleFinish = (values: form) => {
    store.addTodo(formState.content)
    formState.content = ''
}
</script>
<template>
    <div class="container">
        <div class="add">
            <div class="add-input">
                <a-form
                    ref="formRef"
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="handleFinish"
                >
                    <a-form-item
                        label=""
                        name="content"
                        :rules="[{ required: true, message: '输入不能为空!', trigger: false }]"
                        :wrapper-col="{ offset: 0, span: 24 }"
                    >
                        <a-input size="large" v-model:value="formState.content" placeholder="添加ToDo" />
                    </a-form-item>
                    <a-button type="primary" html-type="submit">添加</a-button>
                </a-form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url('../css/todoAdd.scss');
</style>
