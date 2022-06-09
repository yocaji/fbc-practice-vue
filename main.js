const STORAGE_KEY = 'my-todo'
const todoStorage = {
  fetch () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
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

  watch: {
    todos: {
      handler (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    }
  }
})

app.mount('.todoapp')
