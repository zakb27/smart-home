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
    // it('Input correct type for creation', async() =>{
    //     const response = await testSession
    //         .post('/updateWash')
    //         .send({id:12,temp:30,length:50})
    //         .expect(200);
    //     expect(response.body.message).to.equal('Washing data updated successfully');
    // });
    it('Input schedule that already exists', async() =>{
        const response = await testSession
            .post('/createSchedule')
            .send({starter:"09:02",ender:"10:00",value:68,id:1,days:['Monday']})
            .expect(408);
        expect(response.body.message).to.equal('New schedule overlaps');
    });
});

// describe('/deleteSchedules', () => {
//     let testSession = null;
//     before(async () => {
//         testSession = session(app);
//     });
//     it('Input correct type for deletion', async() =>{
//         const response = await testSession
//             .get('/getHouseTemp')
//         expect(response.body).to.deep.be.within(16, 24);
//     });
// });
