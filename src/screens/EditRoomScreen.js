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

    const handleSubmit = async() =>{
        await updateRoom(name,selectedDevices,currentRoomID,removeDevices).then(() =>{
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
                    <TextInput
                        placeholder="Choose name... " onChangeText={setName}
                        value={name}
                        style={styles.textInput}
                        placeholderTextColor={'#C4CBFD'}
                    />
                    <View style={styles.scrollLimiter}>
                    <ScrollView>
                        {connectedDevices.map((item,index)=>{
                            return(
                            <TouchableOpacity key={index} style={[
                                styles.card,
                                {
                                    backgroundColor: isEnabled[item.id]
                                        ? "#da2c38"
                                        : "#29bf12",
                                },
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
                                <View style={{
                                    position:"absolute",
                                    right:4,
                                    top:4,
                                }}>
                                    <Ionicons name={'create-outline'} size={15} color={'#1e1d1d'} />
                                </View>
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

                    <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                        <Text>Submit changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={handleDelete}>
                        <Text>Delete room</Text>
                    </TouchableOpacity>

                </View>
            </Modal>


        </SafeAreaView>
    )

}

export default EditRoomScreen;

const styles = StyleSheet.create({
    container:{
       flex:1,
    },
    submit:{
        padding:10,
        backgroundColor:'#29bf12',
        borderRadius:10,
    },
    removeButton:{
        padding:10,
        backgroundColor:'#da2c38',
        borderRadius:10,

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
        borderRadius:'20',
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
        borderRadius:18,
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
    scrollLimiter:{
        height:200,
    },
    dropdown: {
        width:300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
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
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})