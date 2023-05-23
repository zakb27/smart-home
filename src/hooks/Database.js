import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
// import {key} from '../../assets/key'
import key from '../assets/key'
import {addDoc, collection, deleteDoc, doc, getDoc,
    getDocs,setDoc,updateDoc,arrayUnion,arrayRemove,query,where} from "firebase/firestore";
import {auth, db} from "../../firebase";


export const createSchedule = async(data) =>{
    try{
        const response = await fetch(key+'/createSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.text();
    }
    catch(e){
        console.error(e)

    }
}

export const deleteSchedule = async(data) =>{

    try{
        const response = await fetch(key+'/deleteSchedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await response.text();
    }
    catch(e){

    }


}

export const getSchedule = async(id)=>{
    try{
        const test = {id:id}
        const response  = await fetch(key+'/getSchedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(test)
        });
        return await response.json();
    }
    catch(e){
        console.error(e)
    }
}
export const fetchProf = async() =>{
    try{
        const email = auth.currentUser?.email
        const docRef = await collection(db,'users',email,'details')
        const docsSnap = await getDocs(docRef);

        const objects =[]
        docsSnap.forEach((doc) => {
            objects.push({first:doc.data().firstname, last:doc.data().lastname, url: doc.data().url})
        });
        return objects;

    }
    catch(error){
        console.error(error)
    }
}
export const getOtherDevices = async(items) =>{

    try{
        const email = auth.currentUser?.email
        const docRef = await collection(db,'users',email,'devices')
        const docsSnap = await getDocs(docRef);
        const fire = []
        docsSnap.forEach(doc=>{
            if(!items.includes(doc.data().id)) {
                fire.push(doc.data().id)
            }
        })

        const response = await fetch(key+'/getPromptDevices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fire)
        });
        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }
    catch(e){
        // console.error(e);
        return ([]);
    }

}
export const fetchRooms = async() =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'rooms')
        const docsSnap = await getDocs(docRef);
        const objects =[]
        docsSnap.forEach((doc) => {
            objects.push({id: doc.id, name: doc.data().name, type: doc.data().type,devices:doc.data().devices})
        });


        return objects;

    }
    catch(error){
        console.error(error)
        return (rooms.rooms);
    }
}


export const updateFirebaseEmail = async(data)=>{
    try{
        console.log('savedDocs.docs')
        const roomRef = await collection(db,'users',data.oldEmail,'rooms')
        const roomDocs = await getDocs(roomRef);
        const deviceRef = await collection(db,'users',data.oldEmail,'devices')
        const deviceDocs = await getDocs(deviceRef);
        const savedRef = await collection(db,'users',data.oldEmail,'saved')
        const savedDocs = await getDocs(savedRef);
        const detailRef = await collection(db,'users',data.oldEmail,'details')
        const detailDocs = await getDocs(detailRef);
        console.log(data.newEmail)
        for (const item of roomDocs.docs) {
            console.log(item.id)
            const newDocRef = collection(db,'users',data.newEmail,'rooms');
            console.log(newDocRef)
            await addDoc(newDocRef, item.data());
            await deleteDoc(doc(db,'users',data.oldEmail,'rooms',item.id));
        }
        for (const item of deviceDocs.docs) {
            const newDocRef = collection(db,'users',data.newEmail,'devices');

            await addDoc(newDocRef, item.data());
            await deleteDoc(doc(db,'users',data.oldEmail,'devices',item.id));

        }
        for (const item of savedDocs.docs) {
            const newDocRef = collection(db,'users',data.newEmail,'saved');

            await addDoc(newDocRef, item.data());
            await deleteDoc(doc(db,'users',data.oldEmail,'saved',item.id));

        }

        for (const item of detailDocs.docs) {
            const newDocRef = collection(db,'users',data.newEmail,'details');
            await addDoc(newDocRef, item.data());
            await deleteDoc(doc(db,'users',data.oldEmail,'details',item.id));
        }

        return false
    }
    catch (e){
        console.error(e);
        return true
    }
}

