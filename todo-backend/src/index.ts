import { Hono } from 'hono'
import todos from './todos'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors({
  origin: 'http://localhost:3000', // フロントエンドのオリジンを許可
  credentials: true
}))
app.route('/api/todos', todos)

export default app
