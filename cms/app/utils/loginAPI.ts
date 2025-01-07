// src/utils/api.ts

import { BASE_URL } from "./environment";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoList = Todo[];

// This is my api I want to use as an example
export const fetchTodoList = async (): Promise<TodoList> => {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
