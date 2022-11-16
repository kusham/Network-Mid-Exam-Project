const express = require("express");
const dbConnection = require("./Config/DBConnect");
const cors = require("cors");

const postRouts = require("./PostRoutes");

const app = express();
app.use(express.json());
app.use(cors());
dbConnection();

const PORT = process.env.PORT || 5002;

app.use("/posts", postRouts);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
  