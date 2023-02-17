import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
// import {key} from '../../assets/key'
import key from '../assets/key'
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase";
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

export const getRegisteredDevices = async() =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'devices')
        const docsSnap = await getDocs(docRef);
        const fire = []
        docsSnap.forEach(doc=>{
            fire.push(doc.data())
        })


        const response = await fetch(key+'beta2/fetchRegistered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fire)
        });
    }

    catch (error) {
        // console.error(error);
        return json([]);
    }
}

export const getRoomDevices = async() =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'rooms')
        const docsSnap = await getDocs(docRef);
        const fire = []
        docsSnap.forEach(doc=>{
            fire.push(doc.data().devices)
        })
        const response = await fetch(key+'beta2/fetchRoomDevices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fire)
        });
        return await response.text();
    }
    catch (error) {
        // console.error(error);
        return json([]);
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
        return json.devices;
        // return (devices.devices);

    }
    catch(error){
        // console.error(error)
        return (devices.devices);
    }
}
