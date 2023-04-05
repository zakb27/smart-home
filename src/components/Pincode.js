import React, {useEffect, useRef, useState} from "react";
import {checkSaved, performSave} from "../hooks/Database";
import {StatusBar, StyleSheet, TouchableOpacity, View, SafeAreaView, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import PinView from "react-native-pin-view";
import Icon from "react-native-vector-icons/Ionicons";

const Pincode = ({openModal, setPin}) =>{
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    const [isSaved,changeSaved] = useState(false);

    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            setShowCompletedButton(true)
        } else {
            setShowCompletedButton(false)
        }
    }, [enteredPin])




    return(

        <View style={styles.container}>

            {/*<LinearGradient colors={['#cdf4f0','#c3d0f3', '#7590db']} style={{*/}
            {/*    flex:1,*/}
            {/*    position:"absolute",*/}
            {/*    top:0,*/}
            {/*    left:0,*/}
            {/*    bottom:0,*/}
            {/*    right:0,*/}
            {/*}}></LinearGradient>*/}

            <StatusBar barStyle="light-content" />
            <View style={styles.doorStyle}>
                <PinView
                    inputSize={46}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={70}
                    onValueChange={value => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginHorizontal: 30,
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#8DA0E2",
                        backgroundColor:'rgba(141,160,226,0.6)',
                    }}
                    activeOpacity={0.6}

                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.10)",
                        marginHorizontal: 10,

                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#8DA0E2",
                        marginHorizontal: 10,
                    }}
                    buttonTextStyle={{
                        color: "#131313",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            // alert("Entered Pin: " + enteredPin)
                            setPin(enteredPin)
                            openModal(false)
                        }
                    }}
                    customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={46} color={"#8DA0E2"} /> : undefined}
                    customRightButton={showCompletedButton ? <Icon name={"checkmark-circle"} size={46} color={"#8DA0E2"} /> : undefined}
                />
            </View>
        </View>
    )
}

export default Pincode

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:50,
        borderRadius:40,
        zIndex:100,
        backgroundColor:'rgba(255,255,255,0.68)'
    },
    userContainer: {
        flex: 1,
        alignItems: 'flex-end',
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
        paddingHorizontal:30,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
    },

    detailsContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:20,

    },

    nameContainer:{
        flexDirection:"row",
    },
    name:{
        fontSize:30,
        marginRight:5,
        paddingBottom:10,
    },

    profileContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:40,
        paddingBottom:100,

    },
    profilePresser:{

        flexDirection:"row",
        justifyContent:'space-between',
        width:'90%',
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,0.9)',
    },
    image:{
        borderRadius:'50%',
        width:100,
        height:100,
    },
    changeContainer:{
        height:'30%',
        width:'55%',
        backgroundColor:'rgba(255,255,255,0.9)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,

    },
    button: {
        backgroundColor: 'rgba(255,255,255,0)',
        width: '100%',
        height:'33%',
        padding: 15,
        margin:0,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        textAlign:'right',

    },
    buttonText: {
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 16,
    },
})