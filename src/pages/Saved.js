import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getSaved} from "../hooks/Database";
import DeviceScreen from "../screens/DeviceScreen";
import {TransitionPresets} from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const SavedMain = ({navigation})=>{
    const [devices,setDevices] = useState([]);



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
    }, [navigation]);

    return(
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                {devices.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.card}
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

        </SafeAreaView>


    )
}

const Saved = ()=>{

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeRooms" component={SavedMain}/>
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

export default Saved;


const styles = StyleSheet.create({
    container:{
        padding:25,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
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