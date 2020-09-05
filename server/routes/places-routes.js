const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:mid', placesControllers.getPlaceById);

router.get('/res/:rid', placesControllers.getMenuByResId);

router.post(
  '/res/:rid/add_menu',
  [
    check('Food_Name')
      .not()
      .isEmpty(),
    check('Price')
      .not()
      .isEmpty()
  ],
  placesControllers.createMenu
);

router.patch(
  '/:pid',
  [
    check('Food_Name')
      .not()
      .isEmpty(),
    check('Price')
  ],
  placesControllers.updateMenu
);

router.delete('/:pid', placesControllers.deleteMenu);

module.exports = router;
