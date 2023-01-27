const express = require("express");
const { check } = require('express-validator');

const itemsControllers = require("../controllers/items-controllers");

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get("/", itemsControllers.getItems);

router.get("/:sku", itemsControllers.getItemBySku); //retrieve items by Stock-keping Unit (SKU)

router.use(checkAuth);

router.get("/user/:uid", itemsControllers.getItemsByUserId); //retrive items for specific manager (user)

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("quantity").not().isEmpty(),
  ],
  itemsControllers.createItem
);

router.patch(
  "/:sku",
  [check("name").not().isEmpty(), check("description").isLength({ min: 5 }), check("quantity").not().isEmpty()],
  itemsControllers.updateItem
);

router.delete("/:sku", itemsControllers.deleteItem);

module.exports = router;
