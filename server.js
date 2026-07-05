const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "ConvertSphere API",
    status: "Online",
    message: "Welcome to ConvertSphere Backend!",
    version: "1.0.0"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ConvertSphere API running on port ${PORT}`);
});