const gamesModel = require('../models/gamesModel');

const getGames = async (req, res, next) => {
  try {
    const games = await gamesModel.getAllGames();
    res.json(games);
  } catch (err) {
    next(err);
  }
};

const addGame = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newGame = await gamesModel.createGame(name, description);
    res.status(201).json(newGame);
  } catch (err) {
    next(err);
  }
};

const editGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedGame = await gamesModel.updateGame(id, name, description);
    res.json(updatedGame);
  } catch (err) {
    next(err);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedGame = await gamesModel.deleteGame(id);
    res.json({"deleted Game ID":id});
  } catch (err) {
    next(err);
  }
};

module.exports = { getGames, addGame, editGame, deleteGame };