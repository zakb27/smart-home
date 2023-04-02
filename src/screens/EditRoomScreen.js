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
import {fetchDevices, fetchRooms, getOtherDevices, getRoomDevices} from "../hooks/Database";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";


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
    const handleNameChange = () =>{

    }


    const toggleSwitch = (key) => {
        if (selectedDevices.includes(key)) {
            changeSelectedDevices(selectedDevices.filter((d) => d !== key));
        } else {
            changeSelectedDevices([...selectedDevices, key]);
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
            console.log(res)
        })

    }

    const getDevices = (id)=>{
            getRoomDevices(id).then((data)=>{
                changeConnected(data)
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
                        <TouchableOpacity key={index} style={styles.touchableItem}
                                          onPress={() => {
                                              setValue(item)
                                              setName(item.name)
                                              setOpen(true)
                                              others(item.devices)
                                              getDevices(item.id)
                                          }}
                        >
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>


            <Modal isVisible={open}
                   onSwipeComplete={() => {

                       setOpen(false)
                       setName('')
                       setItems([])
                       setValue({})
                       setValue2([])
                       setDropOpen(false)
                       changeConnected([])
                       changeSelectedDevices([])
                   }}
                   swipeDirection="down"
                   onBackdropPress={() => {
                       setOpen(false)
                       setName('')
                       setItems([])
                       setValue({})
                       setValue2([])
                       setDropOpen(false)
                       changeConnected([])
                       changeSelectedDevices([])
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
                                <TouchableOpacity key={index}                         style={[
                                    styles.touchableItem,
                                    {
                                        backgroundColor: isEnabled[item.id]
                                            ? "#e74c4c"
                                            : "#71cc1d",
                                    },
                                ]}
                                                  onPress={() => toggleSwitch(item.id)}
                                >
                                    <Text style={styles.text}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    </View>

                    <DropDownPicker
                        open={dropOpen}
                        value={value2}
                        items={items}
                        setOpen={setDropOpen}
                        setValue={setValue2}
                        setItems={setItems}
                        style={styles.dropDown}
                        dropDownMaxHeight={300}
                    />

                    <TouchableOpacity>
                        <Text>Submit changes</Text>
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
    dropDown:{
        backgroundColor:'rgba(0,0,0,0)',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.13)',
        marginBottom:30,
        color: '#7590db',
        fontWeight: '700',
        fontSize: 16,
    },
    scrollLimiter:{
        height:200,
    }
})