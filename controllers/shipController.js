const { validationResult } = require('express-validator');
const Ship = require('../models/Ship');

// Get all ships
exports.getAllShips = async (req, res, next) => {
  try {
    const ships = await Ship.find();
    res.status(200).json(ships.map(s => s.toJSON()));
  } catch (err) {
    next(err);
  }
};

// Get ship by ID
exports.getShipById = async (req, res, next) => {
  try {
    const ship = await Ship.findById(req.params.id);
    if (!ship) {
      const err = new Error('Ship not found');
      err.status = 404;
      return next(err);
    }
    res.status(200).json(ship.toJSON());
  } catch (err) {
    if (err.name === 'CastError') err.status = 400;
    next(err);
  }
};

exports.createShip = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors.array().map(e => ({ field: e.path, message: e.msg }));
      return next(err);
    }

    const { name, description, dateTime } = req.body;
    const ship = new Ship({ name, description, ...(dateTime !== undefined ? { dateTime } : {}) });
    await ship.save();
    return res.status(201).json(ship.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') err.status = 400;
    return next(err);
  }
};

exports.updateShip = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors.array().map(e => ({ field: e.path, message: e.msg }));
      return next(err);
    }

    const payload = {};
    if (req.body.name !== undefined) payload.name = req.body.name;
    if (req.body.dateTime !== undefined) payload.dateTime = req.body.dateTime;
    if (req.body.description !== undefined) payload.description = req.body.description;

    if (Object.keys(payload).length === 0) {
      const err = new Error('No updatable fields provided');
      err.status = 400;
      return next(err);
    }
    const ship = await Ship.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true, runValidators: true });
    if (!ship) {
      const err = new Error('Ship not found');
      err.status = 404;
      return next(err);
    }
    return res.status(200).json(ship.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') err.status = 400;
    return next(err);
  }
};

exports.deleteShip = async (req, res, next) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id);
    if (!ship) {
      const err = new Error('Ship not found');
      err.status = 404;
      return next(err);
    }
    res.status(200).json({ message: 'Ship deleted successfully', id: req.params.id });
  } catch (err) {
    if (err.name === 'CastError') err.status = 400;
    next(err);
  }
};
