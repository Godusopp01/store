<template>
  <div>
    <div v-if="todos.length === 0" class="empty">No List Todo</div>

    <div v-for="t in todos" :key="t.id" class="todo-item">
      <div class="todo-left">
        <input class="checkbox" type="checkbox" :checked="t.completed" @change="$emit('toggle', t.id)" />
        <div :class="['todo-title', t.completed ? 'completed' : '']">{{ t.title }}</div>
      </div>

      <div class="controls">
        <button class="btn ghost" @click="$emit('edit', t.id)">Edit</button>
        <button class="btn" @click="$emit('remove', t.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/composables/useTodos'
const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'remove', id: number): void
  (e: 'toggle', id: number): void
}>()
</script>

<style scoped></style>
