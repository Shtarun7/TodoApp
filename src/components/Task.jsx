import { forwardRef } from "react";

const Task = forwardRef(
  ({ tasks, setTasks, task, addTask, setEditId }, ref) => {
    const handleCheck = () => {
      const updatedTask = { ...task, completed: true };
      const filteredTasks = tasks.filter((data) => task.id !== data.id);
      setTasks([...filteredTasks, updatedTask]);
    };

    const handleEdit = () => {
      console.log("task", task);
      if (ref && ref.current) {
        ref.current.focus();
        ref.current.value = task.title;
      }

      setEditId(task.id);
    };

    const handleDelete = () => {
      const filteredTasks = tasks.filter((data) => task.id !== data.id);
      setTasks(filteredTasks);
    };

    return (
      <div className="w-full h-[3vw] rounded-xl flex items-center justify-between bg-gray-900 text-gray-400">
        <div className="content flex items-center gap-4 pl-4">
          <i
            className={`ri-circle-line text-4xl ${
              task.completed ? "text-green-500" : ""
            }`}
            onClick={handleCheck}
          ></i>
          <p className={`${task.completed ? "line-through" : ""}`}>
            {task.title}
          </p>
        </div>
        <div className="operations">
          <i
            className="ri-edit-box-line text-4xl font-thin"
            onClick={handleEdit}
          ></i>
          <i
            className="ri-delete-bin-7-line text-4xl font-thin"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    );
  }
);

export default Task;
