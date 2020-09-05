const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getRes);

router.post(
  '/add-res',
  [
    check('title')
      .not()
      .isEmpty(),
    check('address').not()
    .isEmpty(),
    check('Food-type').not()
    .isEmpty()
  ],
  usersController.NewRes
);
router.patch(
  '/:rid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('address')
  ],
  usersController.updateRes
);
router.delete('/:rid', usersController.deleteRes);


module.exports = router;
