import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getSaved} from "../hooks/Database";
import DeviceScreen from "../screens/DeviceScreen";
import {TransitionPresets} from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
import {LinearGradient} from "expo-linear-gradient";
import GetProductImage from "../components/GetProductImage";
const Stack = createStackNavigator();
import Modal from "react-native-modal";
const SavedMain = ({navigation})=>{
    const [devices,setDevices] = useState([]);

    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);


    useEffect(() => {
        const test =  navigation.addListener('focus', () => {
            getSaved().then((data) => {
                setDevices(data);
            })
        });
        getSaved().then((data) => {
            setDevices(data);
        })
        return test;
    }, [navigation,isModal]);

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
            <Text style={styles.mainTitle}>Saved</Text>
            <ScrollView contentContainerStyle={styles.container}>
                {devices.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.card}
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

const Saved = ({navigation})=>{

    return(
        // <Stack.Navigator
        //     screenOptions={{
        //         headerShown: false,
        //     }}
        // >
        //     <Stack.Screen name="HomeRooms" component={SavedMain}/>
        //     <Stack.Screen name="DeviceContainer" component={DeviceScreen}
        //                   options={{
        //                       headerShown: false,
        //                       presentation: 'modal',
        //                       cardOverlayEnabled: false,
        //                       ...TransitionPresets.ModalPresentationIOS,
        //                   }}
        //     />
        // </Stack.Navigator>
        <SavedMain navigation={navigation} />


    )
}

export default Saved;


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#8da0e2',
    },
    container:{
        padding:25,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:30,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
        width:'100%',
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