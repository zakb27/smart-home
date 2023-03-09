import React, { useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet} from 'react-native';

import DeviceScreen from "./DeviceScreen";
import {fetchDevices, fetchRooms, getRoomDevices, getSaved} from "../hooks/Database";
const RoomScreen = ({route,navigation}) =>{
    const { roomID } = route.params;
    const [currentSearch,performSearch] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const test =  navigation.addListener('focus', () => {
            getRoomDevices(roomID).then((data)=>{
                performSearch(data)
            })
        });
        getRoomDevices(roomID).then((data)=>{
            performSearch(data)
        })
        return test;
    }, [navigation,modalVisible]);

    return(
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                {currentSearch.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
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
            <Button title="<" onPress={() => navigation.goBack()} />
        </View>
    )

}
export default RoomScreen;


const styles = StyleSheet.create({
    container:{
        padding:25,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center'
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