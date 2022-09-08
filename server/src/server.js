const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const {
  app
} = require("./app")
const {
  loadPlanetsData
} = require("./models/planets.model");
const{loadLaunchData} = require('./models/launches.model');

const port = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.on('open', () => {
  console.log("Connected to Mongodb");
})

mongoose.connection.on('err', () => {
  console.error(err);
})

const server = http.createServer(app); // why use this?
async function startServer() {
  await mongoose.connect(MONGO_URL)

  await loadPlanetsData(); // from planets model
  await loadLaunchData(); // from launches model


  server.listen(port, () => {
    console.log('Listening on port ' + port);
  })
}

startServer();
