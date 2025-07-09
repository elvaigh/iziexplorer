const tasksModel = require('../models/tasksModel');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await tasksModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasksModel.getTask(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion  } = req.body;
    const newTask = await tasksModel.createTask(name, description, tags, score, responseType, JSON.stringify(responseOptions), icon_url, hint, ccorrect, cincorrect, maxtime,imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion);
    const lastID = await tasksModel.getLastTaskId();
    console.log(lastID);
    res.status(201).json({ 
      success: true,
      taskId: lastID,
      message: 'Task created successfully'
    });

  } catch (err) {
    next(err);
  }
};

const editTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion  } = req.body;
    const updatedTask = await tasksModel.updateTask(id, name, description, tags, score, responseType, JSON.stringify(responseOptions), icon_url, hint, ccorrect, cincorrect, maxtime , imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskid = await tasksModel.deleteTask(id);
    res.json(taskid);
  } catch (err) {
    next(err);
  }
};


const getLastTaskId = async () => {
  try {
    const taskid = await tasksModel.getLastTaskId();
    res.json(taskid);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getTask, addTask, editTask, deleteTask, getLastTaskId };