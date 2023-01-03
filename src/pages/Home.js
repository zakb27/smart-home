import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
import RoomScreen from "../screens/RoomScreen";
import { createStackNavigator } from '@react-navigation/stack';
import AllDeviceScreen from "../screens/AllDeviceScreen";
const Stack = createStackNavigator();

const HomeRooms = ({navigation}) =>{
    const [currentRooms,setRooms] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const [currentDevices,setDevices] = useState('')
    useEffect(()=>{
        setRooms(rooms.rooms)
        setDevices(devices.devices)

    },[])



    return(
        <SafeAreaView style={styles.overall}>
            <TouchableOpacity style={styles.cardConnected}
                              onPress={() =>{
                                  navigation.navigate('AllDevices')
                              }}
            >
                <Text style={styles.text2}>
                    {currentDevices.length} devices connected
                </Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container}>
                {currentRooms.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.card}
                                          onPress={() => {
                                              navigation.navigate('RoomDevice',
                                                  {
                                                      roomID:item.id
                                                  })
                                          }}
                        >
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
                headerShown: false
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