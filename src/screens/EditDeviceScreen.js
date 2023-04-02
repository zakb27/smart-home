import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet, Pressable
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import Modal from "react-native-modal";
import {deletePromptDevice, fetchRooms, getRegisteredDevices} from "../hooks/Database";


const EditDeviceScreen = ({navigation}) =>{

    const [devices,setDevices] = useState([]);
    const [currentInfo,changeInfo] = useState([]);
    const [updatedData,updateData] = useState('');

    const handleRemove = async(data) =>{
        await deletePromptDevice(data.id);
        updateData('Done');
    }


    useEffect(()=>{
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
    },[navigation,updatedData])

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
                <Text style={styles.mainTitle}>Edit Device</Text>
            </View>

            <ScrollView contentContainerStyle={styles.touchableContainer}>
                {devices.map((item,index)=>{
                    return(
                        <View style={styles.scheduleView} key={index}>
                            <Pressable style={styles.dayButton}
                                       onPress={() => {
                                           alert('todo')
                                       }}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                            <TouchableOpacity style={styles.removeButton}
                                              onPress={()=>handleRemove(item)}
                            >
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>



        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    titleContainer:{
        width:'100%',
        flexDirection:"row",

    },
    scheduleView:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:300,
        height:50,
        borderColor:"black",
        borderWidth:1,
        borderRadius:5,
        overflow:'hidden',
        marginVertical:5,
    },
    removeButton:{
        backgroundColor:"#e63946",
        borderLeftColor:"black",
        borderLeftWidth:1,
        width:45,
        alignItems:"center",
        justifyContent:"center"
    },
    dayButton:{
        flex:1,
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        font:'black',
        backgroundColor:'rgba(168,218,220,0)',


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
})


export default EditDeviceScreen