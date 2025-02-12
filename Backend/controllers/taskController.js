import { Task } from "../models/task.js";

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id,
    });

    return res.status(201).json({ task, message: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const getTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res
      .status(200)
      .json({ tasks, message: "Tasks fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const getTaskDetails = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return req.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task, message: "Task fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        dueDate,
        priority,
        status,
      },
      {
        new: true,
      }
    );
    if (!task) {
      return req.status(404).json({ message: "Task not found" });
    }

    return res.status(201).json({ task, message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return req.status(404).json({ message: "Task not found" });
    }

    return res.status(201).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );
    if (!task) {
      return req.status(404).json({ message: "Task not found" });
    }

    return res
      .status(201)
      .json({ task, message: "Task status updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error || "Server error" });
  }
};

export {
  createTask,
  getTaskDetails,
  getTasks,
  updateStatus,
  deleteTask,
  updateTask,
};
