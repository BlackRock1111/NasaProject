const {getAllLaunches,
    scheduleNewLaunch,
    existlaunchWithId,
    abortLaunch

} = require('../../models/launches.model');

const{
    pagination
} = require('../../services/query')

// GETTING LAUNCHES
async function httpgetAllLaunches(req,res){
    console.log(req.query);    // getting params from request
    const {skip,limit} = pagination(req.query);
    const launches = await getAllLaunches(skip,limit);
    return res.status(200).json(launches);
}

// ADDING NEW LAUNCH
async function httpAddNewLaunch(req,res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate){
        return res.status(400).json({
            "error":"Launch data missing"
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    await scheduleNewLaunch(launch);
    return res.status(200).json(launch);
}


// DELETING LAUNCH
async function httpDeleteLaunch(req,res){
    const launchId = Number(req.params.id);

    const existLaunch = await existlaunchWithId(launchId);

    if(!existLaunch){
        return res.status(404).json({
            error:"Not found"
        })
    }
    else{
        const abort = await abortLaunch(launchId);
        if(!abort){
            return res.status(400).json({
                error:"launch not aborted"
            });
        }else{
            return res.status(200).json({
                Done:'true'
            })
        }
        return res.status(200).json(abort);

    }
}

module.exports = {
    httpgetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch
}

// Array.from(launches.values())
