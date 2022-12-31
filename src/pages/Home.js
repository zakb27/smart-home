import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'



// SplashScreen.preventAutoHideAsync();
const Home = ()=>{
    const [currentRooms,setRooms] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const [currentDevices,setDevices] = useState('')
    useEffect(()=>{
        setRooms(rooms.rooms)
        setDevices(devices.devices)

    },[])



    return(
        <SafeAreaView style={styles.overall}>
            <View style={styles.cardConnected}>
                <Text style={styles.text2}>
                   {currentDevices.length} devices connected
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {currentRooms.map((item,index)=>{
                    return(
                        <View key={index} style={styles.card}>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>

        </SafeAreaView>


    )
}

export default Home;


const styles = StyleSheet.create({
    overall:{
      alignItems:"center"
    },
    container:{
        padding:25,
        minHeight:300,

        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center'
    },
    cardConnected:{
        marginTop:25,
        width:330,
        height:100,
        backgroundColor:'#2d4d68',
        color:"White",
        padding:25,
        borderRadius:10,
        justifyContent: 'center', alignItems: 'center',
    },

    card: {
        width:150,
        height:150,
        padding:25,
        margin:10,
        backgroundColor:'white',
        borderRadius:8,
        alignItems: 'center',
    },
    text:{
        color: '#2d4d68',
    },
    text2:{
        color:'white'
    }
})