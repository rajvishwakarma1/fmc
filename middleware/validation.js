const { body } = require('express-validator');

const dateTimeRule = body('dateTime')
  .optional({ nullable: true, checkFalsy: true })
  .isISO8601().withMessage('dateTime must be a valid ISO 8601 date')
  .toDate();

exports.createShipValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be a string'),
  body('description').optional().isString().trim(),
  dateTimeRule,
];

exports.updateShipValidation = [
  body('name').optional().isString().trim().notEmpty().withMessage('name cannot be empty'),
  body('description').optional().isString().trim(),
  dateTimeRule,
];
