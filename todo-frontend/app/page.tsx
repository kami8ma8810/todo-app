import { getAllTodos } from "@/actions/todo";
import { Logo } from "@/components/logo";
import TodoForm from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { Todo as TodoType } from "@/types/todo";

export default async function Home() {
  const todos: TodoType[] = await getAllTodos();

  return (
    <div className="container p-32 flex flex-col items-center bg-muted h-+ + full space-y-16">
      <Logo />
      <TodoForm />
      <Separator />
      <TodoList todos={todos} />
    </div>
  );
}
