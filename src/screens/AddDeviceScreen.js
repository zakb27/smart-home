import {View, Text, Image, ScrollView, TextInput, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {fetchDevices} from "../hooks/Database";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase";



const AddRoomScreen = ({navigation})=>{
    const [value2, setValue2] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    ]);
    const [rooms,changeRooms] = useState([
    ]);

    const addDevice = async() =>{
        const email = auth.currentUser?.email
        const docRef = await collection(db,'users',email,'devices')

        await addDoc(docRef, {
            id: value,
        });
        setValue2(value2+1);
    }


    useEffect(() => {
        const compareDevices = async() =>{
            const email = auth.currentUser?.email
            const docRef = await collection(db,'users',email,'devices')
            const roomRef = await collection(db,'users',email,'rooms')
            const docsSnap = await getDocs(docRef);
            const roomsSnap = await getDocs(roomRef)
            const allDevices = await fetchDevices()
            const hew = []
            const fire = []
            docsSnap.forEach(doc=>{
                fire.push(doc.data())
            })
            allDevices.forEach(device=>{
                const found = fire.find(el => el.id === device.id);
                if (!found) hew.push({ label: device.name,value: device.id});
            })
            setItems(hew);
            const tempRooms = []
            roomsSnap.forEach(doc=>{
                tempRooms.push({label:doc.data().name,value:doc.id})

            })
            changeRooms(tempRooms);
        }
        compareDevices().then();
    }, [navigation,value2]);


    return(
        <SafeAreaView>
            <Text>Add device</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <TouchableOpacity onPress={addDevice}>
                <Text>Add Device</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddRoomScreen;