import express from "express";
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/getMyTasks", isAuthenticated, getMyTasks);

router.put("/update/:id", isAuthenticated, updateTask);

router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;
