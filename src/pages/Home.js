import React, {useEffect,useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'


const Home = ()=>{
    const [currentRooms,setRooms] = useState('')
    const [currentDevices,setDevices] = useState('')
    useEffect(()=>{
        setRooms(rooms.rooms)
        setDevices(devices.devices)
    })

    return(
        <SafeAreaView>
            <Text>
                You have {currentDevices.length} amount
            </Text>
            {/*<View>*/}
            {/*    {currentRooms.map((item,index)=>{*/}
            {/*        return(*/}
            {/*            <View key={index}>*/}
            {/*                <Text>{item.name}</Text>*/}
            {/*            </View>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</View>*/}

        </SafeAreaView>


    )
}

export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})