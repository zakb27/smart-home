import React,{useEffect,useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, View, RefreshControl} from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceScreen from "../screens/DeviceScreen";

import {getRegisteredDevices, sendInfo} from "../hooks/Database";
import {LinearGradient} from "expo-linear-gradient";
import GetProductImage from "./GetProductImage";
import Modal from "react-native-modal";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
const PerformSearchHome = ({navigation})=>{
    const [currentSearch,performSearch] = useState([{name:''}]);
    const [devices,setDevices] = useState([]);
    const [isModal,openModal] = useState(false);
    const [currentInfo,changeInfo] = useState([]);
    const [value, setValue] = React.useState('');
    const [reRender,changeRender] = useState(false)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        console.log('here!@')
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

    }, [value,navigation,isModal,reRender]);


    return(
        <SafeAreaView style={styles.fullContainer}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>

            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Search</Text>

                <Menu onSelect={value => navigation.navigate(`${value}`)}>
                    <MenuTrigger customStyles={triggerStyles} children={<Ionicons  name={'add'} size={50} color={'#8DA0E2'} />} />
                    <MenuOptions customStyles={optionsStyles}>
                        <MenuOption value={'AddRoom'} text='Add Room' customStyles={optionsStyles} />
                        <MenuOption value={'AddDevice'} text='Add Device' customStyles={optionsStyles} />
                        <MenuOption value={'EditRoom'} text='Edit Room' customStyles={optionsStyles} />
                        <MenuOption value={'EditDevice'} text='Edit Device' customStyles={optionsStyles} />
                    </MenuOptions>
                </Menu>
            </View>
            <Input
                value = {value}
                style={styles.searchBar}
                placeholder={'Find'}
                accessoryLeft={<Ionicons name={'search'} size={20} />}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <ScrollView contentContainerStyle={styles.container} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {currentSearch.map((item,index)=>{
                    let thing='Other'
                    let ifOn=''
                    let icon='power'
                    switch(item.type){
                        case('temp'):
                            thing="Set Temperature"
                            ifOn=item.value.toString() + '\u00B0C'
                            icon='open-outline'
                            break
                        case('light'):
                            thing="Light"
                            if(item.value>0){
                                ifOn='On'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('door'):
                            thing="Door Control"
                            icon='open-outline'
                            if(item.value>0){
                                ifOn='Open'
                            }
                            else{
                                ifOn='Locked'
                            }
                            break
                        case('speaker'):
                            thing="Speaker"

                            if(item.value>0){
                                ifOn='On'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('washer'):
                            thing="Washing machine"
                            icon='open-outline'
                            if(item.time>0){
                                ifOn=item.time.toString()+ ' mins left at '+ item.value.toString() +'°C'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        case('dishwasher'):
                            thing="Dish Washer"
                            icon='open-outline'
                            if(item.time>0){
                                ifOn=item.time.toString()+ ' mins left at '+ item.value.toString() +'°C'
                            }
                            else{
                                ifOn='Off'
                            }
                            break
                        default:
                            thing='other'
                            break
                    }
                    return(
                        <TouchableOpacity key={index} style={styles.card}
                                          onPress={() => {
                                              changeInfo(item)
                                              openModal(true)
                                          }}
                        >
                            <View style={{ aspectRatio: 1,
                                height:35,
                                position:"absolute",
                                top:10,
                                left:10,
                            }}>
                                <GetProductImage type ={item.type} />
                            </View>

                            <TouchableOpacity style={styles.on} onPress={e=> {
                                if (icon === 'power') {

                                    let percent =100
                                    if(ifOn==='On'){
                                        percent=0
                                        ifOn='Off'
                                    }
                                    else{
                                        ifOn='On'
                                    }
                                    const info = {
                                        id: item.id,
                                        value:percent,
                                    }
                                    sendInfo(info).then(response => {
                                    });

                                }
                                if (icon ==='open-outline') {
                                    changeInfo(item)
                                    openModal(true)
                                }
                                changeRender(!reRender)
                            }}>
                                <Ionicons name={icon} size={17} color={'#1e1d1d'} />
                            </TouchableOpacity>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.textsmaller}>{thing}</Text>
                            <Text style={styles.textTiny}>{ifOn}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Modal isVisible={isModal}
                   onSwipeComplete={() => openModal(false)}
                   swipeDirection="down"
                   onBackdropPress={() => openModal(false)}
            >
                <DeviceScreen data={currentInfo}/>
            </Modal>
        </SafeAreaView>
    )
}

const PerformSearch = (navigation) =>{


    return(
        <PerformSearchHome navigation={navigation}/>

    )

}

export default PerformSearch

const styles = StyleSheet.create({
    fullContainer:{
        padding:10,
        backgroundColor:'#8da0e2',
        flex:1,
        alignItems:'center'
    },
    searchBar:{
        marginTop:15,
        borderRadius:20,
        width:'90%',
        backgroundColor:'rgba(255,255,255,0.9)',
        marginBottom:5,
    },
    container:{
        paddingVertical:25,
        paddingHorizontal:5,
        marginHorizontal:5,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'flex-start',
    },
    titleContainer:{
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        flexDirection:"row",
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:25,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '500',
    },
    card: {
        width:165,
        height:115,
        padding:5,
        paddingBottom:25,
        marginHorizontal:10,
        marginVertical:7,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        alignItems: 'flex-start',
        justifyContent:'flex-end',


    },
    goOn:{
        position:"absolute",
        padding:7,
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        top:7,
        right:7,
    },
    text: {
        marginBottom:5,
        marginLeft:5,
        color: '#1e1d1d',
        fontWeight: '400',
        fontSize: 13,

    },
    textsmaller:{
        // marginBottom:15,
        marginLeft:5,
        color: '#494848',
        fontWeight: '400',
        fontSize: 10,
    },
    textTiny:{
        position:'absolute',
        bottom:10,
        left:5,
        marginLeft:5,
        color: '#737272',
        fontWeight: '400',
        fontSize: 9,
    },
    on:{
        borderRadius:150,
        padding:7,
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        position:"absolute",
        top:7,
        right:7,
        backgroundColor:'#f5f5f5'
    },



})


const optionsStyles = {
    optionsContainer: {
        marginTop:50,
        marginRight:60,
        borderRadius:25,
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 5,
    },
    optionsWrapper: {
        backgroundColor: 'rgba(255,255,255,0.0)',
    },
    optionWrapper: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        margin: 10,
    },
    optionTouchable: {
        underlayColor: 'rgba(255,255,255,0.0)',
    },
    optionText: {
        color: '#8da0e2',
        fontWeight: '600',
        fontSize: 16,
    },
};

const triggerStyles = {

    triggerOuterWrapper: {
        padding: 5,
        marginRight:25,
        marginTop:-10,
        width:50,
        height:50,
    },
    triggerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width:50,
        height:50,
    },
    triggerTouchable: {
        style : {
            width:0,
            height:0,
        },
    },
};
