import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getSaved, getAvgTemp, getRegisteredDevices, sendInfo} from "../hooks/Database";
import DeviceScreen from "../screens/DeviceScreen";
import {TransitionPresets} from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
import {LinearGradient} from "expo-linear-gradient";
import GetProductImage from "../components/GetProductImage";
const Stack = createStackNavigator();
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import AllDeviceScreen from "../screens/AllDeviceScreen";
const SavedMain = ({navigation})=>{
    const [devices,setDevices] = useState([]);
    const [registered,setRegistered] = useState([]);
    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);
    const [avgTemp,changeTemp] = useState('')
    const [reRender,changeRender] = useState(false)

    useEffect(() => {
        const test =  navigation.addListener('focus', () => {
            getSaved().then((data) => {
                setDevices(data);
            })
            getAvgTemp().then((data)=>{
                changeTemp(data)
            })
            getRegisteredDevices().then((data)=>{
                setRegistered(data)
            })
        });
        getSaved().then((data) => {
            setDevices(data);
        })
        getAvgTemp().then((data)=>{
            changeTemp(data)
        })
        getRegisteredDevices().then((data)=>{
            setRegistered(data)
        })
        return test
    }, [navigation,isModal,reRender]);

    return(
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <Text style={styles.mainTitle}>Favourites</Text>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avgCard}>
                    <View style={{ aspectRatio: 1,
                        height:45,
                        position:"absolute",
                        top:10,
                        left:10,
                    }}>
                        <GetProductImage type ={'temp'} />
                    </View>
                    <View style={styles.avgTemp}>
                        <Text style={styles.bigTemp}>{avgTemp}</Text>
                        <Text style={styles.degree}>°C</Text>
                    </View>
                    <Text style={styles.wish}>My home</Text>
                    <Text style={styles.subwish}>Average Temperature</Text>
                </View>

                <View style={styles.avgCard}>
                    <View style={{ aspectRatio: 1,
                        height:45,
                        position:"absolute",
                        top:10,
                        left:10,
                    }}>
                        <GetProductImage type ={'washer'} />
                    </View>
                    <View style={styles.avgTemp}>
                        <Text style={styles.bigTemp}>167</Text>
                        <Text style={styles.degree}>Mins</Text>
                    </View>
                    <Text style={styles.wish}>Wash</Text>
                    <Text style={styles.subwish}>Time left for wash</Text>
                </View>


                <TouchableOpacity  style={styles.cardConnected}
                                   onPress={() =>{
                                       navigation.navigate('AllDevices')
                                   }}
                >
                    <View style={{ aspectRatio: 1,
                        height:30,
                        position:"absolute",
                        top:10,
                        left:10,
                    }}>
                        <GetProductImage type ={'other'} />
                    </View>
                    <Text style={styles.text2}>
                        {registered.length} devices connected
                    </Text>
                    <View style={styles.goOn}>
                        <Ionicons name={'open-outline'} size={20} color={'#ffffff'} />
                    </View>
                </TouchableOpacity>

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
                            icon='open-outline'
                            break
                        case('washer'):
                            thing="Washing machine"
                            icon='open-outline'
                            break
                        case('dishwasher'):
                            thing="Dish Washer"
                            icon='open-outline'
                            break
                        default:
                            thing='other'
                            break
                    }
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
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

const Saved = ({navigation})=>{

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeRooms" component={SavedMain}/>
            <Stack.Screen name="AllDevices" component={AllDeviceScreen} />
        </Stack.Navigator>
        // <SavedMain navigation={navigation} />


    )
}

export default Saved;


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#8da0e2',
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
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:25,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '500',
        width:'100%',
    },
    card: {
        width:165,
        height:115,
        padding:5,
        paddingBottom:25,
        margin:8,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        alignItems: 'flex-start',
        justifyContent:'flex-end',


    },
    goOn:{
        position:"absolute",
        padding:7,
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        top:7,
        right:7,
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:100,
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
    cardConnected:{
        backgroundColor:'rgba(0,0,0,0.4)',
        width:165,
        height:75,
        borderRadius:18,
        marginLeft:8,
        marginRight:50,
        // marginVertical:15,
        marginBottom:15,
    },
    text2:{
        position:"absolute",
        color:'#ffffff',
        fontSize:12,
        bottom:10,
        left:12,
    },
    avgCard:{
        backgroundColor:'rgba(0,0,0,0.4)',
        width:165,
        height:125,
        marginLeft:8,
        margin:8,
        borderRadius:18,
        marginBottom:25,
    },
    avgTemp:{
        position:"absolute",
        top:10,
        right:10,
    },
    bigTemp:{
        fontSize:25,
        color:'#ffffff',
        textAlign:'right'
    },
    degree:{
        fontSize:15,
        paddingTop:10,
        color:'#ffffff',
        textAlign:'right'
    },
    wish:{
        position:"absolute",
        color:'#ffffff',
        fontSize:15,
        bottom:40,
        left:10,
    },
    subwish:{
        position:"absolute",
        color:'#ffffff',
        fontSize:10,
        bottom:10,
        left:10,
    }
})
