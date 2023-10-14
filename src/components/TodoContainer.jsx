/* eslint-disable react/prop-types */
import { memo } from "react";
import TodoItem from "./TodoItem";
import { FcDocument } from "react-icons/fc";
const TodoContainer = ({ todos, search, onDelete, onUpdate }) => {
  const searchedTodos = [
    ...(search
      ? todos.filter((f) => f.todo.toLowerCase().includes(search.toLowerCase()))
      : todos),
  ];
  return (
    <>
      {search && searchedTodos.length == 0 && (
        <div className="text-center p-5">
          <FcDocument className="w-14 h-14 my-2 mx-auto" />
          <h6 className="text-lg font-semibold">No todo found!</h6>
        </div>
      )}
      {search &&
        searchedTodos.length > 0 &&
        searchedTodos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      {!search &&
        todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
    </>
  );
};

export default memo(TodoContainer);
