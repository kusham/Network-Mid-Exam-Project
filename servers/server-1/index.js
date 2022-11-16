const express = require("express");
const dbConnection = require("./Config/DBConnect");
const cors = require("cors");

const authRouts = require("./AuthRoutes");

const app = express();
app.use(express.json());
app.use(cors());
dbConnection();

const PORT = process.env.PORT || 5000;

app.use("/auth", authRouts);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
  