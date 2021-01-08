const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Task = require("../models/Task");

//ADD task
router.post(
  "/add",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("date", "date is required").not().isEmpty(),
      check("status", "status is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const { date, title, description, status } = req.body;

      let newTask = new Task({
        user: req.user.id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });

      const task = await newTask.save();
      res.json(task);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to add task");
    }
  }
);

//delete task ps: id needed.
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    await task.remove();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(500).send("unable to delete task");
  }
});

//get all tasks
router.get("/", async (req, res) => {
  try {
    const task = await Task.find().sort({ date: -1 });
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("unable to get task");
  }
});

//update ps id needed
router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById();
    const upTask = await Task.updateOne(
      { _id: req.params.id },
      {
        $set: {
          user: req.user.id,
          date: req.body.date,
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
        },
      }
    );
    res.json(upTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("unable to update task");
  }
});

module.exports = router;
