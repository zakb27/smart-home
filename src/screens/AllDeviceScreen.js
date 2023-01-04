import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'
import DeviceScreen from "./DeviceScreen";

const AllDeviceScreen = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setData] = useState('');

    return(
        <View>
            <Button title="<" onPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                {devices.devices.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.card}
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
        alignItems:'center'
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