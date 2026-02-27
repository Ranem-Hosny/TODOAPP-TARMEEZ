import React, { createContext, useContext, useState } from "react";

const TodoListContext = createContext();

export const useTodoList = () => useContext(TodoListContext);

export default function TOdolistProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filterTasks, setFilterTasks] = useState("all");


  return (
    <TodoListContext.Provider value={{ tasks, setTasks ,filterTasks,setFilterTasks}}  >
      {children}
    </TodoListContext.Provider>
  );
}
