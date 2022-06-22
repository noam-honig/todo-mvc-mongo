import './App.css';
import { useEffect, useState } from "react";
import { Task } from "../shared/Task";
import { remult } from './common';
import { ErrorInfo } from 'remult';
import { TasksController } from '../shared/TasksController';
const taskRepo = remult.repo(Task);
function fetchTasks(hideCompleted: boolean) {
  return taskRepo.find({
    where: {
      completed: hideCompleted ? false : undefined
    }
  });
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task & { error?: ErrorInfo<Task> }>();
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks(hideCompleted).then(setTasks);
  }, [hideCompleted]);

  const createNewTask = async () => {
    if (newTaskTitle) {
      const newTask = await taskRepo.insert({
        title: newTaskTitle,
        completed: false,
        id: tasks.length.toString()
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  }

  const setAll = async (completed: boolean) => {
    await TasksController.setAll(completed);
    fetchTasks(hideCompleted).then(setTasks);
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onBlur={createNewTask}
            onKeyDown={e => { if (e.key === 'Enter') createNewTask() }} />
        </header>

        <section className="main">
          <input id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={tasks.length > 0 && tasks[0].completed}
            onChange={e => setAll(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {tasks.filter(task => !hideCompleted || !task.completed)
              .map(task => {
                if (!editingTask || task.id != editingTask.id) {

                  const setCompleted = async (completed: boolean) => {
                    const updatedTask = await taskRepo.save({ ...task, completed });
                    setTasks(tasks.map(t => t === task ? updatedTask : t));
                  }
                  const deleteTask = async () => {
                    await taskRepo.delete(task);
                    setTasks(tasks.filter(t => t !== task));
                  };
                  return <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <div className="view">
                      <input className="toggle" type="checkbox"
                        checked={task.completed}
                        onChange={e => setCompleted(e.target.checked)}
                      />
                      <label onDoubleClick={() => setEditingTask(task)}>{task.title}</label>
                      {taskRepo.metadata.apiDeleteAllowed&& <button className="destroy" onClick={deleteTask}></button>}
                    </div>
                  </li>
                }
                else {

                  const saveTask = async () => {
                    try {
                      const savedTask = await taskRepo.save(editingTask);
                      setTasks(tasks.map(t => t === task ? savedTask : t));
                      setEditingTask(undefined);
                    } catch (error: any) {
                      setEditingTask({ ...editingTask, error });
                    }
                  };
                  const titleChange = (title: string) => {
                    setEditingTask({ ...editingTask, title });
                  };
                  return <li key={task.id} className="editing">
                    <input className="edit"
                      value={editingTask.title}
                      onBlur={saveTask}
                      onChange={e => titleChange(e.target.value)} />
                    <span>{editingTask.error?.modelState?.title}</span>
                  </li>
                }

              })}
          </ul>
        </section>
        <footer className="footer">
          <button onClick={() => setHideCompleted(false)} >All </button>
          <button onClick={() => setHideCompleted(true)}>Active</button>
        </footer>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Based on <a href="http://todomvc.com">TodoMVC</a></p>
        <p>
          <a href="https://www.github.com/remult/remult" target="_blank">
            Give remult a ⭐ on github</a>
        </p>
      </footer>
    </>
  );
}
export default App;