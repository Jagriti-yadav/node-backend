const express = require("express");

const logger = require("./middleware/logger");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(logger);

// Public route: anyone can access it
app.get("/", (req, res) => {
res.send("Welcome to my website!");
});

// Public route: anyone can access it
app.get("/about", (req, res) => {
res.send("About Page");
});

// Protected route: requires the correct token
app.get("/dashboard", authMiddleware, (req, res) => {
res.send("Welcome to your Dashboard!");
});

app.listen(3000, () => {
console.log("Server running on port 3000");
});
