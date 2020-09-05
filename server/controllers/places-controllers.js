const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_Menu = [
  {
    uid: "1",
    ID: "Restaurent1",
    Food_Name: "Menu.Food_Name1",
    Price: "$60",
  },
  {
    uid: "2",
    ID: "Restaurent1",
    Food_Name: "Menu.Food_Name2",
    Price: "$60",
  },
  {
    uid: "3",
    ID: "Restaurent2",
    Food_Name: "Menu.Food_Name2",
    Price: "$30",
  },
  {
    uid: "4",
    ID: "Restaurent3",
    Food_Name: "Menu.Food_Name3",
    Price: "$20",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.mid; // { pid: 'p1' }

  const place = DUMMY_Menu.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getMenuByResId = (req, res, next) => {
  const userId = req.params.rid;

  const places = DUMMY_Menu.filter((p) => {
    return p.ID === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  res.json({ places });
};

const createMenu = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Food_Name, Price } = req.body;
  const resId = req.params.rid;
  // const title = req.body.title;
  const createdMenu = {
    id: uuid(),
    Food_Name,
    Price,
    ID: resId,
  };

  DUMMY_Menu.push(createdMenu); //unshift(createdPlace)

  res.status(201).json({ Menu: createdMenu });
};

const updateMenu = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Food_Name, Price } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_Menu.find((p) => p.uid === placeId) };
  const placeIndex = DUMMY_Menu.findIndex((p) => p.uid === placeId);
  updatedPlace.Food_Name = Food_Name;
  updatedPlace.Price = Price;

  DUMMY_Menu[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deleteMenu = (req, res, next) => {
  const placeId = req.params.pid;
  console.log(DUMMY_Menu.find((p) => p.id === placeId));
  console.log(placeId);
  if (!DUMMY_Menu.find((p) => p.uid === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_Menu = DUMMY_Menu.filter((p) => p.uid !== placeId);
  res.status(200).json({ message: "Deleted Menu Item." });
};

exports.getPlaceById = getPlaceById;
exports.getMenuByResId = getMenuByResId;
exports.createMenu = createMenu;
exports.updateMenu = updateMenu;
exports.deleteMenu = deleteMenu;
