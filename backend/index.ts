import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
// Routes
import { users } from './routes/users'
// db
import database from './dbRoute/connection'

const app = new Elysia()
  .use(cors())
  .use(openapi({
    documentation: {
      info: {
        title: 'Insomnia API',
        version: '1.0.0',
        description: 'API backend pour le frontend Insomnia',
      },
    },
  }))
  .decorate('db', database)
  .get('/api/message', () => ({
    text: 'Bonjour depuis le backend Elysia !',
  }), {
    detail: {
      summary: 'Message de test',
      tags: ['Health'],
    },
  })
  .use(users)

app.listen(3000, () => {
  console.log('Rolltopia is running at http://localhost:3000 \n')
})