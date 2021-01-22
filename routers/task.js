const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Task = require("../models/Task");

//Add List
router.post(
  "/add_list",
  [auth, [check("listName", "name of list is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      let newList = new Task({
        user: req.user.id,
        listName: req.body.listName,
      });
      const list = await newList.save();
      res.json(list);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to create list");
    }
  }
);
//Remove List
router.delete("/delete_list/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "list not found" });
    }
    await task.remove();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "list not found" });
    }
    res.status(500).send("unable to delete list");
  }
});

//Update List
router.patch("/update_list/:id", auth, async (req, res) => {
  try {
    const list = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { listName: req.body.listName } }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("unable to update task");
  }
});
//Get All List
router.get("/get_lists", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  try {
    const list = await Task.find({ user: req.user.id });
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("unable to get all list");
  }
});

//***************************
//Task
//***************************

//ADD task
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("date", "date is required").not().isEmpty(),
      check("status", "status is required").not().isEmpty(),
      check("listId", "listId is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      let newTask = {
        user: req.user.id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      };

      const task = await Task.updateOne(
        { _id: req.body.listId },
        { $push: { taskList: newTask } }
      );
      res.json(task);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to add task");
    }
  }
);

//delete task -> pass list id + task id.
router.delete("/:id/:task_id", auth, async (req, res) => {
  try {
    const list = await Task.findById(req.params.id);
    const task = list.taskList.find((task) => task._id == req.params.task_id);
    if (!task) {
      return res.status(404).json({ msg: "task does not exist" });
    }
    list.taskList = list.taskList.filter(({ id }) => id !== req.params.task_id);
    await list.save();
    return res.json(list.taskList);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(500).send("unable to delete task");
  }
});

//update task -> pass list id + task id.
router.patch("/:id/:task_id", auth, async (req, res) => {
  try {
    const list = await Task.findById(req.params.id);
    const index = list.taskList.findIndex(
      (task) => task._id == req.params.task_id
    );
    if (index === -1) {
      return res.status(404).json({ msg: "task does not exist" });
    }
    const updateTask = {
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };
    list.taskList = list.taskList.filter(({ id }) => id !== req.params.task_id);
    list.taskList.splice(index, 0, updateTask);
    await list.save();
    return res.json(list.taskList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("unable to update task");
  }
});

module.exports = router;
