import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import DeviceScreen from "./DeviceScreen";
import {fetchDevices, getRegisteredDevices, getSaved} from "../hooks/Database";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TransitionPresets } from '@react-navigation/stack'

const AllDeviceScreen = ({navigation}) =>{
    const [devices,setDevices] = useState([]);

    useEffect(()=>{
        const test =  navigation.addListener('focus', () => {
            getRegisteredDevices().then((data) => {
                setDevices(data);
            })
        });

        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
        return test;
    },[navigation])

    return(
        <View>
            <Button title="<" onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                {devices.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
                                          onPress={() => {
                                              navigation.navigate('DeviceContainer',{
                                                  data:item,
                                              })
                                          }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default AllDeviceScreen;



const styles = StyleSheet.create({
    container:{
        padding:25,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center'
    },
    card: {
        width:150,
        height:150,
        padding:25,
        margin:10,
        backgroundColor:'white',
        borderRadius:8,
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
        fontSize:12,
    }


})