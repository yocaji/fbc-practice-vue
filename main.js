const STORAGE_KEY = 'my-todo'
const todoStorage = {
  fetch () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = Vue.createApp({
  data () {
    return {
      title: 'My ToDo',
      todos: todoStorage.fetch(),
      newTodo: ''
    }
  },

  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: crypto.randomUUID(),
        title: value,
        completed: false
      })
      this.saveTodos()
      this.newTodo = ''
    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.saveTodos()
    },

    saveTodos () {
      todoStorage.save(this.todos)
    }
  }
})

app.mount('.todoapp')
