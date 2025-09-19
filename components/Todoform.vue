<template>
  <form class="form-row" @submit.prevent="onSubmit">
    <input class="input" v-model="title" :placeholder="editMode ? 'Edit task...' : 'Add a new task...'" />
    <button class="btn" type="submit">{{ editMode ? 'Update' : 'Add' }}</button>
    <button v-if="editMode" class="btn ghost" type="button" @click="onCancel">Cancel</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

type EditModel = { id: number; title: string } | null

const props = defineProps<{ model?: EditModel }>()
const emit = defineEmits<{
  (e: 'save', payload: { id?: number; title: string }): void
  (e: 'cancel'): void
}>()

const title = ref('')
const editMode = computed(() => !!props.model)

watch(
  () => props.model,
  (v) => {
    title.value = v?.title ?? ''
  },
  { immediate: true }
)

function onSubmit() {
  const t = title.value.trim()
  if (!t) return
  if (editMode.value && props.model) {
    emit('save', { id: props.model.id, title: t })
  } else {
    emit('save', { title: t })
  }
  title.value = ''
}

function onCancel() {
  emit('cancel')
}
</script>

<style scoped></style>
