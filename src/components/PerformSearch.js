import React,{useEffect,useState} from 'react';
import { TouchableWithoutFeedback, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceScreen from "../screens/DeviceScreen";
import {fetchDevices, getRegisteredDevices} from "../hooks/Database";
const PerformSearch = ({value,navigation})=>{
    const [currentSearch,performSearch] = useState([{name:''}]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setData] = useState('');
    const [devices,setDevices] = useState([]);




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

    }, [value,navigation,modalVisible]);


    return(
        <ScrollView contentContainerStyle={styles.container}>
                {currentSearch.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.card}
                                          onPress={() => {
                                              setData(item);
                                              setModalVisible(true)
                                          }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            <DeviceScreen modalVisible = {modalVisible} setModalVisible = {setModalVisible}
            data={selectedData}
            />
        </ScrollView>
    )
}

export default PerformSearch

const styles = StyleSheet.create({
    container:{
        padding:25,
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