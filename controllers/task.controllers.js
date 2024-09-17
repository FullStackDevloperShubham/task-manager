const taskModel = require('../models/task.model.js')

// create task
const createTask = async (req, res) => {
  try {
    const task = await taskModel.create(req.body)
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error: "There is an error to create a new task" })
  }
}

// get all tasks
const getAllTask = async (req, res) => {
  try {
    const tasks = await taskModel.find()
    console.log('Receiving tasks completed')
    res.status(200).json({ tasks })  // Changed from FindAllTask to tasks
  } catch (error) {
    res.status(500).json({ error: "There is no task in database" })
  }
}

// get task
const getTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id)
    console.log('Getting task by Id is completed')
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" })
  }
}

// delete task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id)
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" })
    }
    console.log('Deletion completed successfully')
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: "Task deletion failed" })
  }
}

// update task
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ error: "Task update failed" })
  }
}

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask
}