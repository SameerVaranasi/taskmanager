const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("✅ Task Manager REST API (MySQL)"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

module.exports = app;
