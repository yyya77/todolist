import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { todo } from '../ts/myTodo'
import { localSave, localGet } from '../utils/cache'

const useTodoListStore = defineStore('todoList', () => {
    const id = ref(0)
    const filterType = ref('todo')
    let todoList = reactive([] as todo[])

    const initTodoList = () => {
        const startId = localGet('startId')

        const initList = localGet('todoList')
        id.value = startId || 0

        todoList = reactive(initList || ([] as todo[]))
    }

    const filterChange = (pickType: string) => {
        filterType.value = pickType
    }

    // 筛选todolist
    const filteredTodoList = computed(() => {
        switch (filterType.value) {
            case 'done':
                return todoList.filter(todo => todo.isFinished)
            case 'todo':
                return todoList.filter(todo => !todo.isFinished)
            default:
                return todoList
        }
    })

    const addTodo = (content: string) => {
        todoList.push({
            id: id.value,
            content,
            isFinished: false
        })
        id.value++
        localSave('startId', id.value)
        localSave('todoList', todoList)
    }

    const delTodo = (id: number) => {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id === id) {
                todoList.splice(i, 1)
            }
        }
        localSave('todoList', todoList)
    }

    const setTodoSatus = (id: number) => {
        todoList.forEach(item => {
            if (item.id === id) {
                item.isFinished = !item.isFinished
            }
        })
        localSave('todoList', todoList)
    }

    const saveList = () => {
        localSave('todoList', todoList)
    }

    return {
        filterType,
        filteredTodoList,
        initTodoList,
        addTodo,
        delTodo,
        filterChange,
        setTodoSatus,
        saveList
    }
})

export default useTodoListStore
