import { useRef, useState } from "react";
import Task from "./components/Task";
import { v4 as uuid } from "uuid";
function App() {
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const countCompleted = () => {
    const completed = tasks.filter((task) => task.completed == true);
    return completed.length;
  };
  const addTask = (task) => {
    if (!editId) {
      const newTask = {
        id: uuid(),
        title: task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    } else if (editId) {
      const task = tasks.find((data) => data.id == editId);
      task.title = inputRef.current.value;
      const filteredTasks = tasks.filter((task) => task.id != editId);
      setTasks([...filteredTasks, task]);
      setEditId(null);
    }
    inputRef.current.value = "";
  };
  return (
    <div className="w-full h-screen bg-black">
      <nav className="pt-8 pl-20  h-[20%] w-full">
        <span className="text-primary font-semibold">XERO</span>
        <span className="text-secondry font-semibold">TODO</span>
      </nav>
      <main className="flex flex-col justify-around items-center  w-full h-[70%]">
        <div className="tracker w-[30%] h-[30%] border border-primary rounded-xl flex">
          <div className="text-primary w-[40%] flex flex-col items-center justify-center ">
            <h2 className="text-2xl">Todo Done</h2>
            <p>keep it up</p>
          </div>
          <div className="circle w-[50%] flex justify-center items-center">
            <div className="div bg-secondry w-[50%] h-[70%] rounded-full flex justify-center items-center">
              <p className="">
                {countCompleted()}/{tasks.length}
              </p>
            </div>
          </div>
        </div>
        <div className="input-box w-[30%] flex items-center gap-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="write your next task"
            className="bg-gray-900 h-10 rounded-xl w-[90%] pl-7 text-gray-400 "
            ref={inputRef}
          />
          <i
            className="ri-add-circle-fill text-secondry text-4xl "
            onClick={() => {
              addTask(inputRef.current.value);
            }}
          ></i>
        </div>
        <div className="tasks w-[30%] flex flex-col gap-2">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              setTasks={setTasks}
              tasks={tasks}
              addTask={addTask}
              setEditId={setEditId}
              ref={inputRef}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
