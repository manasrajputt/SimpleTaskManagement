import { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
// import "./TaskForm.css";

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;
    addTask({ title, description, dueDate, priority });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");
  };

  return (
    <div className="task-container">
      <h4>Create your Task Here</h4>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Description:</label>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="input-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
