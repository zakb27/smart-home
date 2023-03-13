import React,{useEffect,useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, TouchableOpacity,ScrollView,View,SafeAreaView } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceScreen from "../screens/DeviceScreen";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack'

import {fetchDevices, getRegisteredDevices} from "../hooks/Database";
import RoomScreen from "../screens/RoomScreen";
import AllDeviceScreen from "../screens/AllDeviceScreen";
import {LinearGradient} from "expo-linear-gradient";
import GetProductImage from "./GetProductImage";
const PerformSearchHome = ({route,navigation})=>{
    const [currentSearch,performSearch] = useState([{name:''}]);
    const [devices,setDevices] = useState([]);

    const [value, setValue] = React.useState('');



    useEffect(() => {
        performSearch([])
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
        for(let i=0;i<devices.length;i++){
            if(devices[i].name.toLowerCase().includes(value.toLowerCase()) ||
               devices[i].type.toLowerCase().includes(value.toLowerCase()))
            {
                    performSearch(current=>[...current,devices[i]])
            }
        }

    }, [value,navigation]);


    return(
        <SafeAreaView style={styles.fullContainer}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <Text style={styles.mainTitle}>Search</Text>
            <Input
                value = {value}
                style={styles.searchBar}
                placeholder={'Find'}
                accessoryLeft={<Ionicons name={'search'} size={20} />}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <ScrollView contentContainerStyle={styles.container}>
                    {currentSearch.map((item,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.card}
                                              onPress={() => {
                                                  navigation.navigate('DeviceContainer',{
                                                      data:item,
                                                  })
                                              }}
                            >
                                <GetProductImage type ={item.type} />
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </SafeAreaView>
    )
}

const PerformSearch = () =>{


    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeRooms" component={PerformSearchHome}/>
            <Stack.Screen name="DeviceContainer" component={DeviceScreen}
                          options={{
                              headerShown: false,
                              presentation: 'modal',
                              cardOverlayEnabled: false,
                              ...TransitionPresets.ModalPresentationIOS,
                          }}
            />
        </Stack.Navigator>


    )

}

export default PerformSearch

const styles = StyleSheet.create({
    fullContainer:{
        padding:10,
        backgroundColor:'#8da0e2',
        flex:1,
        alignItems:'center'
    },
    searchBar:{
        width:'90%',
        backgroundColor:'rgba(255,255,255,0.8)',
    },
    container:{
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center'
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