const App = {
  data () {
    return {
      serverName: '',
      servers: []
    }
  },
  methods: {
    async createCustomServer () {
      if (!this.serverName) {
        return alert('Имя сервера не заполнено!')
      }
      const data = {
        name: this.serverName,
        status: 'working'
      }
      const res = await fetch('/api/server',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      this.servers.push(await res.json())
    },
    async removeServer (id) {
      await fetch(`/api/server/${id}`, { method: 'DELETE' })
      this.servers = this.servers.filter(server => server.id !== id)
    }
  },
  async mounted () {
    const res = await fetch('/api/server')
    this.servers = await res.json()
  }
}
Vue.createApp(App).mount('#app')
