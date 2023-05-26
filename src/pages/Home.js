import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet,
    RefreshControl, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RoomScreen from "../screens/RoomScreen";
import AllDeviceScreen from "../screens/AllDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack'
import {fetchRooms, getAvgTemp, getMachineProgress, getRegisteredDevices, getSaved, sendInfo} from "../hooks/Database";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path,G } from "react-native-svg"
import DeviceScreen from "../screens/DeviceScreen";
import GetRoomImage from '../components/GetRoomImage'
import Ionicons from "react-native-vector-icons/Ionicons";
import AddRoomScreen from "../screens/AddRoomScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import EditRoomScreen from "../screens/EditRoomScreen";
import EditDeviceScreen from "../screens/EditDeviceScreen";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import GetProductImage from "../components/GetProductImage";
const HomeRooms = ({navigation}) =>{
    const [currentRooms,setRooms] = useState([])
    const [appIsReady, setAppIsReady] = useState(false);
    const [currentDevices,setDevices] = useState('')
    const [ind,showInd] = useState(true)


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(()=>{
        const test =  navigation.addListener('focus', () => {
            fetchRooms().then((data)=>{
                setRooms(data)
            })
            getRegisteredDevices().then((data)=>{
                setDevices(data)
                showInd(false)
            })
        });
        fetchRooms().then((data)=>{
            setRooms(data)
        })
        getRegisteredDevices().then((data)=>{
            setDevices(data)
            showInd(false)
        })

        return test
    },[navigation])



    return(
        <SafeAreaView style={styles.overall}>

            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>

            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>Rooms</Text>

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

            {!ind
                ?
                <>
                <ScrollView contentContainerStyle={styles.container} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {currentRooms.length>0?
                        <>
                    {currentRooms.map((item)=>{
                        return(
                            <TouchableOpacity key={item.id} style={styles.card}
                                              onPress={() => {
                                                  navigation.navigate('RoomDevice',
                                                      {
                                                          roomID:item.id,
                                                          roomName:item.name,
                                                      })
                                              }}
                            >
                                <View style={{ aspectRatio: 1,
                                    height:45,
                                    position:"absolute",
                                    top:10,
                                    left:10,
                                }}>
                                    <GetRoomImage type={item.type} />
                                </View>
                                <TouchableOpacity style={styles.on} onPress={() => {
                                    navigation.navigate('RoomDevice',
                                        {
                                            roomID:item.id,
                                            roomName:item.name,
                                        })
                                }}>
                                    <Ionicons name={'open-outline'} size={17} color={'#1e1d1d'} />
                                </TouchableOpacity>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.textsmaller}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
                                {item.devices&&(<Text style={styles.textTiny}>{item.devices.length} devices synced</Text>)}
                            </TouchableOpacity>
                        )
                    })}
                        </>
                        :
                        <><Text style={styles.openingText}>To get started click on the + icon</Text></>
                    }
                </ScrollView>
                </>
                :
                <ActivityIndicator size="large" color="#8DA0E2" />

            }

        </SafeAreaView>


    )
}

// SplashScreen.preventAutoHideAsync();
const Home = ()=>{
    // Navigation overview for different pages for room screens
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                styles:{backgroundColor:"yellow"}
            }}

        >
            <Stack.Screen name="HomeRooms" component={HomeRooms} />
            <Stack.Screen name="RoomDevice" component={RoomScreen} />
            <Stack.Screen name="AddRoom" component={AddRoomScreen}/>
            <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
            <Stack.Screen name="EditRoom" component={EditRoomScreen} />
            <Stack.Screen name="EditDevice" component={EditDeviceScreen} />
        </Stack.Navigator>
    )
}

export default Home;


const styles = StyleSheet.create({
    overall:{
        flex:1,
        // alignItems:"center",
        backgroundColor:'#8da0e2',

    },
    openingText:{
        color:'#8da0e2',
        fontSize:16,
        fontWeight:'600',
        padding:20,
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
        paddingHorizontal:35,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '500',
    },

    container:{
        paddingVertical:25,
        paddingHorizontal:5,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
    },

    card: {
        width:150,
        height:125,
        padding:5,
        paddingBottom:25,
        marginHorizontal:10,
        marginVertical:8,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:18,
        alignItems: 'flex-start',
        justifyContent:'flex-end',
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
