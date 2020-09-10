const exppress = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const posts = require("./routes/api/posts");

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Home");
  res.send("Hello World");
});

app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
