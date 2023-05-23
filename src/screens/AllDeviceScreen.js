import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceScreen from "./DeviceScreen";
import {fetchDevices, getRegisteredDevices, getSaved, sendInfo} from "../hooks/Database";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TransitionPresets } from '@react-navigation/stack'
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetProductImage from "../components/GetProductImage";
import Modal from "react-native-modal";

const AllDeviceScreen = ({navigation}) =>{
    const [devices,setDevices] = useState([]);
    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);
    const [reRender,changeRender] = useState(false)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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
    },[navigation,isModal,reRender])

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
                <Text style={styles.mainTitle}>All Devices</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {devices.map((item,index)=>{
                    let thing='Other'
                    let ifOn=''
                    let icon='power'
                    switch(item.type){
                        case('temp'):
                            thing="Set Temperature"
                            ifOn=item.value.toString() + '\u00B0C'
                            icon='open-outline'
                            break
                        case('light'):
                            thing="Light"
                            if(item.value>0){
                                ifOn='On'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('door'):
                            thing="Door Control"
                            icon='open-outline'
                            if(item.value>0){
                                ifOn='Open'
                            }
                            else{
                                ifOn='Locked'
                            }
                            break
                        case('speaker'):
                            thing="Speaker"

                            if(item.value>0){
                                ifOn='On'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('washer'):
                            thing="Washing machine"
                            icon='open-outline'
                            if(item.time>0){
                                ifOn=item.time.toString()+ ' mins left at '+ item.value.toString() +'°C'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('dishwasher'):
                            thing="Dish Washer"
                            icon='open-outline'
                            if(item.time>0){
                                ifOn=item.time.toString()+ ' mins left at '+ item.value.toString() +'°C'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('other'):
                            thing='Other'
                            if(item.value>0){
                                ifOn='On'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        default:
                            thing='Other'
                            break
                    }
                    return(
                        <TouchableOpacity key={index} style={styles.card}
                                          onPress={() => {
                                              changeInfo(item)
                                              openModal(true)
                                          }}
                        >
                            <View style={{ aspectRatio: 1,
                                height:35,
                                position:"absolute",
                                top:10,
                                left:10,
                            }}>
                                <GetProductImage type ={item.type} />
                            </View>

                            <TouchableOpacity style={styles.on} onPress={e=> {
                                if (icon === 'power') {

                                    let percent =100
                                    if(ifOn==='On'){
                                        percent=0
                                        ifOn='Off'
                                    }
                                    else{
                                        ifOn='On'
                                    }
                                    const info = {
                                        id: item.id,
                                        value:percent,
                                    }
                                    sendInfo(info).then(response => {
                                    });

                                }
                                if (icon ==='open-outline') {
                                    changeInfo(item)
                                    openModal(true)
                                }
                                changeRender(!reRender)
                            }}>
                                <Ionicons name={icon} size={17} color={'#1e1d1d'} />
                            </TouchableOpacity>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.textsmaller}>{thing}</Text>
                            <Text style={styles.textTiny}>{ifOn}</Text>
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

export default AllDeviceScreen;



const styles = StyleSheet.create({
    fullView:{flex:1},
    titleContainer:{
        width:'100%',
        flexDirection:"row",
    },
    goBackTouch:{
        paddingLeft:20,
        alignItems: 'center',
        justifyContent:'center',
    },

    container:{
        paddingVertical:25,
        paddingHorizontal:5,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:0,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '500',
        width:'100%',
    },
    card: {
        width:150,
        height:115,
        padding:5,
        paddingBottom:25,
        margin:8,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        alignItems: 'flex-start',
        justifyContent:'flex-end',


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

})