export const deletePromptDevice = async(data)=>{

    try{
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'devices')
        const docsSnap = await getDocs(docRef);
        let fire = '';
        let updateRooms = []
        docsSnap.forEach(doc=>{
            if(doc.data().id.toString()===data.toString()){
                fire=doc.id
                updateRooms = doc.data().rooms
            }
        })

        await deleteDoc(doc(db,'users',email,'devices',fire));

        for(let i=0;i<updateRooms.length;i++){
            await updateDoc(doc(db,'users',email,'rooms',updateRooms[i].toString()), {
                devices: arrayRemove(data)
            });


        }
    }
    catch(e){
        console.log(e)
    }

}

export const deleteRoom = async(id) =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await doc(db,'users',email,'rooms',id.toString());
        const docSnap = await getDoc(docRef)
        const devices = docSnap.data().devices

        if(devices>0){
            const queryRef = query(
                collection(db, "users", email, "devices"),
                where("id", "in", devices)
            );
            const querySnap = await getDocs(queryRef);
            querySnap.forEach((doc) => {
                updateDoc(doc.ref, { rooms: arrayRemove(id.toString()) });
            });
        }
        await deleteDoc(docRef)
    }
    catch(e){
        console.error(e);
    }
}


export const updateRoom = async(name,devices,id,removeDevices) =>{
    try{

        if (devices.length>0) {

            const queryRef = query(
                collection(db, "users", email, "devices"),
                where("id", "in", devices)
            );

            const querySnap = await getDocs(queryRef);
            querySnap.forEach((doc) => {
                updateDoc(doc.ref, {rooms: arrayUnion(id.toString())});
            });
        }
        if(removeDevices.length>0){
            const queryRef = query(
                collection(db, "users", email, "devices"),
                where("id", "in", removeDevices)
            );
            const querySnap = await getDocs(queryRef);
            querySnap.forEach((doc) => {
                updateDoc(doc.ref, {rooms: arrayRemove(id.toString())});
            });
        }

        await updateDoc(doc(db,'users',email,'rooms',id), {
            devices: devices,
            name:name,
        });
    }
    catch(e){
        // console.error(e)
    }
}

export const getMachineProgress = async() => {
    try{
        const response = await fetch(key+'/getMachine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
    catch(e){
        console.error(e)
        return(0)
    }
}

export const updateWasher = async(id,temp,length) =>{
    try{
        const response = await fetch(key+'/updateWash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,temp,length})
        });

        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }
    catch(e){
        console.error(e)
        return('Error occurred')
    }
}

export const getPromptDevice = async(id) =>{
    try{
        const item = [id]
        const response = await fetch(key+'/getPromptDevices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }
    catch(e){
        console.error(error);
        return ([]);
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
        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }

    catch (error) {
        // console.error(error);
        return ([]);
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
        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }
    catch (error) {
        // console.error(error);
        return ([]);
    }
}

export const getAvgTemp = async()=>{
    try{
        const response = await fetch(key+'/getHouseTemp', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json()
    }
    catch(e){
        return(0)
    }

}

export const checkPin = async (pin)=>{
    try{
        const email = auth.currentUser?.email
        const docRef = await collection(db,'users',email,'details')

        const docsSnap = await getDocs(docRef);
        let correct = false
        docsSnap.forEach((doc) => {
            if (doc.data().pin.toString()===pin.toString()){
                correct=true
            }
        });


        return correct;
    }
    catch(e){
        console.error(e);
        return false;
    }
}
export const getMachineTime = async(id) =>{
    try{
        const temp = {id}
        const response = await fetch(key+'/getMinutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp)
        });
        return await response.json();
    }
    catch(e){
    }
}
export const getDoorTime = async(id) =>{
    try{
        const temp = {id}
        const response = await fetch(key+'/getSeconds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp)
        });
        return await response.json();
    }
    catch(e){
    }
}

export const updateDoor = async (id,pin)=>{
    try{
        const temp = {id,pin}
        const response = await fetch(key+'/updateDoor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp)
        });
        console.log(response.ok)
        if(response.ok){
            return true
        }
        else{
            return false
        }

    }
    catch(e){
        console.error(e);
        return ('woops');
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
    try{
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
        const thing = await response.json();
        if(response.ok){
            return(thing)
        }
        else{
            return([])
        }
    }
    catch(e){
        console.error(e)
        return([])
    }

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
