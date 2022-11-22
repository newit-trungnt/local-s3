// import * as express from 'express'
// import * as morgan from 'morgan'
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import * as bodyParser from 'body-parser'
// dotenv.config()

// import { apiRouter } from './router';

// const app = express()
// const port = 3000

// // Middleware
// app.use(bodyParser.json())
// app.use(morgan('combined'))

// app.get('health', (req, res) => {
//   res.send('OK')
// })

// app.use('/api', apiRouter)

// app.listen(port, () => {
//   console.log(`Server is running ⚡️ on ${port}`)
// })
import 'dotenv/config'
import App from './app'
import controllers from './controllers'

const app = new App(controllers)

app.listen()