const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Item = require("../models/item");
const User = require("../models/user");

const getItems = async (req, res, next) => {
  let inventory;
  try {
    inventory = await Item.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not retrieve items.",
      500
    );
    return next(error);
  }

  if (!inventory) {
    const error = new HttpError(
      "Something went wrong. Could not retrieve items.",
      500
    );
    return next(error);
  }

  res.json({
    items: inventory.map((item) => item.toObject({ getters: true })),
  });
};

const getItemBySku = async (req, res, next) => {
  const itemId = req.params.sku;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not locate item.",
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError(
      "Could not find item with the provided ID.",
      404
    );
    return next(error);
  }

  res.json({ item: item.toObject({ getters: true }) });
};

const getItemsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let itemManager;
  try {
    itemManager = await User.findById(userId).populate("items");
  } catch (err) {
    const error = new HttpError(
      "Could not find item. Please try again later.",
      500
    );
    return next(error);
  }

  if (!itemManager || itemManager.items.length === 0) {
    return next(
      new HttpError("Could not find any items for the provided manager.", 404)
    );
  }

  res.json({
    items: itemManager.items.map((item) => item.toObject({ getters: true })),
  });
};

const createItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Could not create item. Please check your inputs and try again.",
        422
      )
    );
  }

  const { name, description, quantity } = req.body;

  const createdItem = new Item({
    name,
    description,
    quantity,
    user: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Could not create item. Please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdItem.save({ session: sess });
    user.items.push(createdItem);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Create item failed. Please try again.", 500);
    return next(error);
  }

  res.status(201).json({ item: createdItem });
};

const updateItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs. Please check your data.", 422));
  }

  const { name, description, quantity } = req.body;
  const itemId = req.params.sku;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  if (item.user.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this item.", 401);
    return next(error);
  }

  item.name = name;
  item.description = description;

  try {
    await item.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not update item.",
      500
    );
    return next(error);
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

const deleteItem = async (req, res, next) => {
  const itemId = req.params.sku;

  let item;
  try {
    item = await Item.findById(itemId).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not delete item.",
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError("Could not find item for this ID.", 404);
    return next(error);
  }

  if (item.user.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this item.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await item.remove({ session: sess });
    item.user.items.pull(item);
    await item.user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Item deleted." });
};

exports.getItemBySku = getItemBySku;
exports.getItems = getItems;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
