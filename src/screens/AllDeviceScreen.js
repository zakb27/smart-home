import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import DeviceScreen from "./DeviceScreen";
import {fetchDevices, getRegisteredDevices, getSaved} from "../hooks/Database";

const AllDeviceScreen = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setData] = useState('');
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
    },[navigation,selectedData,modalVisible])

    return(
        <View>
            <Button title="<" onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                {devices.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
                                          onPress={() => {
                                              setData(item);
                                              setModalVisible(true)
                                          }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <DeviceScreen modalVisible = {modalVisible} setModalVisible = {setModalVisible} data={selectedData} />


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