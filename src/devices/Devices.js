import React, { useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {sendInfo} from "../hooks/Database";
const LightDevice = ({data}) =>{

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
            <Button onPress={handleSend} title={"On/Off"} />

        </View>
    )
}
const TemperatureDevice = ({data}) =>{

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


    return(

        <View>
            <Text>This is the door of {data.name}</Text>
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