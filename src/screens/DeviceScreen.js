import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import {DoorDevice, LightDevice,TemperatureDevice} from "../devices/Devices";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleScreen from "./ScheduleScreen";
const Tab = createMaterialTopTabNavigator();



const DeviceScreen = ({modalVisible,setModalVisible,data}) =>{

    const [currentID,changeID] = useState(data.id)

    const renderSwitch=()=>{
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

    const RenderDevice = () =>{
        return(
            <View style={styles.modalView}>
                {renderSwitch()}
            </View>
        )
    }

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() =>setModalVisible(!modalVisible)}>
                <View style={styles.centeredView} />
            </TouchableWithoutFeedback>
            <ScheduleScreen />
            {/*<Tab.Navigator screenOptions={{*/}
            {/*    tabBarStyle: styles.tabView,*/}
            {/*}}>*/}

            {/*    <Tab.Screen name="Device" component={RenderDevice} />*/}
            {/*    <Tab.Screen name="Schedule" component={ScheduleScreen} />*/}
            {/*</Tab.Navigator>*/}
        </Modal>
    )
}






export default DeviceScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom:84,
    },
    tabView: {
        // flex:1,
        // marginBottom:84,
        // bottom:0,
        // right:0,
        // left:0,
    },
    modalView: {
        marginTop:200,
        marginBottom:84,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        flex:1,
        alignSelf: "stretch",
        height:500,
        backgroundColor: "white",
        borderRadius: 20,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        padding: 35,
        alignItems: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});