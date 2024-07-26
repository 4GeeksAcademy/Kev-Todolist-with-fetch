import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getAllTodos, createTodo, updateTodo, deleteTodo, clearAllTodos } from './todolist';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const userName = "kevin"

  useEffect(() => {
    const fetchTodos = async () =>{
      const fetchedTodos = await getAllTodos();
      setTodos(fetchedTodos) 
    };
    fetchTodos();
  },[]);

  const addTodos = async () =>{
    if (inputValue.trim() === "") return;
    const newTodo = {
      label: inputValue,
      done: false
    };
    const createdTodo = await createTodo(userName, newTodo);
    setTodos([...todos, createdTodo]);
    setInputValue("");
  }

  const removeTodos = async (id) =>{
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id))
  };

  const clearTodos = async () =>{
    await clearAllTodos(userName);
    setTodos([])
  }

  return (
    <div>
      <h1>todos</h1>
      <ul className="todolist">
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addTodos();
              }
            }}
            placeholder="What needs to be done?"
          ></input>
        </li>

        {todos.map((item) => (
          <li key= {item.id}>
            {item.label}{" "}
            <FontAwesomeIcon
              className="icon"
              icon={faXmark}
              onClick={() =>
                removeTodos(item.id)
              }
            />
          </li>
        ))}

        
      </ul>
      <div id="tasks-left">{todos.length} Tasks left</div>
      <button onClick={clearTodos}>Clear All</button>
      <div id="bottom-1"></div>
      <div id="bottom-2"></div>
    </div>
  );
};

export default Home;