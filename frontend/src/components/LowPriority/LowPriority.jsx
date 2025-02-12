import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { Link } from "react-router-dom";
import "./LowPriority.css";

const LowPriority = () => {
  const { state, dispatch, deleteTask } = useContext(TaskContext);
  const LowPriority = state.tasks.filter((task) => task.priority === "low");

  return (
    <div className="list-div">
      <h4>Low Priority</h4>
      {LowPriority.loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : LowPriority.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks available</p>
      ) : (
        <div className="scrollable-list">
          <ul className="list-item">
            {LowPriority.map((task) => (
              <li key={task._id} className="item">
                <div className="title-div">
                  <Link to={`/task-details/${task._id}`} className="title">
                    {task.title}
                  </Link>
                  {task.status}
                </div>
                <div className="date-div">
                  <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className={`priority-${task.priority}`}>{task.priority}</p>
                </div>
                <div className="btn">
                  <button onClick={() => dispatch(deleteTask(task._id))}>
                    Delete
                  </button>
                  {/* <button className={`status-${task.status}`}>
                  {task.status}
                </button> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LowPriority;
