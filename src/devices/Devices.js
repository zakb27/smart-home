import React, { useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet} from 'react-native';

const LightDevice = ({data}) =>{


    return(

        <View>
            <Text>This is the light of {data.name}</Text>
        </View>
    )
}
const TemperatureDevice = ({data}) =>{

    return(

        <View>
            <Text>This is the temp of {data.name}</Text>
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