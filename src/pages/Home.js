import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import RoomScreen from "../screens/RoomScreen";
import AllDeviceScreen from "../screens/AllDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack'
import {fetchRooms, getRegisteredDevices, sendInfo} from "../hooks/Database";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path,G } from "react-native-svg"
import DeviceScreen from "../screens/DeviceScreen";
import GetRoomImage from '../components/GetRoomImage'
import Ionicons from "react-native-vector-icons/Ionicons";
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


            <ScrollView contentContainerStyle={styles.container}>
                {currentRooms.map((item)=>{
                    console.log(item)
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
                            <View style={{ aspectRatio: 1,
                                height:45,
                                position:"absolute",
                                top:10,
                                left:10,
                            }}>
                            <GetRoomImage type={item.type} />
                            </View>
                            <TouchableOpacity style={styles.on} onPress={() => {
                                navigation.navigate('RoomDevice',
                                    {
                                        roomID:item.id,
                                        roomName:item.name,
                                    })
                            }}>
                                <Ionicons name={'open-outline'} size={17} color={'#1e1d1d'} />
                            </TouchableOpacity>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.textsmaller}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
                            {item.devices&&(<Text style={styles.textTiny}>{item.devices.length} devices synced</Text>)}
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
        fontWeight: '500',
        width:'100%',
    },

    container:{
        paddingVertical:25,
        paddingHorizontal:5,
        marginHorizontal:5,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'flex-start',
    },

    card: {
        width:165,
        height:125,
        padding:5,
        paddingBottom:25,
        margin:8,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        alignItems: 'flex-start',
        justifyContent:'flex-end',
    },
    on:{
        borderRadius:150,
        padding:7,
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        position:"absolute",
        top:7,
        right:7,
        backgroundColor:'#f5f5f5'
    },
    text: {
        marginBottom:5,
        marginLeft:5,
        color: '#1e1d1d',
        fontWeight: '400',
        fontSize: 13,

    },
    textsmaller:{
        // marginBottom:15,
        marginLeft:5,
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
})