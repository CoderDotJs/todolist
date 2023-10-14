/* eslint-disable react/prop-types */
import "./App.css";
import { FcDocument } from "react-icons/fc";
import { useEffect, useState } from "react";
import TodoContainer from "./components/TodoContainer";

function App() {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);

  //get all todos on first load
  useEffect(() => {
    const allTodos = localStorage.getItem("todos");
    allTodos ? setTodos(JSON.parse(allTodos)) : null;
    return () => {
      const allTodos = localStorage.getItem("todos");
      allTodos ? setTodos(JSON.parse(allTodos)) : null;
    };
  }, []);

  //save a todo only takes todo object
  const onSave = (data) => {
    const allTodos = [...todos];
    allTodos.push(data);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodos(allTodos);
  };
  //update a todo only takes the todo object and the index of the todo
  const onUpdate = (data, index) => {
    const allTodos = [...todos];
    const obj = { ...allTodos[index], ...data };
    allTodos.splice(index, 1, obj);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodos(allTodos);
  };
  //delete the todo only takes index of the todo
  const onDelete = (index) => {
    const allTodos = [...todos];
    allTodos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodos(allTodos);
  };

  return (
    <div className="bg-[#f4f5f9] bg-opacity-25 flex flex-col justify-center items-center h-screen w-full ">
      <div className="absolute w-full h-1/2 bg-slate-400 top-0 left-0 -z-10"></div>
      {/* Add todo form  */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const todo = e.target[0].value;
          onSave({ todo: todo, isCompleted: false });
          e.target[0].value = "";
        }}
        className="w-10/12 lg:w-6/12 mx-auto bg-white rounded-md shadow-md p-3 flex items-center gap-4"
      >
        <input
          type="text"
          className="border focus:border-gray-400 w-full transition-all duration-75 outline-none rounded-sm px-3 py-2"
          placeholder="Eg. watch jujutsu kaisen"
          required
        />
        <button className="px-6 py-2 bg-slate-400 rounded-sm text-white">
          Add
        </button>
      </form>
      {/* todo list body  */}
      <div className="mt-5 w-10/12 lg:w-6/12 mx-auto bg-white rounded-md shadow-md p-3 flex flex-col items-center gap-4">
        {/* todo search bar  */}
        <div className="w-full">
          <input
            type="text"
            className="border focus:border-gray-400 w-full transition-all duration-75 outline-none rounded-sm px-3 py-2"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* todo items  */}
        <div className="w-full grid grid-cols-1 max-h-80 overflow-y-auto border">
          {todos?.length == 0 ? (
            //if has no todo
            <div className="text-center p-5">
              <FcDocument className="w-14 h-14 my-2 mx-auto" />
              <h6 className="text-lg font-semibold">No todos to show!</h6>
            </div>
          ) : (
            // todo container
            <TodoContainer
              todos={todos}
              search={search}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
