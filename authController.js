const pool = require("../db");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await pool.query("SELECT id FROM users WHERE email=?", [email]);
    if (existing.length) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hashed]
    );

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (!users.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user.id });

    res.json({
      message: "Login success",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
