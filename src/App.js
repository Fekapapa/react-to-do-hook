import React, { useState } from 'react';
import './App.css';

TodoForm = ({ addTodo }) => {
  // declaration of the input field's state
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    // prevent the "click" default behavior
    e.preventDefault();

    // if there is no value, we should not do anything
    if (!value) return;

    // call App's addTodo function with the current value and set the input field's state to empty string
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

App = () => {
  // declaration of the initial state
  const [todos, setTodos] = useState([
    { text: "Learn about React",
      isCompleted: false },
    { text: "Meet friend for lunch",
      isCompleted: false },
    { text: "Build really cool todo app",
      isCompleted: false }
  ]);

  const addTodo = text => {
    // using spread operator to add a new element to the state
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    // copy current state injto a variable
    const newTodos = [...todos];

    // changing a value in our variable
    newTodos[index].isCompleted = true;

    // setting the state equal to the variable
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];

    // cutting out 1 element from the array
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App
