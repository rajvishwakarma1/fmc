const express = require('express');
const shipController = require('../controllers/shipController');

const router = express.Router();

// GET /ships - Get all ships
router.get('/', shipController.getAllShips);

const { authenticateToken } = require('../middleware/auth');

const { createShipValidation, updateShipValidation } = require('../middleware/validation');

// POST /ships - Create a new ship (protected, validated)
router.post('/', authenticateToken, createShipValidation, shipController.createShip);

// GET /ships/:id - Get a ship by ID
router.get('/:id', shipController.getShipById);

// PUT /ships/:id - Update a ship by ID (protected, validated)
router.put('/:id', authenticateToken, updateShipValidation, shipController.updateShip);

// DELETE /ships/:id - Delete a ship by ID (protected)
router.delete('/:id', authenticateToken, shipController.deleteShip);

module.exports = router;
