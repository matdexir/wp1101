import "./styles.css";
import { useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [status, setStatus] = useState("all");
  let task_done = 0;
	let task_left = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i] && todos[i].completed) task_done = task_done + 1;
		else if (todos[i]) task_left = task_left + 1;
  }

  return (
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <input
          className="todo-app__input"
          id="task-input"
          placeholder="What needs to be done?"
          onKeyUp={(event) => {
            event.preventDefault();
            if (event.key === "Enter") {
              setTodos([
                ...todos,
                { task: event.target.value, completed: false }
              ]);
							event.target.value = "";
            }
          }}
        />
        {!!(task_done + task_left) && (
          <ul className="todo-app__list" id="todo-list">
            {todos.map((item, i) => {
              if (!item) return null;
							if(status == "active" && item.completed) return null;
							if(status == "completed" && !item.completed) return null;
              return (
                <li className="todo-app__item">
                  <div className="todo-app__checkbox">
                    <input
                      id={i}
                      type="checkbox"
                      checked={todos[i].completed}
                      onClick={() => {
                        todos[i].completed = !todos[i].completed;
                        setTodos(Array.from(todos));
                      }}
                    ></input>
                    <label htmlFor={i}></label>
                  </div>
                  <h1
                    className="todo-app__item-detail"
                    style={
                      todos[i].completed
                        ? { textDecoration: "line-through", opacity: 0.5 }
                        : {}
                    }
                  >
                    {item.task}
                  </h1>
                  <img
                    src="./x.png"
                    className="todo-app__item-x"
                    onClick={() => {
                      delete todos[i];
                      setTodos(Array.from(todos));
                    }}
                  ></img>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {!!(task_done + task_left) && (
        <footer className="todo-app__footer" id="todo-footer">
          <div className="todo-app__total">{task_left} left</div>
          <ul className="todo-app__view-buttons">
            <li>
              <button onClick={()=>setStatus("all")}>All</button>
            </li>
            <li>
              <button onClick={()=>setStatus("active")}>Active</button>
            </li>
            <li>
              <button onClick={()=>setStatus("completed")}>Completed</button>
            </li>
          </ul>
          {!!task_done && (
            <div className="todo-app__clean">
              <button
                onClick={() => {
                  for (let i = 0; i < todos.length; i++) {
                    if (todos[i] && todos[i].completed) delete todos[i];
                  }
                  setTodos(Array.from(todos));
                }}
              >
                Clear completed
              </button>
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
export default App;
