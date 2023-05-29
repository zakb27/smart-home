import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet, Pressable
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import Modal from "react-native-modal";
import {deletePromptDevice, fetchRooms, getRegisteredDevices} from "../hooks/Database";
import GetProductImage from "../components/GetProductImage";

import { SafeAreaView } from 'react-native-safe-area-context';
const EditDeviceScreen = ({navigation}) =>{

    const [devices,setDevices] = useState([]);
    const [currentInfo,changeInfo] = useState([]);
    const [updatedData,updateData] = useState('');

    const handleRemove = async(data) =>{
        await deletePromptDevice(data.id);
        updateData('Done');
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })

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
            {devices.length>0?
                <ScrollView contentContainerStyle={styles.touchableContainer}>
                    {devices.map((item,index)=>{
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
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.textsmaller}>{thing}</Text>
                                </View>
                                <TouchableOpacity style={styles.removeButton}
                                                  onPress={()=>handleRemove(item)}
                                >
                                    <Ionicons name={'trash-outline'} size={25} color={'#cc3737'} />

                                </TouchableOpacity>
                            </TouchableOpacity>

                        )

                    })}
                </ScrollView>
                :
                <><Text style={styles.openingText}>No devices connected</Text></>
            }




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
    openingText:{
        color:'#8da0e2',
        fontSize:16,
        fontWeight:'600',
        padding:20,
    },
    removeButton:{
        position:"absolute",
        right:0,
        width:45,
        height:'100%',
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
    card: {
        width:265,
        height:60,
        margin:3,
        // borderBottomWidth:'1',
        // borderBottomColor:'black',
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
        textAlign:'left',

    },
    textsmaller:{
        // marginBottom:15,
        color: '#494848',
        fontWeight: '400',
        fontSize: 10,
    },
    textTiny:{
        position:'absolute',
        left:5,
        marginLeft:5,
        color: '#737272',
        fontWeight: '400',
        fontSize: 9,
        textAlign:'left',

    },
    textView:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:0,
        position:'absolute',
        left:60,
    }

})


export default EditDeviceScreen