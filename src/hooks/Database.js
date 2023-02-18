import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
// import {key} from '../../assets/key'
import key from '../assets/key'
import {collection, getDoc, getDocs,doc,deleteDoc,addDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";

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

export const getRoomDevices = async(key) =>{
    try{
        const email = auth.currentUser?.email

        const docRef = await doc(db,'users',email,'rooms',key)
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
        const thing =  await response.json();

        return thing;
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
    const thing =  await response.json();

    return thing;

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
