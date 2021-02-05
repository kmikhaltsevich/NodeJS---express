import express from 'express'
import path from 'path'
import colors from 'colors'
import { requestTime, logger } from './middleware.js'
import serverRoutes from './routes/servers.js'

const __dirname = path.resolve()
const PORT = process.env.PORT || 3000
const app = express()

// --- использование middleware
// ------ использование папки static
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestTime)
app.use(logger)

// использование api
app.use(serverRoutes)

// --- отображение страниц ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))
app.get('/', (req, res) => {
  res.render('index', { title: 'Main page NodeJS server' })
})

// --- отображение страниц HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })

// app.get('/download', (req, res) => {
//   res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

app.listen(3000, () => {
  console.log(colors.bgYellow.black(`Server has been started on ${PORT}...`))
})
