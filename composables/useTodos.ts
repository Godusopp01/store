import { ref, onMounted, watch } from 'vue'

export type Todo = {
  id: number
  title: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'nuxt3_todos_v1'

export function useTodos() {
  const todos = ref<Todo[]>([])

  onMounted(() => {
    if (process.client) {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          todos.value = JSON.parse(raw) as Todo[]
        } catch (e) {
          console.warn('invalid todos in storage', e)
          todos.value = []
        }
      }
    }
  })

  watch(
    todos,
    (newTodos) => {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
      }
    },
    { deep: true }
  )

  const addTodo = (title: string) => {
    const t: Todo = { id: Date.now(), title, completed: false, createdAt: Date.now() }
    todos.value.unshift(t)
    return t
  }

  const updateTodo = (id: number, patch: Partial<Todo>) => {
    const i = todos.value.findIndex((x) => x.id === id)
    if (i >= 0) {
      todos.value[i] = {
      ...todos.value[i],
      id: patch.id ?? 0,
      title: patch.title ?? '',
      completed: patch.completed ?? false,
      createdAt: patch.createdAt ?? Date.now(),
      };
    }
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((x) => x.id !== id)
  }

  const clearAll = () => {
    todos.value = []
  }

  return { todos, addTodo, updateTodo, removeTodo, clearAll }
}
