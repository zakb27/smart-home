import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
// import {key} from '../../assets/key'
import key from '../assets/key'
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase";


export const createSchedule = async(data) =>{

    try{
        // const days = data.days
        // days.forEach((day)=>{
        //
        // });
        const response = await fetch(key+'/addSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
    catch(e){
        console.error(e)
        // const days = req.body.days;
        // const start = req.body.start.getTime();
        // const end = req.body.end.getTime();
        // const value = req.body.value;
        // const on = req.body.on;
        //
        // for (const day of days){
        //     if(schedule.day)
        // }

    }
}

export const getSchedule = async(id)=>{
    try{
        const response  = await fetch(key+'/getSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        });
        return await response.json();
    }
    catch(e){
        console.error(e)
    }
}

export const fetchRooms = async() =>{
    try{
        // const response = await fetch(key+'/getAllRooms');
        // // console.log(json);
        // const json = await response.json();
        // return json.rooms;
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'rooms')
        const docsSnap = await getDocs(docRef);
        const objects =[]
        docsSnap.forEach((doc) => {
            objects.push({id: doc.id, name: doc.data().name, type: doc.data().type})
        });


        return objects;

    }
    catch(error){
        console.error(error)
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
            fire.push(doc.data().id)
        })


        const response = await fetch(key+'/getPromptDevices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fire)
        });
        return await response.json();
    }

    catch (error) {
        // console.error(error);
        return json([]);
    }
}

export const getRoomDevices = async(roomID) =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await doc(db,'users',email,'rooms',roomID)
        const docsSnap = await getDoc(docRef);
        const fire = docsSnap.data().devices;
        // docsSnap.forEach(doc=>{
        //     fire.push(doc.data().devices)
        // })

        const response = await fetch(key+'/getPromptDevices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fire)
        });
        return await response.json();
    }
    catch (error) {
        // console.error(error);
        return json([]);
    }
}

export const checkSaved = async (id) =>{
    const email = auth.currentUser?.email
    const docRef = await collection(db,'users',email,'saved')

    const docsSnap = await getDocs(docRef);
    let exists=false;
    let key=null
    docsSnap.forEach((doc) => {
        if (doc.data().id===id){
            exists=true
            key=doc.id
        }
    });
    if(exists){
        return({exists:exists,key:key})
    }
    else{
        return({exists:false,key:null});
    }


}

export const performSave = async(id) =>{
    const email = auth.currentUser?.email
    const docRef = await collection(db,'users',email,'saved')

    let item;
    await checkSaved(id).then((data)=>{
        item = data;
    })
    console.log(item);
    if(item.exists){
        await deleteDoc(doc(db,'users',email,'saved',item.key))
    }
    else{
        await addDoc(docRef, {
            id: id
        });

    }

}

export const getSaved = async() =>{
    const email = auth.currentUser?.email

    const docRef = await collection(db,'users',email,'saved')
    const docsSnap = await getDocs(docRef);
    const objects =[]
    docsSnap.forEach((doc) => {
        objects.push(doc.data().id)
    });
    const response = await fetch(key+'/getPromptDevices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objects)
    });
    return await response.json();

}

export const sendInfo = async(info) =>{
    try{
        const temp = info

        const response = await fetch(key+'/updateDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp)
        });
        console.log(temp)

        return await response.text();
    }
    catch (error) {
        // console.error(error);
        return json([]);

    }

}

export const fetchDevices = async() =>{
    try{
        const response = await fetch(key+'/getAllDevices');
        const json = await response.json();
        return json.devices;
        // return (devices.devices);

    }
    catch(error){
        // console.error(error)
        return (devices.devices);
    }
}
