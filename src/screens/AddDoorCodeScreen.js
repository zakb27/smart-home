import React, {useEffect, useRef, useState} from "react";
import {checkSaved, performSave} from "../hooks/Database";
import {StatusBar, StyleSheet, TouchableOpacity, View, SafeAreaView, Text} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import PinView from "react-native-pin-view";
import Icon from "react-native-vector-icons/Ionicons";

const AddDoorCodeScreen = ({navigation}) =>{
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
        if(enteredPin==='4422'){
            alert('correct');
        }
    }, [enteredPin])


    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }

    useEffect(()=>{
        checkSaved(data.id).then((data)=>{
            changeSaved(data.exists)
        })
    },[])

    return(

        <SafeAreaView style={styles.container}>

            <LinearGradient colors={['#cdf4f0','#c3d0f3', '#7590db']} style={{
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
                <Text style={styles.mainTitle}>Change email</Text>
            </View>

            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.goBackTouch}>
                    {isSaved ?
                        <Ionicons name={'bookmark'} size={35} color={'#7590db'} />
                        :
                        <Ionicons name={"bookmark-outline"} size={35} color={'#7590db'} />
                    }
                </TouchableOpacity>
            </View>

            <StatusBar barStyle="light-content" />

            <View
                style={styles.doorStyle}>
                <PinView
                    inputSize={36}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={70}
                    onValueChange={value => setEnteredPin(value)}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#201d50",
                        backgroundColor:'#364386'
                    }}
                    activeOpacity={0.6}

                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#8f3636",
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#c95555",
                    }}
                    buttonTextStyle={{
                        color: "#66bdcc",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            alert("Entered Pin: " + enteredPin)
                        }
                    }}
                    customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#364386"} /> : undefined}
                    customRightButton={showCompletedButton ? <Icon name={"pizza"} size={36} color={"#364386"} /> : undefined}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddDoorCodeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    userContainer: {
        flex: 1,
        alignItems: 'center',
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