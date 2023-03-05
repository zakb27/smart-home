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
app.post('/createSchedule',function (req, res) {
    const schedules = schedule;
    const { id, days, starter, ender, value } = req.body;

    const startTime = new Date(`1970-01-01T${starter}:00`);
    const endTime = new Date(`1970-01-01T${ender}:00`);
    const start = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
    const end = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

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
    const newScheduleId = uuidv4();

    // Create the new schedule object
    const newSchedule = {
        startTime: start,
        endTime: end,
        value: value,
        id:id
    };

    for (const day of days) {
        schedules[day][newScheduleId] = newSchedule;
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

    console.log(date.getMinutes());

    const start = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const daySchedule = schedule[day] || {};
    for (const existingSchedule of Object.values(daySchedule)) {
        if(existingSchedule.startTime==start){
            updateDevice(existingSchedule)

        }
    }

}

setInterval(scheduleDevice,3000);

app.listen(3000);
console.log('App Server is listening on port 3000');