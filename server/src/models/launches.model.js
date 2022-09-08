const launchesModel = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios'); // making http request
// const launches = new Map();

let DEFAULT_FLIGHT_NO = 100;

// hardcode launch laod on server startup
const launch = {
  flightNumber: 100, //flight_number
  launchDate: new Date('1 july,2030'), // date_local
  mission: "explore", //name
  target: 'Kepler-442 b', //not applicable
  rocket: "Falcon1", //rocket.name
  customer: ['Junaid'], //payload.customers
  upcoming: true, // same
  success: true // same
}

saveLaunch(launch);

async function populateSpacexLaunch() {
  console.log('Downloading Launch Data');
  const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

  // const response = await axios.get(SPACEX_API_URL);
  // console.log(response);
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [{
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });
  const launchDocs = response.data.docs; //fetch array
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => { // getting customers
      return payload['customers'];
    })
    console.log(customers);


    const launch = {
      flightNumber: launchDoc['flight_number'],
      launchDate: launchDoc['date_local'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers: customers
    }
    console.log(`${launch.flightNumber} ${launch.mission} ${launch.launchDate}`)
    saveLaunch(launch);
  }
};


async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat'
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");

  } else {
    populateSpacexLaunch();
  }
};

async function findLaunch(filter) {
  return await launchesModel.findOne(filter)
};

// launches.set(launch.flightNumber,launch);

// FUNCTIONS BEING USED IN LAUNCHES CONTROLLER
async function existlaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel.findOne().sort('-flightNumber')
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NO
  }
  return latestLaunch.flightNumber
}

async function getAllLaunches(skip,limit) {
  return await launchesModel
  .find({})
  .sort({flightNumber:1})
  .skip(skip)
  .limit(limit)
}

//saving launch in db
async function saveLaunch(launch) {
  await launchesModel.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true // updates when no same data already exists
  });
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target
  });

  if (!planet) {
    throw new Error('No matching planet was found')
  };
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Junaid', 'Nasa'],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch)
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(latestFlightNumber,
//     Object.assign(launch, { // assign values to an object launch
//       customer: ['Junaid', 'Nasa'],
//       upcoming: true,
//       success: true,
//       flightNumber: latestFlightNumber,
//     }));
//   console.log(launches);
// }

async function abortLaunch(launchId) {
  return await launchesModel.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  })
  // console.log(launches); // launches is a collection of map objects where latestFlightNumber is assigned to each new launch
  // const abort = launches.get(launchId)
  // console.log(launches.get(launchId));
  // abort.upcoming = false;
  // abort.success = false;
  // return abort;

}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  existlaunchWithId,
  scheduleNewLaunch,
  abortLaunch

}
