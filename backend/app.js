const express = require("express");
const app = express();
const mongoose = require("mongoose");
 const cors = require("cors");
//  const bodyParser = require("body-parser");

require("dotenv/config");
const api = process.env.API_URL;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const salesRoutes = require("./routes/monthly-sales");
const dialogflowRoutes = require("./routes/dialogflow");
const chatRoutes = require("./routes/chat");
const intentRoutes = require("./routes/intent");

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/sales`, salesRoutes);
app.use(`${api}/dialog`, dialogflowRoutes);
app.use(`${api}/chat`, chatRoutes);
app.use(`${api}/intent`, intentRoutes);


// add mongoose connection before starting the server
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "products-db",
  })
  .then(() => {
    console.log("Connection succesfully");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});
