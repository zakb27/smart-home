import React,{useEffect,useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, View,ScrollView } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import rooms from '../utils/rooms.json'
import devices from '../utils/devices.json'


const PerformSearch = ({value})=>{
    const [currentSearch,performSearch] = useState([{name:''}]);

    useEffect(() => {
        performSearch([])
        for(let i=0;i<rooms.rooms.length;i++){
            if(rooms.rooms[i].name.toLowerCase().includes(value.toLowerCase()))
            {
                performSearch(current=>[...current,rooms.rooms[i]])
            }
        }
        for(let i=0;i<devices.devices.length;i++){
            if(devices.devices[i].name.toLowerCase().includes(value.toLowerCase()) ||
               devices.devices[i].type.toLowerCase().includes(value.toLowerCase()))
            {
                    performSearch(current=>[...current,devices.devices[i]])
            }
        }


    }, [value]);


    return(
        <ScrollView contentContainerStyle={styles.container}>
                {currentSearch.map((item,index)=>{
                    return(
                        <View key={index} style={styles.card}>
                            <Text>{item.name}</Text>
                        </View>
                    )
                })}
        </ScrollView>
    )
}

export default PerformSearch

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