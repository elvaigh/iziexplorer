const teamModel = require('../models/teamModel');

const getTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await teamModel.getAllTeamMembers();
    res.json(teamMembers);
  } catch (err) {
    next(err);
  }
};

const addTeamMember = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    const newMember = await teamModel.createTeamMember(name, role);
    res.status(201).json(newMember);
  } catch (err) {
    next(err);
  }
};

const editTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const updatedMember = await teamModel.updateTeamMember(id, name, role);
    res.json(updatedMember);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTeamMembers, addTeamMember, editTeamMember };