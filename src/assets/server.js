const http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
const rooms = JSON.parse(fs.readFileSync('./rooms.json', 'utf8'));
const devices = JSON.parse(fs.readFileSync('./devices.json', 'utf8'));
let schedule = JSON.parse(fs.readFileSync('./schedule.json', 'utf8'));
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.get('/', function(req, res) {
    console.log('something happen');
});
app.get('/getAllRooms', function(req, res) {
    res.json(rooms);
});

app.post('/getPromptDevices',function(req, res) {
    const items = req.body;
    const newJson = []
    const allDevices = devices.devices;
    allDevices.forEach(device => {
        const found = items.find(el => el === device.id);
        if (found) newJson.push(device);

    });
    res.json(newJson);
});
app.post('/deleteSchedules',function(req,res) {
    const newSchedule = schedule;
    const ids = req.body.ids;
    const days = req.body.days;

    for(const day of days) {
        if (newSchedule.hasOwnProperty(day)) {
            for (const id of ids) {
                if (newSchedule[day].hasOwnProperty(id)) {
                    delete newSchedule[day][id];
                }
            }
        }
    }

    fs.writeFile('./schedule.json', JSON.stringify(newSchedule), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating schedule data');
        } else {
            schedule = newSchedule;
            res.send('Schedule updated successfully');
        }
    });
})



app.post('/getSchedules',function(req,res){
    const id = req.body.id;

    const idList = [];
    const result = {};

    // Loop through each day
    for (const [day, schedules] of Object.entries(schedule)) {
        // Loop through each schedule on the day
        for (const [scheduleName, scheduleData] of Object.entries(schedules)) {
            if (scheduleData.id === id) {
                // Add the day to the list of days for this schedule
                if (!result[scheduleData.startTime]) {
                    result[scheduleData.startTime] = {
                        startTime: scheduleData.startTime,
                        endTime: scheduleData.endTime,
                        value: scheduleData.value,
                        days: [],
                        ids:[]
                    };
                }
                result[scheduleData.startTime].days.push(day);
                result[scheduleData.startTime].ids.push(scheduleName);
            }
        }
    }

    const mergedSchedules = {};
    for (const [startTime, scheduleData] of Object.entries(result)) {
        const key = `${scheduleData.startTime}-${scheduleData.endTime}`;
        if (!mergedSchedules[key]) {
            mergedSchedules[key] = {
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
                value: scheduleData.value,
                days: [],
                ids:scheduleData.ids
            };
        }
        mergedSchedules[key].days = [...new Set([...mergedSchedules[key].days, ...scheduleData.days])];
    }

    // Convert the merged schedules object back to an array
    const mergedSchedulesArray = Object.values(mergedSchedules);

    // Filter out schedules that are not attached to the given ID
    const filteredSchedules = mergedSchedulesArray.filter(schedule => schedule.days.length > 0);

    res.json(filteredSchedules);



})

app.post('/createSchedule',function (req, res) {
    const schedules = schedule;
    const { id, days, starter, ender, value } = req.body;

    const start = starter;
    const end = ender;
    console.log(req.body);
    for (const day of days) {
        const daySchedule = schedules[day] || {};
        for (const existingSchedule of Object.values(daySchedule)) {
            if (((existingSchedule.startTime <= start && existingSchedule.endTime >= start) ||
                    (existingSchedule.startTime <= end && existingSchedule.endTime >= end))
                && (existingSchedule.id==id))
            {
                return res.status(400).send('Schedule overlaps with existing schedule');
            }
        }
    }
    // Generate a unique ID for the new schedule


    for (const day of days) {
        const newScheduleId = uuidv4();
        schedules[day][newScheduleId] ={
            startTime: start,
            endTime: end,
            value: value,
            id:id
        };
    }

    fs.writeFile('./schedule.json', JSON.stringify(schedules), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating schedule data');
        } else {
            schedule = schedules;
            res.send('Schedule updated successfully');
        }
    });

});
app.post('/updateDevice',function(req,res){

    const allDevices=devices;
    const id = req.body.id;
    allDevices.devices.forEach(device=>{
        if(device.id===id){
            device.value=req.body.value;
            device.on=req.body.on;
        }
    });
    console.log('Accepted');

    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating rooms data');
        } else {
            devices.devices = allDevices.devices;
            res.send('Rooms data updated successfully');
        }
    });
});

app.post('/updateDoor',function(req,res){

    const allDevices=devices;
    const hold = devices;
    const id = req.body.id;
    const value = req.body.value
    console.log(id);
    console.log(value)
    allDevices.devices.forEach(device=>{
        if(device.id===id && device.value===value){
            device.on=true;
        }
    });

    fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating rooms data');
        } else {
            devices.devices = allDevices.devices;
        }
    });


    console.log('Door Opened');

    setTimeout(() => {

        allDevices.devices.forEach(device=>{
            if(device.id===id && device.value===value){
                device.on=false;
            }
        });
        // Revert the JSON data to the original data
        fs.writeFile('./devices.json', JSON.stringify(allDevices), function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating rooms data');
            } else {
                devices.devices = allDevices.devices;
                res.send('Rooms data updated successfully');
            }
        });
        console.log("Door closed")
    }, 10000);

});


app.get('/getAllDevices', function(req, res) {
    res.json(devices);
});

const updateDevice = (existingSchedule) =>{
    const allDevices = devices;
    allDevices.devices.forEach(device=>{
        if(device.id===existingSchedule.id){
            device.value=existingSchedule.value;
            device.on=true;
        }
    });
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

const scheduleDevice = () =>{
    const date = new Date();
    const options = { weekday: "long" };
    const day = (new Intl.DateTimeFormat("en-US", options).format(date));

    const start = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const daySchedule = schedule[day] || {};
    for (const existingSchedule of Object.values(daySchedule)) {
        if(existingSchedule.startTime==start){
            updateDevice(existingSchedule)

        }
    }

}

setInterval(scheduleDevice,30000);

app.listen(3000);
console.log('App Server is listening on port 3000');
