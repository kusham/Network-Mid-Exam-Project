const express = require("express");
const dbConnection = require("./Config/DBConnect");
const cors = require("cors");


const chatsRoutes = require("./ChatRoutes");
const messageRoutes = require("./MessageRoutes");

const app = express();
app.use(express.json());
app.use(cors());
dbConnection();

const PORT = process.env.PORT || 5003;

app.use("/chat", chatsRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
