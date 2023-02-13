import React, { useEffect, useState,useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet,ImageBackground, SafeAreaView, StatusBar,} from 'react-native';
import {sendInfo} from "../hooks/Database";
import Icon from "react-native-vector-icons/Ionicons"
import { RadialSlider } from 'react-native-radial-slider';
import Slider from '@react-native-community/slider';
import PinView from 'react-native-pin-view';
const LightDevice = ({data}) =>{
    const [percent,changePercent] = useState(0)
    const handleSend =() => {
        const info = {
            id: data.id,
            status: 1,
            type:data.type,
            value:50
        }
        sendInfo(info).then(response => {
            console.log(response)
        });
    }

    return(

        <View>
            <Text>This is light of {data.name}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                value={percent}
                onValueChange={changePercent}
                maximumValue={100}
                minimumTrackTintColor="#f4a261"
                maximumTrackTintColor="#e9c46a"
            />

            <Button onPress={handleSend} title={"On/Off"} />

        </View>
    )
}
const TemperatureDevice = ({data}) =>{
    const [speed, setSpeed] = useState(0);


    const handleSend =() => {
        const info = {
            id: data.id,
            status: 1,
            type:data.type,
            value:50
        }
        sendInfo(info).then(response => {
            console.log(response)
        });
    }
    return(

        <View>
            <Text>This is temperature of {data.name}</Text>


            <RadialSlider value={speed}
                          subTitle={"Temperature"}
                          unit={'\u2103'}
                          min={14} max={25} onChange={setSpeed} />

            <Button onPress={handleSend} title={"On/Off"} />

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

        <View>
            <Text>This is the door of {data.name}</Text>

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


export {LightDevice,TemperatureDevice,OtherDevice,DishDevice,DoorDevice,SpeakerDevice,WashingDevice}