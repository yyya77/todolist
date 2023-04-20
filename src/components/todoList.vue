<script setup lang="ts">
import { reactive, UnwrapRef } from 'vue'
import { todo } from '@/ts/myTodo'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'

import useTodoListStore from '@/store/index'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash-es'

const store = useTodoListStore()
// 利用缓存初始化
store.initTodoList()

const { filteredTodoList, filterType } = storeToRefs(store)

const pagination = {
    defaultPageSize: 5
}

const columns = [
    {
        title: '待做事项',
        dataIndex: 'content',
        width: '60%'
    },
    {
        title: '操作',
        dataIndex: 'operation'
    }
]

const editableData: UnwrapRef<Record<any, todo>> = reactive({})

const lineEdit = (id: number) => {
    editableData[id] = cloneDeep(filteredTodoList.value.filter(item => id === item.id)[0])
}
const lineSave = (id: number) => {
    Object.assign(filteredTodoList.value.filter(item => id === item.id)[0], editableData[id])
    delete editableData[id]
    store.saveList()
}

const onDelete = (id: number) => {
    store.delTodo(id)
}

const setTodoSatus = (id: number) => {
    store.setTodoSatus(id)
}
</script>
<template>
    <div class="container">
        <h3>
            {{ filterType === 'todo' ? '待完成' : '已完成' }}
            <span>{{ filteredTodoList.length }} 个</span>
        </h3>
        <a-table bordered :data-source="filteredTodoList" :columns="columns" :pagination="pagination">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'content'">
                    <div class="editable-cell">
                        <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
                            <a-input
                                v-model:value="editableData[record.id].content"
                                @pressEnter="lineSave(record.id)"
                            />
                            <check-outlined class="editable-cell-icon-check" @click="lineSave(record.id)" />
                        </div>
                        <div v-else class="editable-cell-text-wrapper" :class="{ completed: record.isFinished }">
                            {{ text || '' }}
                            <edit-outlined class="editable-cell-icon" @click="lineEdit(record.id)" />
                        </div>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <span v-if="record.isFinished" class="btn">
                        <a-button type="primary" shape="round" size="small" @click="setTodoSatus(record.id)">
                            取消完成
                        </a-button>
                    </span>
                    <span v-else class="btn">
                        <a-button type="primary" shape="round" size="small" @click="setTodoSatus(record.id)">
                            完成
                        </a-button>
                    </span>
                    <a-popconfirm v-if="filteredTodoList.length" title="确认删除吗?" @confirm="onDelete(record.id)">
                        <a-button type="danger" shape="round" size="small"> 删除 </a-button>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>
<style scoped lang="scss">
@import url('../css/todoList.scss');
</style>
