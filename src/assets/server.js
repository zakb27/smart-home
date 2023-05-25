const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
// const devices = JSON.parse(fs.readFileSync('./src/assets/devices.json', 'utf8'));
// let schedule = JSON.parse(fs.readFileSync('./src/assets/schedule.json', 'utf8'));
const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8'));
let schedule = JSON.parse(fs.readFileSync('./schedule.json', 'utf8'));
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

app.use(express.json());
app.get('/', function(req, res) {
    console.log('something happen');
    res.status(200).json({ success: true, message: 'Secret saved successfully' });

});

app.post('/updateWash',function(req, res) {
    try{

        const {id, temp, length} = req.body;
        const allDevices = devices;
        // loops through all devices and if its correct id and is a correct machine then updates it
        allDevices.devices.forEach(device => {
            if (device.id === id && (device.type==='washer' || device.type==='dishwasher')) {
                device.value = temp;
                console.log(device.type)
                device.time = length
            }
        });
        // updates the local db
        fs.writeFile('./devices.json', JSON.stringify(allDevices), function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({message: 'Error updating washing data file'});
            } else {
                devices.devices = allDevices.devices;
                res.status(200).json({message: 'Washing data updated successfully'});
            }
        });
    }
    catch(e){
        res.status(401).json({message: 'Washing data unsuccessful'});
    }
});

app.post('/getPromptDevices',function(req, res) {
    try{
        const items = req.body;
        // If empty input then returns empty output
        if(items==={}){
            res.json([])
        }
        const newJson = []
        const allDevices = devices.devices;
        // checks all devices if it id is correct then adds to array of devices and then returns this array
        allDevices.forEach(device => {
            const found = items.find(el => el === device.id);
            if (found) newJson.push(device);
        });
        console.log(newJson)
        res.status(200).json(newJson);
    }
    catch(e){
        res.status(401).json({});
    }
});


app.get('/getHouseTemp', function(req, res) {
    try{
        const allDevices = devices.devices;
        let avg = 0
        let count =0
        // loops through all temp devices and then counts all of them
        allDevices.forEach(device => {
            if(device.type==='temp'){
                count++
                avg = avg+device.value
            }
        });
        // calculates mean and returns
        const final = avg/count
        res.json(final);
    }
    catch(e){
        res.json(0)
    }

});

app.post('/deleteSchedules',function(req,res) {
    const newSchedule = schedule;
    const ids = req.body.ids;
    const days = req.body.days;
    // loops through all days and schedules in the days and deletes if fits the ID inputted
    for(const day of days) {
        if (newSchedule.hasOwnProperty(day)) {
            for (const id of ids) {
                if (newSchedule[day].hasOwnProperty(id)) {
                    delete newSchedule[day][id];
                }
            }
        }
    }
    // updtes local db
    fs.writeFile('./schedule.json', JSON.stringify(newSchedule), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating schedule data');
        } else {
            schedule = newSchedule;
            return res.status(200).json({message: 'Schedule updated successfully'});
        }
    });
})



app.post('/getSchedules',function(req,res){
    const id = req.body.id;
    const result = {};
    // loops through schedule json and gets day and value
    for (const [day, schedules] of Object.entries(schedule)) {
        //  loop through each schedule and get id of it and data
        for (const [scheduleID, data] of Object.entries(schedules)) {
            if (data.id === id) {
                // if the start time dont exist then it creates new field
                if (!result[data.startTime]) {
                    result[data.startTime] = {
                        startTime: data.startTime,
                        endTime: data.endTime,
                        value: data.value,
                        days: [day],
                        ids:[scheduleID]
                    };
                }
                else{
                    // push instead of overwrriting
                    result[data.startTime].days.push(day);
                    result[data.startTime].ids.push(scheduleID);
                }

            }
        }
    }

    // const mergedSchedules = {};
    // gets rid of key and makes into array
    const thing = []
    for (const [time,data] of Object.entries(result)){
        thing.push(data)
    }
    console.log(thing)

    // for (const [startTime, scheduleData] of Object.entries(result)) {
    //     const key = `${scheduleData.startTime}-${scheduleData.endTime}`;
    //     if (!mergedSchedules[key]) {
    //         mergedSchedules[key] = {
    //             startTime: scheduleData.startTime,
    //             endTime: scheduleData.endTime,
    //             value: scheduleData.value,
    //             days: [],
    //             ids:scheduleData.ids
    //         };
    //     }
    //     mergedSchedules[key].days = [...new Set([...mergedSchedules[key].days, ...scheduleData.days])];
    // }
    //
    // // // Convert the merged schedules object back to an array
    // const merge = Object.values(mergedSchedules);
    // //
    // // // Filter out schedules that are not attached to the given ID
    // const filter = merge.filter(schedule => schedule.days.length > 0);

    res.json(thing);



})

app.post('/createSchedule',function (req, res) {
    const schedules = schedule;
    const { id, days, starter, ender, value } = req.body;
    console.log(req.body)
    const start = starter;
    const end = ender;
    // Loops through all days and then checks if any existing times exists by checking
    // if time is overlapping anything by checking constraints
    for (const day of days) {
        const daySchedule = schedules[day] || {};
        for (const existingSchedule of Object.values(daySchedule)) {
            if (((existingSchedule.startTime <= start && existingSchedule.endTime >= start) ||
                    (existingSchedule.startTime <= end && existingSchedule.endTime >= end))
                && (existingSchedule.id===id)){
                console.log('here')
                return res.status(408).json({message: 'New schedule overlaps'});
            }
        }
    }
    // creates a new schedule with random id in schedules
    for (const day of days) {
        const newId = uuidv4();
        schedules[day][newId] ={
            startTime: start,
            endTime: end,
            value: value,
            originalValue:value,
            id:id
        };
    }
    //updates files
    fs.writeFile('./schedule.json', JSON.stringify(schedules), function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({message: 'Error updating schedule data'});

        } else {
            schedule = schedules;
            return res.status(200).json({message: 'Schedule updated successfully'});
        }
    });

});

