import React, { useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Button, StyleSheet, SafeAreaView} from 'react-native';

import DeviceScreen from "./DeviceScreen";
import {fetchDevices, fetchRooms, getRoomDevices, getSaved} from "../hooks/Database";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetProductImage from "../components/GetProductImage";
import Modal from "react-native-modal";
const RoomScreen = ({route,navigation}) =>{
    const { roomID,roomName } = route.params;
    const [currentSearch,performSearch] = useState([]);

    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);


    useEffect(() => {
        const test =  navigation.addListener('focus', () => {
            getRoomDevices(roomID).then((data)=>{
                performSearch(data)
            })
        });
        getRoomDevices(roomID).then((data)=>{
            performSearch(data)

        })
        return test;
    }, [navigation,isModal]);

    return(
        <SafeAreaView style={styles.fullView}>
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
                <Text style={styles.mainTitle}>{roomName}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {currentSearch.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
                                          onPress={() => {
                                              changeInfo(item)
                                              openModal(true)
                                          }}
                        >
                            <GetProductImage type ={item.type} />
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <Modal isVisible={isModal}
                   onSwipeComplete={() => openModal(false)}
                   swipeDirection="down"
                   onBackdropPress={() => openModal(false)}
            >
                <DeviceScreen data={currentInfo}/>
            </Modal>
        </SafeAreaView>
    )

}
export default RoomScreen;


const styles = StyleSheet.create({
    fullView:{
      flex:1,

    },
    container:{
        padding:25,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
    },
    titleContainer:{
        width:'100%',
        flexDirection:"row",

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
    card: {
        width:150,
        height:150,
        padding:5,
        paddingBottom:25,
        margin:10,
        backgroundColor:'rgba(255,255,255,0.6)',
        borderRadius:8,
        alignItems: 'center',
        justifyContent:'flex-end',


    },
    text: {
        paddingTop:10,
        marginBottom:-10,
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 15,

    },


})