import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import React, {useEffect, useState} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from "react-native-dropdown-picker";
import {fetchDevices, sendInfo} from "../hooks/Database";
import {addDoc, collection, getDocs,doc, updateDoc, arrayUnion} from "firebase/firestore";
import {auth, db} from "../../firebase";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetProductImage from "../components/GetProductImage";
import Modal from "react-native-modal";
import DeviceScreen from "./DeviceScreen";
import GetRoomImage from "../components/GetRoomImage";
import {Snackbar} from "@react-native-material/core";



const AddRoomScreen = ({navigation})=>{
    const [value2, setValue2] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [rooms,changeRooms] = useState([]);
    const [isEnabled, setIsEnabled] = useState({});
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");
    const addDevice = async() =>{

        try{
            if(selectedRooms.length===0){
                setOpen(false)
                throw new Error('Must select room');
            }
            const email = auth.currentUser?.email
            const docRef = await collection(db,'users',email,'devices')

            await addDoc(docRef, {
                id: value.value,
                rooms:selectedRooms,
            });

            for (const item of selectedRooms) {
                const index = selectedRooms.indexOf(item);
                const newRef = doc(db, "users", email,'rooms',item);
                await updateDoc(newRef, {
                    devices: arrayUnion(value.value)
                });
            }
            setOpen(false)
            setSelectedRooms([])
            setIsEnabled({})
        }
        catch(e){
            changeSnack(true)
            changeErrorMessage(e.message.toString())
        }

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
                if (!found) hew.push({ label: device.name,value: device.id,type:device.type});
            })
            setItems(hew);
            const tempRooms = []
            roomsSnap.forEach(doc=>{
                tempRooms.push({label:doc.data().name,value:doc.id,type:doc.data().type})
            })
            changeRooms(tempRooms);
        }
        compareDevices().then();
    }, [navigation,open]);


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
                    let thing='Other'
                    switch(item.type){
                        case('temp'):
                            thing="Set Temperature"
                            break
                        case('light'):
                            thing="Light"
                            break
                        case('door'):
                            thing="Door Control"
                            break
                        case('speaker'):
                            thing="Speaker"
                            break
                        case('washer'):
                            thing="Washing machine"
                            break
                        case('dishwasher'):
                            thing="Dish Washer"
                            break
                        default:
                            thing='other'
                            break
                    }
                    return(
                        <TouchableOpacity key={index} style={styles.card}
                                          onPress={() => {
                                              setValue(item)
                                              setOpen(true)
                                          }}
                        >
                            <View style={{ aspectRatio: 1,
                                height:35,
                                position:"absolute",
                                left:10,

                            }}>
                                <GetProductImage type ={item.type} />
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{item.label}</Text>
                                <Text style={styles.textsmaller}>{thing}</Text>
                            </View>
                            <View style={{
                                position:"absolute",
                                right:2,
                                top:2,
                            }}>
                            <Ionicons name={'add'} size={25} color={'#1e1d1d'} />
                            </View>
                        </TouchableOpacity>

                    )
                })}
            </ScrollView>

            <Modal isVisible={open}
            //        onSwipeComplete={() => {
            //            setOpen(false)
            //            setSelectedRooms([])
            //        }
            // }
            //        swipeDirection="down"
                   onBackdropPress={() => {
                       setOpen(false)
                       setSelectedRooms([])
                       setIsEnabled({})
                   }
            }
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

                        {rooms.length>0 ?
                            <>
                            <Text style={styles.title2}>Select rooms to sync</Text>
                            <View style={styles.scrollLimiter}>
                                <ScrollView>
                                    {rooms.map((item,index)=>{
                                        return(
                                            <TouchableOpacity key={index}                         style={[
                                                styles.card2,
                                                {
                                                    backgroundColor: isEnabled[item.value]
                                                        ? "#52d32b"
                                                        : "#ffffff",
                                                },
                                            ]}
                                                              onPress={() => toggleSwitch(item.value)}
                                            >
                                                <View style={{ aspectRatio: 1,
                                                    height:30,
                                                    position:"absolute",
                                                    left:7,
                                                }}>
                                                    <GetRoomImage type={item.type} />
                                                </View>
                                                <Text style={[styles.text,{position:"absolute",
                                                    left:50,}]}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
                                <TouchableOpacity onPress={addDevice} style={styles.button}>
                                    <Text style={styles.buttonText}>Add Device</Text>
                                </TouchableOpacity>
                            </View>
                            </>
                            :
                            <>
                                <Text style={styles.title2}>No rooms connected</Text>
                                <Text style={styles.openingText}>(Must add a room first)</Text>
                            </>

                        }

                </View>
            </Modal>

            {snackVisible&&(
                <Snackbar
                    message={errorMessage}
                    action={<Button variant="text" title="Dismiss" color="#BB86FC" onPress={e=>changeSnack(false)} compact />}
                    style={{ position: "absolute",
                        start: 16, end: 16, bottom: 16,

                    }} />
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollLimiter:{
        height:375,
        alignItems:'center'
    },
    openingText:{
        color:'#8da0e2',
        fontSize:16,
        fontWeight:'400',
        padding:20,
    },
    modalView: {
        paddingTop:50,
        position:"absolute",
        alignSelf: "stretch",
        bottom:-20,
        right:-20,
        left:-20,
        height:600,
        borderRadius:20,
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
    },

    title2:{
        color:'#8da0e2',
        fontSize:23,
        display:'flex',
        marginTop:-10,
        marginBottom:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
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
    card: {
        width:265,
        height:60,
        padding:5,
        margin:3,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent:'space-evenly',
    },

    card2: {
        width:225,
        height:40,
        padding:5,
        margin:3,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:9,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent:'space-evenly',
    },

    text: {
        color: '#1e1d1d',
        fontWeight: '400',
        fontSize: 13,

    },
    textsmaller:{
        // marginBottom:15,
        color: '#494848',
        fontWeight: '400',
        fontSize: 10,
    },
    textTiny:{
        position:'absolute',
        bottom:10,
        left:5,
        marginLeft:5,
        color: '#737272',
        fontWeight: '400',
        fontSize: 9,
    },
    textView:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:0,
        position:'absolute',
        left:60,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: '80%',
        height:50,
        padding: 15,
        margin:30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        textAlign:'right',

    },
    buttonText: {
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 16,
    },
})


export default AddRoomScreen;