const chai = require('chai');
const {expect} = chai;
const app = require('./server');
const request = require('supertest')(app);
const session  = require('supertest-session');
const { describe, it } = require('mocha');

describe('/getpromptdevice', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('With no devices synced', async() =>{
        const response = await testSession
            .post('/getPromptDevices')
            .send([])
            .expect(200);
        expect(response.body).to.deep.equal([]);
    });
    it('With 2 devices synced', async() =>{
        const response = await testSession
            .post('/getPromptDevices')
            .send([2,3])
            .expect(200);
    });
    it('With false input', async() =>{
        const response = await testSession
            .post('/getPromptDevices')
            .send('nothing input')
            .expect(401);
    });
});

describe('/Updatewash', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input correct type of device - washer', async() =>{
        const response = await testSession
            .post('/updateWash')
            .send({id:12,temp:30,length:50})
            .expect(200);
        expect(response.body.message).to.equal('Washing data updated successfully');
    });
    it('Input correct type of device - dishwasher', async() =>{
        const response = await testSession
            .post('/updateWash')
            .send({id:13,temp:30,length:50})
            .expect(200);
        expect(response.body.message).to.equal('Washing data updated successfully');
    });
    it('Input incorrect type of device - other', async() =>{
        const response = await testSession
            .post('/updateWash')
            .send({id:14,temp:30,length:50})
            .expect(200);
        expect(response.body.message).to.equal('Washing data updated successfully');

    });
});

describe('/getHouseTemp', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Get correct temperature of house', async() =>{
        const response = await testSession
            .get('/getHouseTemp')
        expect(response.body).to.deep.be.within(16, 24);
    });
});

describe('/createSchedules', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input schedule that already exists', async() =>{
        const response = await testSession
            .post('/createSchedule')
            .send({starter:"09:02",ender:"10:00",value:68,id:1,days:['Monday']})
            .expect(408);
        expect(response.body.message).to.equal('New schedule overlaps');
    });
    it('Input schedule that already exists number2', async() =>{
        const response = await testSession
            .post('/createSchedule')
            .send({starter:"09:02",ender:"10:02",value:68,id:1,days:['Monday']})
            .expect(408);
        expect(response.body.message).to.equal('New schedule overlaps');
    });
    it('Input schedule that already exists number2', async() =>{
        const response = await testSession
            .post('/createSchedule')
            .send({starter:"09:02",ender:"09:30",value:68,id:1,days:['Monday']})
            .expect(408);
        expect(response.body.message).to.equal('New schedule overlaps');
    });
    it('Input schedule with valid ID', async() =>{
        const response = await testSession
            .post('/createSchedule')
            .send({starter:"11:02",ender:"11:30",value:68,id:1,days:['Monday']})
            .expect(200);
        expect(response.body.message).to.equal('Schedule updated successfully');
    });
});


describe('/deleteSchedules', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input schedule that already exists', async() =>{
        const response = await testSession
            .post('/deleteSchedules')
            .send({ids:["schedule1"],days:['Monday']})
            .expect(200);
        expect(response.body.message).to.equal('Schedule updated successfully');
    });

});

// Check code

// describe('/getSchedules', () => {
//     let testSession = null;
//     before(async () => {
//         testSession = session(app);
//     });
//     it('Input schedule that already exists', async() =>{
//         const response = await testSession
//             .post('/createSchedule')
//             .send({id:1})
//             .expect(408);
//         expect(response.body.message).to.equal('New schedule overlaps');
//     });
// });

describe('/getMinutes', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input valid ID', async() =>{
        const response = await testSession
            .post('/getMinutes')
            .send({id:12})
            .expect(200);
    });
});

describe('/getSeconds', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input valid ID', async() =>{
        const response = await testSession
            .post('/getMinutes')
            .send({id:10})
            .expect(200);
    });
});

describe('/updateDoor', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Input incorrect door code', async() =>{
        const response = await testSession
            .post('/updateDoor')
            .send({id:10,pin:'1111'})
            .expect(480);
        expect(response.body.message).to.equal('Incorrect pin');
    });

});

describe('/updateDevice', () => {
    let testSession = null;
    before(async () => {
        testSession = session(app);
    });
    it('Update light off', async() =>{
        const response = await testSession
            .post('/updateDevice')
            .send({id:1,color:'#9ff438', value:0})
            .expect(200);
        expect(response.body.message).to.equal('Device data updated successfully');
    });
    it('Update light on', async() =>{
        const response = await testSession
            .post('/updateDevice')
            .send({id:1,color:'#9ff438',value:100})
            .expect(200);
        expect(response.body.message).to.equal('Device data updated successfully');
    });
    it('Update temperature', async() =>{
        const response = await testSession
            .post('/updateDevice')
            .send({id:3,value:18})
            .expect(200);
        expect(response.body.message).to.equal('Device data updated successfully');
    });


});