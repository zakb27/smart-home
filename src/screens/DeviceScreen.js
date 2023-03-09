import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import {DoorDevice, LightDevice,TemperatureDevice} from "../devices/Devices";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewScheduleScreen from "./ViewScheduleScreen";
const Tab = createMaterialTopTabNavigator();

// const renderSwitch = ()=>{
//     switch(data.type){
//         case "light":
//             return <LightDevice data={data} />
//         case "temp":
//             return <TemperatureDevice data={data} />
//         case "door":
//             return <DoorDevice data={data} />
//         default:
//             return <Text>Error</Text>
//     }
// }

const DeviceScreen = ({route,navigation}) =>{
    const {data} = route.params;
    const [currentID,changeID] = useState(data.id)

    const RenderSwitch=()=>{
        switch(data.type){
            case "light":
                return <LightDevice data={data} />
            case "temp":
                return <TemperatureDevice data={data} />
            case "door":
                return <DoorDevice data={data} />
            default:
                return <Text>Error</Text>
        }
    }


    return(
        <View
            style={styles.modalView}
        >

            <View style={styles.centeredView} />
                <Tab.Navigator style={styles.tabView} screenOptions={{
                    swipeEnabled:false,
                }}>
                    <Tab.Screen name="Device" component={RenderSwitch} />
                    <Tab.Screen name="Schedule" component={ViewScheduleScreen} initialParams={{data: data}} />
                </Tab.Navigator>

        </View>
    )
}

export default DeviceScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom:84,
    },
    tabView: {
        height:500,
        marginBottom:84,
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        borderRadius: 20,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
    },
    modalView: {
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        flex:1,
        alignSelf: "stretch",
        backgroundColor: "white",

        padding: 35,
        alignItems: "center",
    },
});