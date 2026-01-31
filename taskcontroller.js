const pool = require("../db");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const [result] = await pool.query(
      "INSERT INTO tasks(user_id,title,description,status) VALUES(?,?,?,?)",
      [req.user.id, title, description, status || "Pending"]
    );

    const [task] = await pool.query("SELECT * FROM tasks WHERE id=?", [result.insertId]);
    res.status(201).json(task[0]);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

// GET TASKS + FILTERS
// /api/tasks?status=Pending&search=study
exports.getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;

    let sql = "SELECT * FROM tasks WHERE user_id=?";
    const params = [req.user.id];

    if (status && status !== "All") {
      sql += " AND status=?";
      params.push(status);
    }

    if (search) {
      sql += " AND title LIKE ?";
      params.push(`%${search}%`);
    }

    sql += " ORDER BY created_at DESC";

    const [tasks] = await pool.query(sql, params);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [check] = await pool.query(
      "SELECT id FROM tasks WHERE id=? AND user_id=?",
      [id, req.user.id]
    );

    if (!check.length) return res.status(404).json({ message: "Task not found" });

    await pool.query(
      "UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?",
      [title, description, status, id, req.user.id]
    );

    const [updated] = await pool.query("SELECT * FROM tasks WHERE id=?", [id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [id, req.user.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
