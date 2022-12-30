import React,{useEffect,useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
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
        <View>
                {currentSearch.map((item,index)=>{
                    return(
                        <View key={index}>
                            <Text>{item.name}</Text>
                        </View>
                    )
                })}
        </View>
    )
}

export default PerformSearch
