<script setup lang="ts">
import todoList from '@/components/todoList.vue'
import todoAdd from '@/components/todoAdd.vue'
import todoFilter from '@/components/todoFilter.vue'
</script>

<template>
    <h1>todoList</h1>
    <todo-add />
    <todo-filter />
    <todo-list />
</template>

<style scoped></style>
