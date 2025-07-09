const calendarModel = require('../models/calendarModel');

const getEvents = async (req, res, next) => {
  try {
    const events = await calendarModel.getAllEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const addEvent = async (req, res, next) => {
  try {
    const { title, date, description } = req.body;
    const newEvent = await calendarModel.createEvent(title, date, description);
    res.status(201).json(newEvent);
  } catch (err) {
    next(err);
  }
};

const editEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;
    const updatedEvent = await calendarModel.updateEvent(id, title, date, description);
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

module.exports = { getEvents, addEvent, editEvent };