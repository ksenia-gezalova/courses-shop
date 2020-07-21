const { body } = require('express-validator');
const User = require('../models/user.js')

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Enter correct email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("User with this email already exists")
        }
      } catch (e) {
        console.log(e)
      }
    })
  .normalizeEmail(),
  body('password', 'Password length should be minimum 6 symbols')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    })
  .trim(),
  body('name')
    .isLength({ min: 2 })
    .withMessage('Name should contain at least 2 symbols')
    .trim()
]


exports.courseValidators = [
  body('title').isLength({ min: 3 }).withMessage('Title should be minimum 3 symbols').trim(),
  body('price').isNumeric().withMessage('Enter correct price'),
  body('img', 'Enter correct URL').isURL()
]