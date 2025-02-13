import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
  tasks: [],
  loading: false,
};

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get("http://localhost:3000/api/task/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "SET_TASKS", payload: response.data.tasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      dispatch({ type: "SET_LOADING", payload: false });
    };
    fetchTasks();
  }, [state.tasks]);

  const addTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/create-task",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "ADD_TASK", payload: response.data.task });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task) => {
    console.log(task)
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${task._id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPDATE_TASK", payload: response.data });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ state, dispatch, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
