const express = require("express");
const cors = require("cors");
require('dotenv').config()

const uploadRouts = require("./uploadRoutes");


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.use("/image", uploadRouts);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
  