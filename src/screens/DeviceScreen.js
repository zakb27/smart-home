import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import {DoorDevice, LightDevice,TemperatureDevice} from "../devices/Devices";
const DeviceScreen = ({modalVisible,setModalVisible,data}) =>{

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

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={() =>setModalVisible(!modalVisible)}>
                <View style={styles.centeredView} />
            </TouchableWithoutFeedback>
                    <View style={styles.modalView}
                    >
                        {renderSwitch()}
                    </View>
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