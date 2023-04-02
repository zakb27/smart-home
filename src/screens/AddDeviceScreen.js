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
import React, {useEffect, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {fetchDevices} from "../hooks/Database";
import {addDoc, collection, getDocs,doc, updateDoc, arrayUnion} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetProductImage from "../components/GetProductImage";
import Modal from "react-native-modal";
import DeviceScreen from "./DeviceScreen";



const AddRoomScreen = ({navigation})=>{
    const [value2, setValue2] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [rooms,changeRooms] = useState([]);
    const [isEnabled, setIsEnabled] = useState({});
    const [selectedRooms, setSelectedRooms] = useState([]);

    const addDevice = async() =>{
        const email = auth.currentUser?.email
        const docRef = await collection(db,'users',email,'devices')

        await addDoc(docRef, {
            id: value.value,
        });

        for (const item of selectedRooms) {
            const index = selectedRooms.indexOf(item);
            const newRef = doc(db, "users", email,'rooms',item);
            await updateDoc(newRef, {
                devices: arrayUnion(value.value)
            });
        }
        // setValue2(value2+1);
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
    }, [navigation,isEnabled]);


    const toggleSwitch = (key) => {

        if (selectedRooms.includes(key)) {
            setSelectedRooms(selectedRooms.filter((d) => d !== key));
        } else {
            setSelectedRooms([...selectedRooms, key]);
        }

        setIsEnabled((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };


    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.goBackTouch} onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-outline' size={40} color={'#8DA0E2'} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Add device</Text>
            </View>
            <ScrollView contentContainerStyle={styles.touchableContainer}>
                {items.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.touchableItem}
                                          onPress={() => {
                                              setValue(item)
                                              setOpen(true)
                                          }}
                        >
                            <Text style={styles.text}>{item.label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <Modal isVisible={open}
                   onSwipeComplete={() => setOpen(false)}
                   swipeDirection="down"
                   onBackdropPress={() => setOpen(false)}
            >

                <View style={styles.modalView}>
                    <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                        flex:1,
                        position:"absolute",
                        top:0,
                        left:0,
                        bottom:0,
                        borderRadius: 20,
                        right:0,
                    }}></LinearGradient>

                    <ScrollView>
                        {rooms.map((item,index)=>{
                            return(
                                <TouchableOpacity key={index}                         style={[
                                    styles.touchableItem,
                                    {
                                        backgroundColor: isEnabled[item.value]
                                            ? "#8a7c15"
                                            : "#f4f3f4",
                                    },
                                ]}
                                                  onPress={() => toggleSwitch(item.value)}
                                >
                                    <Text style={styles.text}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity onPress={addDevice}>
                        <Text>Add Device</Text>
                    </TouchableOpacity>

                </View>
            </Modal>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    modalView: {
        paddingTop:50,
        position:"absolute",
        alignSelf: "stretch",
        bottom:-20,
        right:-20,
        left:-20,
        height:600,
        borderRadius:'20',
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
    },


    titleContainer:{
        width:'100%',
        flexDirection:"row",

    },
    goBackTouch:{
        paddingLeft:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
    },

    touchableContainer:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    touchableItem:{
        backgroundColor:'#f4f3f4',
        width:100,
        height:50,
    },
    text:{
        color:'black'
    }
})


export default AddRoomScreen;