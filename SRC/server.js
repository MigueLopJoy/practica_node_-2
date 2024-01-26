const http = require('http')
const url = require('url')
const routes = require('./routes.js')
const { initializeDatabase } = require('./database.js')

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const fullRoute = url.parse(req.url, true)
  await routes.handleRequest(req, res, fullRoute)
})

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
  initializeDatabase()
})