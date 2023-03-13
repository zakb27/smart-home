import React, { useEffect, useState,useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet,ImageBackground, SafeAreaView, StatusBar,} from 'react-native';
import {sendInfo, checkSaved, performSave} from "../hooks/Database";
import Icon from "react-native-vector-icons/Ionicons"
import { RadialSlider } from 'react-native-radial-slider';
import Slider from '@react-native-community/slider';
import PinView from 'react-native-pin-view';

const LightDevice = ({data}) =>{
    const [percent,changePercent] = useState(data.value)
    const [isSaved,changeSaved] = useState(false)



    const handleSend =() => {
        const info = {
            id: data.id,
            value:percent,
            on:true,
        }
        sendInfo(info).then(response => {

        });
    }

    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }

    useEffect(()=>{
        checkSaved(data.id).then((item)=>{
            changeSaved(item.exists)
        })
    },[])


    return(

        <View style={styles.modalView}>
            <Text>{data.name}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                value={percent}
                onValueChange={changePercent}
                maximumValue={100}
                onSlidingComplete={handleSend}
                minimumTrackTintColor="#f4a261"
                maximumTrackTintColor="#e9c46a"
            />

            <Button onPress={handleSave} title={isSaved.toString()} />

        </View>
    )
}
const TemperatureDevice = ({data}) =>{
    const [speed, setSpeed] = useState(data.value);
    const [isSaved,changeSaved] = useState(false);


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

    useEffect(() => {
        const info = {
            id: data.id,
            on: true,
            value:speed
        }
        sendInfo(info).then(response => {
        });
    }, [speed]);



    return(

        <View style={styles.modalView}>
            <Text>{data.name}</Text>


            <RadialSlider value={speed}
                          subTitle={"Temperature"}
                          unit={'\u2103'}
                          min={14} max={25} onChange={setSpeed}
            />
            <Button onPress={handleSave} title={isSaved.toString()} />


        </View>
    )
}

const WashingDevice = ({data}) =>{


    return(

        <View>
            <Text>This is the machine of {data.name}</Text>
        </View>
    )
}
const DoorDevice = ({data}) =>{
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

        <View style={styles.modalView}>
            <Text>{data.name}</Text>
            <Button onPress={handleSave} title={isSaved.toString()} />
            <StatusBar barStyle="light-content" />
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
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
        </View>
    )
}

const DishDevice = ({data}) =>{


    return(

        <View>
            <Text>This is the dishwasher of {data.name}</Text>
        </View>
    )
}


const SpeakerDevice = ({data}) =>{
    return(

        <View>
            <Text>This is the speaker of {data.name}</Text>
        </View>
    )
}

const OtherDevice = ({data}) =>{
    return(

        <View>
            <Text>This is the other of {data.name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
    },
    dayButton:{
        margin:2,
        borderRadius:'50',
        padding: 5,
        borderWidth:1,
        flex:1,
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'blue',
        width:32,
        height:32,
        font:'black',
    },
    modalView: {
        paddingTop:50,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        alignSelf: "stretch",
        height:500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
    }
});


export {LightDevice,TemperatureDevice,OtherDevice,DishDevice,DoorDevice,SpeakerDevice,WashingDevice}

