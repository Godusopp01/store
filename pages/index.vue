<template>
  <div class="container">
    <app-header />
    <todo-form :model="editingModel" @save="onSave" @cancel="onCancelEdit" />
    <todo-list :todos="todos" @edit="onEdit" @remove="onRemove" @toggle="onToggle" />
    <div style="margin-top:16px;display:flex;gap:8px">
      <button class="btn ghost" @click="clearAll">Clear all</button>
      <div class="small" style="align-self:center">Total: {{ todos.length }}</div>
    </div>

    <app-footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodos } from '~/composables/useTodos'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import TodoForm from '~/components/Todoform.vue'
import TodoList from '~/components/TodoList.vue'

const { todos, addTodo, updateTodo, removeTodo, clearAll } = useTodos()


const editingId = ref<number | null>(null)
const editingModel = computed(() => {
  if (editingId.value == null) return null
  const t = todos.value.find((x) => x.id === editingId.value)
  return t ? { id: t.id, title: t.title } : null
})

function onSave(payload: { id?: number; title: string }) {
  if (payload.id != null) {
    updateTodo(payload.id, { title: payload.title })
    editingId.value = null
  } else {
    addTodo(payload.title)
  }
}

function onEdit(id: number) {
  editingId.value = id
}

function onCancelEdit() {
  editingId.value = null
}

function onRemove(id: number) {
  if (confirm('Delete this task?')) removeTodo(id)
}

function onToggle(id: number) {
  const t = todos.value.find((x) => x.id === id)
  if (!t) return
  updateTodo(id, { completed: !t.completed })
}
</script>

<style scoped></style>
