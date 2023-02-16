import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
// import {key} from '../../assets/key'
import key from '../assets/key'
export const fetchRooms = async() =>{
    try{
        const response = await fetch(key+'beta2/getAllRooms');
        // console.log(json);
        const json = await response.json();
        return json.rooms;
        // return (rooms.rooms);
    }
    catch(error){
        // console.error(error)
        return (rooms.rooms);
    }
}

// export const checkSave = async(info) =>{
//
// }
//
// export const performSave = async(info) =>{
//     try{
//         // const response = await fetch(key+'beta2/getAllRooms');
//         // // console.log(json);
//         // const json = await response.json();
//         // return json.rooms;
//
//         const result = devices.devices.find(item => item.id === info);
//         if (result.saved){
//
//         }
//
//
//         return (rooms.rooms);
//     }
//     catch(error){
//         // console.error(error)
//         return (rooms.rooms);
//     }
// }

export const sendInfo = async(info) =>{
    try{
    const response = await fetch(key+'beta2/sendDeviceInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    });
        return await response.text();
    }
    catch (error) {
        // console.error(error);
        return json([]);

    }

}

export const fetchDevices = async() =>{
    try{
        const response = await fetch(key+'beta2/getAllDevices');
        const json = await response.json();
        console.log(json);
        return json.devices;
        // return (devices.devices);

    }
    catch(error){
        // console.error(error)
        return (devices.devices);
    }
}
