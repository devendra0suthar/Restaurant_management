const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_Res = [ 
  {
      "rid":"1",
      "title":"Restaurent1",
      "Address":"res.address1",
      "food_type":"Both",

  },
  {
    "rid":"2",
      "title":"Restaurent2",
      "Address":"res.address2",
      "food_type":"Non-Veg",

  },
  {
    "rid":"3",
      "title":"Restaurent3",
      "Address":"res.address3",
      "food_type":"Veg",
  }
];

const getRes = (req, res, next) => {
  res.json({ users: DUMMY_Res });
};

const NewRes = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { title, address, food_type } = req.body;

  const createdRes = {
    id: uuid(),
    title, 
    address,
    food_type
  };

  DUMMY_Res.push(createdRes);

  res.status(201).json({user: createdRes});
};

const updateRes = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, address } = req.body;
  const placeId = req.params.rid;

  const updatedPlace = { ...DUMMY_Res.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_Res.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.Address = address;

  DUMMY_Res[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deleteRes = (req, res, next) => {
  const ResId = req.params.rid;
  console.log(DUMMY_Res.find((p) => p.rid === ResId));
  if (!DUMMY_Res.find((p) => p.rid === ResId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_Res = DUMMY_Res.filter((p) => p.rid !== ResId);
  res.status(200).json({ message: "Deleted Res Item." });
};
exports.getRes = getRes;
exports.NewRes = NewRes;
exports.updateRes = updateRes;
exports.deleteRes = deleteRes;