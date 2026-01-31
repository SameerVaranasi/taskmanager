const router = require("express").Router();
const auth = require("../middleware/auth");
const task = require("../controllers/taskController");

router.post("/", auth, task.createTask);
router.get("/", auth, task.getTasks);
router.put("/:id", auth, task.updateTask);
router.delete("/:id", auth, task.deleteTask);

module.exports = router;
