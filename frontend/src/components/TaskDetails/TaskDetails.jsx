import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./Taskdetails.css";

const TaskDetails = () => {
  const { state, dispatch, deleteTask, updateTask } = useContext(TaskContext);
  const { id } = useParams();
  const task = state.tasks.find((t) => t._id === id);
  const navigate = useNavigate();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [priority, setPriority] = useState(task?.priority || "low");
  const [status, setStatus] = useState(task?.status || "low");

  if (!task) {
    return <p>Task not found</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({ _id: id, title, description, dueDate, priority, status });
    navigate("/");
  };

  return (
    <div className="task-container">
      <h4>Task Details</h4>
      <div>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="input-group">
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label>DueDate: </label>
            <input
              type="date"
              value={dueDate ? moment.utc(dueDate).format("YYYY-MM-DD") : ""}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Priority: </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="input-group">
            <label>Status: </label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Update Task</button>
          <button onClick={() => dispatch(deleteTask(task._id))}>
            Delete Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
