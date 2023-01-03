import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'

const RoomScreen = ({route,navigation}) =>{
    const { roomID } = route.params;
    const [currentSearch,performSearch] = useState([]);


    useEffect(() => {
        performSearch([])

        for(let i=0;i<devices.devices.length;i++){
            if(devices.devices[i].parent==roomID)
            {
                performSearch(current=>[...current,devices.devices[i]])
            }
        }
        console.log(currentSearch)
    },[route]);


    return(
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                {currentSearch.map((item,index)=>{
                    return(
                        <View key={index} style={styles.card}>
                            <Text>{item.name}</Text>
                        </View>
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
    },
    text:{
        color: '#2d4d68',
        fontSize:12,
    }


})