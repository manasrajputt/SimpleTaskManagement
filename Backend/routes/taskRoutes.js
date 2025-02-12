import { Router } from "express";
import {
  createTask,
  getTaskDetails,
  getTasks,
  updateStatus,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import { verifyJWT } from "../middlewares/auth.js";
const router = Router();

router.route("/").get(verifyJWT, getTasks);
router.route("/create-task").post(verifyJWT, createTask);
router.route("/:id").get(verifyJWT, getTaskDetails);
router.route("/:id").put(verifyJWT, updateTask);
router.route("/:id").delete(verifyJWT, deleteTask);
router.route("/:id/status").put(verifyJWT, updateStatus);

export default router;
