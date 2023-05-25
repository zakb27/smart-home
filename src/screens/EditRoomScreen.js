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
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebase";
import {collection, getDocs} from "firebase/firestore";
import {fetchDevices, fetchRooms, getOtherDevices, getPromptDevice, getRoomDevices,updateRoom,deleteRoom} from "../hooks/Database";
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import GetRoomImage from "../components/GetRoomImage";
import GetProductImage from "../components/GetProductImage";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Snackbar} from "@react-native-material/core";

const EditRoomScreen = ({navigation}) =>{
    const [open, setOpen] = useState(false);
    const [dropOpen,setDropOpen] = useState(false);
    const [isEnabled, setIsEnabled] = useState({});
    const [value, setValue] = useState({});
    const [value2, setValue2] = useState({});
    const [items,setItems] = useState([]);
    const [rooms,setRooms] = useState([])
    const [name,setName] = useState('')
    const [connectedDevices,changeConnected] = useState([])
    const [selectedDevices,changeSelectedDevices] = useState([])
    const [isFocus, setIsFocus] = useState(false);
    const [removeDevices,changeRemoveDevices] = useState([])

    const [currentRoomID,changeRoomID] = useState('');
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");

    const handleSubmit = async() =>{
        try {
            const email = auth.currentUser?.email
            const docRef = await collection(db, 'users', email, 'rooms')
            const docsSnap = await getDocs(docRef);
            docsSnap.forEach(doc => {
                if (doc.data().name.toLowerCase() === name.toLowerCase()) {
                    setOpen(false)
                    setName('')
                    setItems([])
                    setValue({})
                    setValue2([])
                    setIsEnabled({})
                    setDropOpen(false)
                    changeConnected([])
                    changeSelectedDevices([])
                    changeRemoveDevices([])
                    changeRoomID('')
                    throw new Error('Name taken');
                }
            })

            await updateRoom(name, selectedDevices, currentRoomID, removeDevices).then(() => {
                console.log('updated room')
                setOpen(false)
                setName('')
                setItems([])
                setValue({})
                setValue2([])
                setIsEnabled({})
                setDropOpen(false)
                changeConnected([])
                changeSelectedDevices([])
                changeRemoveDevices([])
                changeRoomID('')
            })
        }
        catch(e){
            changeSnack(true)
            changeErrorMessage(e.toString())
        }
    }

    const handleDelete = () =>{
        deleteRoom(currentRoomID).then(() =>{
            console.log('deleted room')
            setOpen(false)
            setName('')
            setItems([])
            setValue({})
            setValue2([])
            setIsEnabled({})
            setDropOpen(false)
            changeConnected([])
            changeSelectedDevices([])
            changeRemoveDevices([])
            changeRoomID('')
        })
    }

    const toggleSwitch = (key) => {
        if (selectedDevices.includes(key)) {
            changeSelectedDevices(selectedDevices.filter((d) => d !== key));
            changeRemoveDevices([...removeDevices, key])

        } else {
            changeSelectedDevices([...selectedDevices, key]);
            changeRemoveDevices(removeDevices.filter((d) => d !== key));

        }

        setIsEnabled((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const others = async(allDevice) =>{
        if(!allDevice){
            allDevice=[]
        }
        changeSelectedDevices(allDevice)
        await getOtherDevices(allDevice).then((res)=>{
            res.forEach((thing)=>{
                setItems(old=>[...old,{label:thing.name,value:thing.id}])
            })

        })

    }

    const getDevices = (id)=>{
        changeRoomID(id)
            getRoomDevices(id).then((data)=>{
                changeConnected(data)
            })
    }

    const addNewDevice = (id)=>{
        const newData = items.filter(obj => obj !== id);
        setItems(newData)
        getPromptDevice(id.value).then((data)=>{
            changeConnected(old=>[...old,data[0]])
            changeSelectedDevices(old=>[...old,data[0].id])
        })
    }

    useEffect(() => {
        const compareDevices = async() =>{
            fetchRooms().then((data)=>{
                setRooms(data)
            })
        }
        compareDevices().then();
    }, [navigation,open]);


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
                <Text style={styles.mainTitle}>Edit Room</Text>
            </View>

            {rooms.length>0?
                <ScrollView contentContainerStyle={styles.touchableContainer}>
                    {rooms.map((item,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.card2}
                                              onPress={() => {
                                                  setValue(item)
                                                  setName(item.name)
                                                  setOpen(true)
                                                  others(item.devices)
                                                  getDevices(item.id)
                                              }}
                            >
                                <View style={{ aspectRatio: 1,
                                    height:35,
                                    position:"absolute",
                                    left:10,
                                }}>
                                    <GetRoomImage type={item.type} />
                                </View>
                                <View style={styles.textView}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.textsmaller}>Edit Room</Text>
                                </View>
                                <View style={{
                                    height:'100%',
                                    position:"absolute",
                                    right:10,
                                    paddingLeft:15,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    // top:2,
                                    borderLeftWidth:1,
                                    borderLeftColor:'black',
                                }}>
                                    <Ionicons name={'exit-outline'} size={25} color={'#1e1d1d'} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                :
                <><Text style={styles.openingText}>No rooms connected</Text></>

            }



            <Modal isVisible={open}
                   onBackdropPress={() => {
                       setOpen(false)
                       setName('')
                       setItems([])
                       setValue({})
                       setValue2([])
                       setIsEnabled({})
                       setDropOpen(false)
                       changeConnected([])
                       changeSelectedDevices([])
                       changeRemoveDevices([])
                       changeRoomID('')
                   }}
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
                    <View style={styles.editTitle}>
                    <TextInput
                        placeholder="Choose name... " onChangeText={setName}
                        value={name}
                        style={styles.textInput}
                        maxLength={15}
                        placeholderTextColor={'#C4CBFD'}
                    />
                        <View style={{
                            position:"absolute",
                            right:4,
                            top:4,
                        }}>
                            <Ionicons name={'pencil'} size={20} color={'#1e1d1d'} />
                        </View>
                    </View>
                    <View style={styles.scrollLimiter}>
                    <ScrollView>
                        {connectedDevices.map((item,index)=>{
                            return(
                            <TouchableOpacity key={index} style={[
                                styles.card,
                                // {
                                //     backgroundColor: isEnabled[item.id]
                                //         ? "#da2c38"
                                //         : "#29bf12",
                                // },
                            ]}
                                              onPress={() => toggleSwitch(item.id)}
                            >
                                <View style={{ aspectRatio: 1,
                                    height:30,
                                    position:"absolute",
                                    left:7,
                                }}>
                                    <GetProductImage type={item.type} />
                                </View>
                                <Text style={[styles.text,{position:"absolute",
                                    left:50,}]}>{item.name}</Text>


                                {!isEnabled[item.id]
                                    ?
                                    <View style={{
                                        position:"absolute",
                                        right:4,
                                    }}>
                                        <Ionicons name={'checkmark-outline'} size={25} color={"#29bf12"} />
                                    </View>
                                    :
                                    <View style={{
                                        position:"absolute",
                                        right:4,
                                    }}>
                                        <Ionicons name={'close-outline'} size={25} color={"#da2c38"} />
                                    </View>
                                }

                            </TouchableOpacity>


                            )
                        })}
                    </ScrollView>
                    </View>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={items}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Add item' : '...'}
                        value={value2}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            // setValue2(item.value);
                            addNewDevice(item)
                            setIsFocus(false);
                        }}
                    />
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.removeButton} onPress={handleDelete}>
                        <Text style={styles.buttonText2}>Delete</Text>
                    </TouchableOpacity>
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

export default EditRoomScreen;

const styles = StyleSheet.create({
    container:{
       flex:1,
    },
    openingText:{
        color:'#8da0e2',
        fontSize:16,
        fontWeight:'600',
        padding:20,
    },
    editTitle:{
        marginTop:-20,
        padding:10,
        paddingHorizontal:30,
        width:200,
    },
    textInput:{
        color:'#000000',
        fontSize:35,
        fontWeight: '400',
    },
    buttonContainer:{
        marginTop:50,
       display:'flex',
       flexDirection:'row',
        alignItems:'center',
    },
    submit:{
        padding:15,
        width:150,
        backgroundColor:'rgba(41,191,18,0)',
        borderRadius:7,
        borderColor: "#3b3b3b",
        borderWidth: 2,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
        margin:10,

    },
    removeButton:{
        position:'absolute',
        top:28,
        right:8,
        padding:0,
        height:50,
        width:60,
        backgroundColor:'rgba(41,191,18,0)',
        borderRadius:7,
        borderColor: "#da2c38",
        borderWidth: 2,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
        margin:10,


    },
    buttonText: {
        color: '#3b3b3b',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText2: {
        color: '#da2c38',
        fontWeight: '700',
        fontSize: 12,
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
        marginTop:25,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    touchableItem:{
        backgroundColor:'#f4f3f4',
        width:100,
        height:50,
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
    card2: {
        width:265,
        height:60,
        padding:5,
        margin:3,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:7,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent:'space-evenly',
    },
    card: {
        width:225,
        height:40,
        padding:5,
        margin:3,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:7,
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
    scrollLimiter:{
        height:200,
        marginTop:25,
    },
    dropdown: {
        width:225,
        height: 40,
        borderColor: '#3b3b3b',
        borderWidth: 1,
        color:'white',
        borderRadius: 8,
        padding:15,

    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color:'#3b3b3b',
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
})