app.post('/updateDevice',function(req,res){

    const allDevices=devices;
    const id = req.body.id;
    //loops through and checks if id is same as input and then updates value
    allDevices.devices.forEach(device=>{
        if(device.id===id){
            // colour for light (american spelling for sake of formatting in app)
            if(device.hasOwnProperty("color")){
                device.color=req.body.color
            }
            device.value=req.body.value;
        }
    });
    console.log('Accepted');

    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({message: 'Error updating device data'});
        } else {
            devices.devices = allDevices.devices;
            res.status(200).json({message: 'Device data updated successfully'});
        }
    });
});

app.post('/getMinutes',function(req,res){

    const allDevices=devices;
    const id = req.body.id;
    const current = new Date()
    let newTime=0
    let minutes=0
    //gets all devices and checks if id is same and if its "on"
    allDevices.devices.forEach(device=>{
        if(device.id===id && device.value>0){
            // just gets time left, only applicable to washing machine door and dishwasher
            minutes = (device.time)
            // const seconds = Math.abs(current.getTime() - newTime.getTime())/1000;
            // minutes = seconds/60
        }
    });
    console.log(minutes)
    res.status(200).json(minutes);
});

app.post('/getSeconds',function(req,res){

    const allDevices=devices;
    const id = req.body.id;
    const currentTime = new Date()
    let newTime=0
    let seconds=0
    // loops through all devices and compares ID, gets time left from value in json
    // mostly just used for door device
    allDevices.devices.forEach(device=>{
        if(device.id===id && device.value>0){
            // console.log(device.value);
            // console.log(device.id);
            newTime = new Date(device.startTime)
            seconds = Math.abs(currentTime.getTime() - newTime.getTime())/1000;
        }
    });
    console.log(seconds)
    res.json(seconds)
});

app.post('/updateDoor',async function (req, res) {
    const allDevices = devices;
    const time = new Date();
    const id = req.body.id;
    const pin = req.body.pin
    let keyValid
    // checks for device id and then compares inputted pin, if true then opens door else  returns
    for (const device of allDevices.devices) {
        if (device.id === id) {
            keyValid = await bcrypt.compare(pin, device.key);
            if (!keyValid) {
                return res.status(480).json({message:'Incorrect pin'});
            }
            device.value = 1;
            device.startTime = time
        }
    }

    // updates db to reflect change
    fs.writeFile('./devices.json', JSON.stringify(allDevices), function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating devices data');
        } else {
            devices.devices = allDevices.devices;
        }
    });


    console.log('Door Opened');

    // timeout for ten seconds that after ten seconds it updates the door back o being closed
    setTimeout(() => {

        allDevices.devices.forEach(device => {
            if (device.id === id) {
                device.value = 0;
            }
        });
        // update db
        fs.writeFile('./devices.json', JSON.stringify(allDevices), function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating devices data');
            } else {
                devices.devices = allDevices.devices;

            }
        });
        console.log("Door closed")
    }, 10000);
    return res.send('Doing updated successfully');

});


app.get('/getAllDevices', function(req, res) {
    console.log(devices)
    res.json(devices);
});




app.get('/getMachine', function(req, res) {
    const allDevices=devices;
    let element=''
    // returns first that fits washer or dishwasher criteria and is on
    allDevices.devices.forEach(device=>{
        if((device.type==='washer'||device.type==='dishwasher')&&device.time>0){
            element=(device)
        }
    });
    res.json(element)
});

const updateDevice = (existingSchedule) =>{
    const allDevices = devices;
    // Stores original value into original value and updates device value to parameter
    allDevices.devices.forEach(device=>{
        if(device.id===existingSchedule.id){
            device.originalValue = device.value
            device.value=existingSchedule.value;
        }
    });
    // updates db
    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
            console.log('Error updating device data');
        } else {
            devices.devices = allDevices.devices;
            console.log('Device updated successfully');
        }
    });
}

const revertDevice = (existingSchedule) =>{
    const allDevices = devices;
    // changes device value to original value
    allDevices.devices.forEach(device=>{
        if(device.id===existingSchedule.id){
            device.value = device.originalValue
        }
    });
    // updates db
    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
            console.log('Error updating device data');
        } else {
            devices.devices = allDevices.devices;
            console.log('Device updated successfully');
        }
    });
}

const runMachines = () =>{
    const allDevices=devices;
    // if device in loop is washer or dishwasher and is on then it updates time
    allDevices.devices.forEach(device=>{
        if(device.type==='washer'||device.type==='dishwasher'&&device.time>0){
            device.time=device.time-1;
        }
    });
    // updates db
    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
        } else {
            devices.devices = allDevices.devices;
        }
    });
}
const scheduleDevice = () =>{
    const date = new Date();
    // gets day of week applied to user
    const day = (new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date));
    //formats it
    const start = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    // loops through days on json to find correct start time to run updateDevice
    const daySchedule = schedule[day];
    for (const current of Object.values(daySchedule)) {
        if(current.startTime==start){
            updateDevice(current)
        }
        else if(current.endTime==start){
            revertDevice(current)
        }
    }
    // Sets up washing/dishwasher checks
    runMachines();
}
// runs every minute
setInterval(scheduleDevice,60000);

app.listen(3000);
console.log('App Server is listening on port 3000');
module.exports = app;