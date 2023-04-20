<script setup lang="ts">
// pinia
// import useTodoListStore from '../store/index'
import useTodoListStore from '@/store/index'

import { storeToRefs } from 'pinia'

const store = useTodoListStore()
const { filterType } = storeToRefs(store)

const filters = [
    // { label: '全部', value: 'all' },
    { label: '未完成', value: 'todo' },
    { label: '已完成', value: 'done' }
]

const filterChange = (pickFilterType: string) => {
    store.filterChange(pickFilterType)
}
</script>
<template>
    <div class="container">
        <div class="filters">
            <span
                v-for="filter in filters"
                :key="filter.value"
                class="filter"
                :class="{ active: filterType === filter.value }"
                @click="filterChange(filter.value)"
                >{{ filter.label }}
            </span>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url('../css/todoFilter.scss');
</style>
