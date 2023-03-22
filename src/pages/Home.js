import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import RoomScreen from "../screens/RoomScreen";
import AllDeviceScreen from "../screens/AllDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack'
import {fetchRooms, getRegisteredDevices} from "../hooks/Database";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path,G } from "react-native-svg"
import DeviceScreen from "../screens/DeviceScreen";
import GetRoomImage from '../components/GetRoomImage'
const HomeRooms = ({navigation}) =>{
    const [currentRooms,setRooms] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const [currentDevices,setDevices] = useState('')

    useEffect(()=>{
        fetchRooms().then((data)=>{
            setRooms(data)
        })
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
    },[])



    return(
        <SafeAreaView style={styles.overall}>

            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>

            <Text style={styles.mainTitle}>Home</Text>
            <TouchableOpacity  style={styles.cardConnected}
                              onPress={() =>{
                                  navigation.navigate('AllDevices')
                              }}
            >
                <Text style={styles.text2}>
                    {currentDevices.length} devices connected
                </Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                {currentRooms.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
                                          onPress={() => {
                                              navigation.navigate('RoomDevice',
                                                  {
                                                      roomID:item.id,
                                                      roomName:item.name,
                                                  })
                                          }}
                        >
                            <GetRoomImage type={item.type} />
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

        </SafeAreaView>


    )
}

// SplashScreen.preventAutoHideAsync();
const Home = ()=>{
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                styles:{backgroundColor:"yellow"}
            }}

        >
            <Stack.Screen name="HomeRooms" component={HomeRooms} />
            <Stack.Screen name="RoomDevice" component={RoomScreen} />
            <Stack.Screen name="AllDevices" component={AllDeviceScreen} />
        </Stack.Navigator>


    )
}

export default Home;


const styles = StyleSheet.create({
    overall:{
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#8da0e2',
        flex:1,
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:30,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
        width:'100%',
    },

    container:{
        padding:25,
        minHeight:300,

        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center'
    },
    cardConnected:{
        marginTop:25,
        width:330,
        height:100,
        // backgroundColor:'rgba(255,255,255,0.7)',
        backgroundColor:'rgba(255,255,255,0.9)',
        color:"White",
        padding:25,
        borderRadius:10,
        justifyContent: 'center', alignItems: 'center',
        elevation: 5
    },

    card: {
        width:150,
        height:180,
        padding:25,
        margin:10,
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:8,
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    text: {
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 15,
    },
    text2:{
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 15,
    }
})