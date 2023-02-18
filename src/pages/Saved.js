import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getSaved} from "../hooks/Database";
import DeviceScreen from "../screens/DeviceScreen";

const Saved = ({navigation})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setData] = useState('');
    const [devices,setDevices] = useState([]);
    useEffect(() => {
        const test =  navigation.addListener('focus', () => {
            getSaved().then((data) => {
                setDevices(data);
            })
        });
        getSaved().then((data) => {
            setDevices(data);
        })
        return test;
    }, [navigation,modalVisible]);

    return(
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                {devices.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} style={styles.card}
                                          onPress={() => {
                                              setData(item);
                                              setModalVisible(true)
                                          }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <DeviceScreen modalVisible = {modalVisible} setModalVisible = {setModalVisible} data={selectedData} />

        </SafeAreaView>


    )
}

export default Saved;


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