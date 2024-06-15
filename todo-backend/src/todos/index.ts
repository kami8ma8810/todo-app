import { Hono } from 'hono'

const app = new Hono()

interface Todo {
  id: number
  title: string
  delete_flg: boolean
}

// このアプリでは DB を使わず仮置きのデータを使用する
let todos: Todo[] = [
  { id: 1, title: '朝起きたらコップ一杯の水を飲む', delete_flg: false },
  { id: 2, title: '朝食は必ずブロッコリーとヨーグルトをメニューに入れる', delete_flg: false },
  { id: 3, title: '2日に1回、歯のフロスをする', delete_flg: false },
]

/**
 * Todo 一覧取得 API
 */
app.get("/", (c) => c.json(todos.filter((todo) => !todo.delete_flg)));

/**
 * Todo 登録 API
 */
app.post("/", async (c) => {
  const { title } = await c.req.json<{ title: string }>();
  if (!title) {
    return c.json({ message: "タイトルは必須です" }, 400);
  }
  const newId = todos[todos.length - 1].id + 1;
  const newTodo: Todo = { id: newId, title, delete_flg: false };
  todos = [...todos, newTodo];
  return c.json(newTodo);
});

/**
 * Todo 更新 API
 */
app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return c.json({ message: "Todoは存在しません" }, 404);
  }

  const { title } = await c.req.json<{ title: string }>();
  if (!title) {
    return c.json({ message: "タイトルは必須です" }, 400);
  }
  todos[index] = { ...todos[index], title };
  return c.json(todos[index]);
});

/**
 * Todo 削除 API
 */
app.put("/:id/delete", (c) => {
  const id = c.req.param("id");
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return c.json({ message: "Todoは存在しません" }, 404);
  }

  todos[index] = { ...todos[index], delete_flg: true };
  return c.json(todos[index]);
});

export default app
