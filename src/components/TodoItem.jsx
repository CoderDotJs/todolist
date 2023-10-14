/* eslint-disable react/prop-types */
import {
  Checkbox,
  FocusLock,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { GoCopy } from "react-icons/go";
import { LuPencil } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { memo, useRef } from "react";

const TodoItem = ({ index, todo, onDelete, onUpdate }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    isOpen: deleteOpen,
  } = useDisclosure();
  const firstFieldRef = useRef(null);
  return (
    <div
      key={index}
      className="border border-l-0 border-r-0 border-b-0 first:border-t-0 last:border-b-0 flex justify-between items-center gap-2 p-2"
    >
      <Checkbox
        isChecked={todo.isCompleted}
        className="border-slate-400 flex-grow"
        id={todo.todo}
        onChange={() => {
          let obj = { ...todo };
          obj.isCompleted = !todo.isCompleted;
          onUpdate(obj, index);
        }}
      >
        <span className={todo.isCompleted ? "line-through" : ""}>
          {todo.todo}
        </span>
      </Checkbox>
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(todo.todo);
          alert("Todo copied!");
        }}
      >
        <GoCopy className="text-lg mx-1 cursor-pointer" title="Click to copy" />
      </IconButton>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="auto"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton className="bt-white" onClick={onOpen}>
            <LuPencil className="text-lg text-green-400 mx-1 cursor-pointer" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent p={3}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <h6 className="font-semibold mb-1">Update</h6>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newTodo = e.target[0].value;
                const obj = { ...todo, todo: newTodo };
                onUpdate(obj, index);
                onClose();
              }}
            >
              <input
                type="text"
                className="border focus:border-gray-400 w-full transition-all duration-75 outline-none rounded-sm px-3 py-2"
                placeholder="Eg. watch jujutsu kaisen"
                required
                defaultValue={todo.todo}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-slate-400 rounded-sm text-white mt-3"
                >
                  Save
                </button>
              </div>
            </form>
          </FocusLock>
        </PopoverContent>
      </Popover>
      <Popover
        isOpen={deleteOpen}
        onOpen={onDeleteOpen}
        onClose={onDeleteClose}
        placement="auto"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton onClick={onDeleteOpen}>
            <AiOutlineDelete className="text-lg text-red-400 mx-1 cursor-pointer" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent p={3} w={200}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <h6 className="text-center font-semibold">Are you sure?</h6>
            <div className="flex justify-center gap-3 pt-3">
              <button
                className="px-3 py-1 bg-red-400 rounded-sm text-white mt-3 text-sm"
                onClick={() => onDeleteClose()}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-slate-400 rounded-sm text-white mt-3 text-sm"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </div>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default memo(TodoItem);
