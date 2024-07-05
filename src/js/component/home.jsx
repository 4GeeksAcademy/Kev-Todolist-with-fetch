import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>todos</h1>
      <ul className="todolist">
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat([inputValue]));
                setInputValue("");
              }
            }}
            placeholder="What needs to be done?"
          ></input>
        </li>

        {todos.map((item, index) => (
          <li>
            {item}{" "}
            <FontAwesomeIcon
              className="icon"
              icon={faXmark}
              onClick={() =>
                setTodos(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            />
          </li>
        ))}

        <div id="tasks-left">{todos.length} Tasks left</div>
      </ul>
      <div id="bottom-1"></div>
      <div id="bottom-2"></div>
    </div>
  );
};

export default Home;
