import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'

const DeviceScreen = ({modalVisible,setModalVisible}) =>{


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
            <View style={styles.centeredView}
                  onPress={() => {setModalVisible(false)}}
            >
                <View style={styles.modalView}
                >
                    <Text style={styles.modalText}>Hello World!</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom:85,
    },
    modalView: {
        marginTop:200,
        flex:1,
        alignSelf: "stretch",
        height:500,
        backgroundColor: "white",
        borderRadius: 20,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
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