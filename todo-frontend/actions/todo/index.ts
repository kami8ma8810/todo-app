import { Todo } from "@/types/todo";

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch("http://localhost:8787/api/todos", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
