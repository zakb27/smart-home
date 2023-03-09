import React,{useEffect,useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, TouchableOpacity,ScrollView,View } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceScreen from "../screens/DeviceScreen";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack'

import {fetchDevices, getRegisteredDevices} from "../hooks/Database";
import RoomScreen from "../screens/RoomScreen";
import AllDeviceScreen from "../screens/AllDeviceScreen";
const PerformSearchHome = ({route,navigation})=>{
    const [currentSearch,performSearch] = useState([{name:''}]);
    const [devices,setDevices] = useState([]);

    const [value, setValue] = React.useState('');



    useEffect(() => {
        performSearch([])
        getRegisteredDevices().then((data)=>{
            setDevices(data)
        })
        for(let i=0;i<devices.length;i++){
            if(devices[i].name.toLowerCase().includes(value.toLowerCase()) ||
               devices[i].type.toLowerCase().includes(value.toLowerCase()))
            {
                    performSearch(current=>[...current,devices[i]])
            }
        }

    }, [value,navigation]);


    return(
        <View style={styles.fullContainer}>
            <Input
                value = {value}
                placeholder={'Find'}
                accessoryLeft={<Ionicons name={'search'} size={20} />}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <ScrollView contentContainerStyle={styles.container}>
                    {currentSearch.map((item,index)=>{
                        return(
                            <TouchableOpacity key={index} style={styles.card}
                                              onPress={() => {
                                                  navigation.navigate('DeviceContainer',{
                                                      data:item,
                                                  })
                                              }}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>
    )
}

const PerformSearch = () =>{


    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeRooms" component={PerformSearchHome}/>
            <Stack.Screen name="DeviceContainer" component={DeviceScreen}
                          options={{
                              headerShown: false,
                              presentation: 'modal',
                              cardOverlayEnabled: false,
                              ...TransitionPresets.ModalPresentationIOS,
                          }}
            />
        </Stack.Navigator>


    )

}

export default PerformSearch

const styles = StyleSheet.create({
    fullContainer:{
        padding:10,
        flex:1,
    },
    container:{
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center'
    },
    card: {
        width:150,
        height:150,
        padding:25,
        margin:10,
        backgroundColor:'white',
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    text:{
        color: '#2d4d68',
        fontSize:12,
    }


})