import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import {DishDevice, DoorDevice, LightDevice, SpeakerDevice, TemperatureDevice, WashingDevice} from "../devices/Devices";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewScheduleScreen from "./ViewScheduleScreen";
import {LinearGradient} from "expo-linear-gradient";
import ScheduleScreen from "./ScheduleScreen";
const Tab = createMaterialTopTabNavigator();

const DeviceScreen = (info) =>{
    // const {data} = route.params;
    const data=info.data;

    const RenderSwitch=()=>{
        switch(data.type){
            case "light":
                return <LightDevice data={data} />
            case "temp":
                return <TemperatureDevice data={data} />
            case "speaker":
                return <SpeakerDevice data={data} />
            case "door":
                return <DoorDevice data={data} />
            case "washer":
                return <WashingDevice data={data} />
            case "dishwasher":
                return <WashingDevice data={data} />
            default:
                return <Text>Error</Text>
        }
    }

    if(data.type==='light' || data.type==='temp'){
        return(
            <View
                style={styles.modalView}
            >

                <Tab.Navigator style={styles.tabView} screenOptions={{
                    swipeEnabled:false,
                    tabBarStyle:{
                        backgroundColor:'#cbeef0',

                    },
                }}>
                    <Tab.Screen name="Device" component={RenderSwitch}  />
                    <Tab.Screen name="Schedule" component={ViewScheduleScreen} initialParams={{data: data}} />
                    <Tab.Screen name="Create" component={ScheduleScreen} initialParams={{data: data}} />
                </Tab.Navigator>

            </View>
        )
    }

    else{
        return(
            <View
                style={styles.modalView}
            >

                <Tab.Navigator style={styles.tabView} screenOptions={{
                    swipeEnabled:false,
                    borderWidth: 0,
                    tabBarStyle: { backgroundColor: '#cbeef0',borderWidth: 0, zIndex:0, },
                    tabBarIndicatorStyle: { backgroundColor: '#cbeef0' },
                    tabBarShowLabel: false,
                }}>
                    <Tab.Screen name="Device" component={RenderSwitch} />
                </Tab.Navigator>

            </View>
        )
    }


}

export default DeviceScreen;

const styles = StyleSheet.create({
    normalView:{

        // marginBottom:84,
        position:"absolute",
        alignSelf: "stretch",
        alignItems: "center",

        bottom:-20,
        right:0,
        left:0,
        borderRadius: 20,
        // borderBottomLeftRadius:0,
        // borderBottomRightRadius:0,
    },
    tabView: {
        height:600,
        // marginBottom:84,
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        borderRadius: 20,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
    },
    modalView: {
        bottom:-20,
        right:-20,
        left:-20,
        position:"absolute",
        // flex:1,
        alignSelf: "stretch",
        // padding: 35,
        alignItems: "center",
    },
});