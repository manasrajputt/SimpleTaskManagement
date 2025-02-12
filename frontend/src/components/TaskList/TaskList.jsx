import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import HighPriority from "../HighPriority/HighPriority";
import LowPriority from "../LowPriority/LowPriority";
import "./TaskList.css";

const TaskList = () => {
  const { state, dispatch, deleteTask } = useContext(TaskContext);

  return (
    <div className="task-list">
      <h4 className="list-heading">TaskList</h4>
      <div className="list">
        <HighPriority />
        <hr />
        <LowPriority />
      </div>
    </div>
  );
};

export default TaskList;
