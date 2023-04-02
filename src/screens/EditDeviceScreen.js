import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import Modal from "react-native-modal";
import {fetchRooms, getRegisteredDevices} from "../hooks/Database";


const EditDeviceScreen = ({navigation}) =>{

    const [devices,setDevices] = useState([]);
    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);

    useEffect(()=>{

        const compareDevices = async() =>{
            getRegisteredDevices().then((data)=>{
                console.log(data);
                setDevices(data)
            })
        }
        compareDevices().then();

    },[navigation,isModal])

    return(

        <SafeAreaView style={styles.container}>
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
                <Text style={styles.mainTitle}>Edit Device</Text>
            </View>

            <ScrollView contentContainerStyle={styles.touchableContainer}>
                {devices.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.touchableItem}
                                          onPress={() => {
                                              changeInfo(item)
                                              openModal(true)
                                          }}
                        >
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
                <View style={styles.modalView}>
                    <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                        flex:1,
                        position:"absolute",
                        top:0,
                        left:0,
                        bottom:0,
                        borderRadius: 20,
                        right:0,
                    }}></LinearGradient>
                    <Text>Change name</Text>
                    <Text>{currentInfo.name}</Text>
                    <Text>Check devices off</Text>
                    <TouchableOpacity>
                        <Text>Submit changes</Text>
                    </TouchableOpacity>

                </View>
            </Modal>


        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
    touchableContainer:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    touchableItem:{
        backgroundColor:'#f4f3f4',
        width:100,
        height:50,
    },
    modalView: {
        paddingTop:50,
        position:"absolute",
        alignSelf: "stretch",
        bottom:-20,
        right:-20,
        left:-20,
        height:600,
        borderRadius:'20',
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
    },
})


export default EditDeviceScreen