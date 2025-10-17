import { useState, useEffect, useCallback } from "react";
import { eq } from "drizzle-orm";
import { getDatabase } from "../db";
import { todos, type Todo } from "../db/schema";
import { getDeviceId } from "../utils/deviceId";

export function useTodos() {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // Get device ID on mount
  useEffect(() => {
    getDeviceId().then(setDeviceId);
  }, []);

  // Load todos from database
  const loadTodos = useCallback(async () => {
    if (!deviceId) {
      return;
    }

    try {
      const db = await getDatabase();
      const userTodos = await db
        .select()
        .from(todos)
        .where(eq(todos.userId, deviceId))
        .orderBy(todos.createdAt);
      
      setTodosList(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Add a new todo
  const addTodo = useCallback(async (text: string) => {
    if (!deviceId) return;

    const newTodo = {
      id: Date.now().toString(),
      userId: deviceId,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };

    try {
      const db = await getDatabase();
      await db.insert(todos).values(newTodo);
      await loadTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }, [deviceId, loadTodos]);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string) => {
    if (!deviceId) return;

    try {
      const db = await getDatabase();
      const todo = todosList.find((t) => t.id === id);
      if (todo) {
        await db
          .update(todos)
          .set({ completed: !todo.completed })
          .where(eq(todos.id, id));
        await loadTodos();
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }, [deviceId, todosList, loadTodos]);

  // Delete a todo
  const deleteTodo = useCallback(async (id: string) => {
    if (!deviceId) return;

    try {
      const db = await getDatabase();
      await db.delete(todos).where(eq(todos.id, id));
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, [deviceId, loadTodos]);

  // Load todos on mount and when userId changes
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos: todosList,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    refresh: loadTodos,
  };
}

