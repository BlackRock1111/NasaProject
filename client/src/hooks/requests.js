const API_URL = "http://localhost:8000/v1"
async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();

}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launch`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => { //returns launches in ascending
    return a.flightNumber - b.flightNumber;
  })
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {

    await fetch(`${API_URL}/launch`, {
      method: "POST",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json"
      },
    });
  //  catch (err) {
  //   return {
  //     ok: false
  //   }
  //   console.log(JSON.stringify(launch));
  // }

  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  fetch(`${API_URL}/launch/${id}`,{
    method:"DELETE"
  });
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
