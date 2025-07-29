import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
    //we will surely get the user because newTask will only be created(called) only if the user is logged and to do so we have are checking authentication before creating new tasking in routes file
  });

  res.status(200).json({
    success: true,
    message: "Task added successfully",
  });
};

// get the list of tasks for the logged in user
export const getMyTasks = async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });
  res.status(200).json({
    succes: true,
    tasks,
  });
};

// Task is Done
export const updateTask = async (req, res) => {
  const { isCompleted } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { isCompleted },
    { new: true }
  );
  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not Found",
    });
  }
  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task Not Found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Deletion Successfull",
  });
};
