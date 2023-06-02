const router = require("express").Router();
const toDo = require("../models/ToDoModel");

// create item
router.post("/additem", async (req, res) => {
  const newItem = new toDo(req.body);
  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all items
router.get("/getAllItems", async (req, res) => {
  try {
    const items = await toDo.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete item
router.delete("/deleteItem/:id", async (req, res) => {
  try {
    await toDo.findByIdAndDelete(req.params.id);
    res.status(200).json("Item was removed!");
  } catch (error) {
    es.status(500).json(error);
  }
});

// update item
router.put("/updateItem/:id", async (req, res) => {
  try {
    const updateItem = await toDo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
