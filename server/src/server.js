const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'./.env'});
const {
  app
} = require("./app")
const {
  loadPlanetsData
} = require("./models/planets.model");
const{loadLaunchData} = require('./models/launches.model');

const port = process.env.PORT || 8000;
console.log(port);

const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

mongoose.connection.on('open', () => {
  console.log("Connected to Mongodb");
})

mongoose.connection.on('err', () => {
  console.error(err);
})

const server = http.createServer(app); // why use this?
async function startServer() {
  await mongoose.connect('mongodb+srv://nasa_api_v1:1MUR4WgmVIBOQkOl@cluster0.yggawis.mongodb.net/?retryWrites=true&w=majority');

  await loadPlanetsData(); // from planets model
  await loadLaunchData(); // from launches model


  server.listen(port, () => {
    console.log('Listening on port ' + port);
  })
}

startServer();
