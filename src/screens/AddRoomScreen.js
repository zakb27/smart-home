import RoomScreen from "./RoomScreen";
import AllDeviceScreen from "./AllDeviceScreen";
import React,{useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {auth, db} from "../../firebase";
import {collection, doc, setDoc,addDoc,getDocs} from "firebase/firestore";
import { Snackbar } from "@react-native-material/core";
const AddRoomScreen = ({navigation})=>{
    const [roomName,setName] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Living Room', value: 'living_room'},
        {label: 'Kitchen', value: 'kitchen'},
        {label: 'Bedroom', value: 'bedroom'},
        {label: 'Bathroom', value: 'bathroom'},
        {label: 'Entry room', value: 'entry'},
        {label: 'Garden', value: 'garden'},
        {label: 'Garage', value: 'garage'},
        {label: 'Other', value: 'other'},

    ]);
    const [snackVisible,changeSnack] = useState(false)


    const addRoom = async() =>{
        const email = auth.currentUser?.email

        const docRef = await collection(db,'users',email,'rooms')

        const docsSnap = await getDocs(docRef);

        docsSnap.forEach(doc =>{
            if (doc.data().name.toLowerCase() ===roomName.toLowerCase()){
                changeSnack(true)
                return '';
            }
        })
        await addDoc(docRef, {
            name: roomName,
            type: value
        });
        console.log("Created Room")
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>Add Room</Text>
            <TextInput
                placeholder="Name" onChangeText={setName} value={roomName} />
            <Text>Choose a room type:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <TouchableOpacity  onPress={() => {
                addRoom();
            }}>
                <Text>Add Room</Text>
            </TouchableOpacity>
            {snackVisible&&(
                <Snackbar
                    message="Name taken"
                    action={<Button variant="text" title="Dismiss" color="#BB86FC" onPress={e=>changeSnack(false)} compact />}
                    style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
                />
            )}


        </SafeAreaView>
    )
}

export default AddRoomScreen;




const styles = StyleSheet.create({

    container:{
        flex:1,
    },
})