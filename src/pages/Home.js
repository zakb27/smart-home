import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import RoomScreen from "../screens/RoomScreen";
import { createStackNavigator } from '@react-navigation/stack';
import AllDeviceScreen from "../screens/AllDeviceScreen";
const Stack = createStackNavigator();
import {fetchRooms, getRegisteredDevices} from "../hooks/Database";
import {fetchDevices} from "../hooks/Database";
const HomeRooms = ({navigation}) =>{
    const [currentRooms,setRooms] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const [currentDevices,setDevices] = useState('')
    useEffect(()=>{
        fetchRooms().then((data)=>{
            setRooms(data)
        })
        // fetchDevices().then((data)=>{
        //     setDevices(data)
        // })
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
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
                {currentRooms.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
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
      alignItems:"center",
        justifyContent:'center'
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
        backgroundColor:'#2d4d68',
        color:"White",
        padding:25,
        borderRadius:10,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },

    card: {
        width:150,
        height:150,
        padding:25,
        margin:10,
        backgroundColor:'white',
        borderRadius:8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    text:{
        color: '#2d4d68',
    },
    text2:{
        color:'white'
    }
})