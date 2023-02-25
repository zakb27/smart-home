import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AddRoomScreen from "../screens/AddRoomScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


const AddHome = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.card}
                              onPress={() => {
                                  navigation.navigate('AddRoom')
                              }}
            >
                <Text style={styles.text}>Add Room</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}
                              onPress={() => {
                                  navigation.navigate('AddDevice')
                              }}
            >
                <Text style={styles.text}>Add Device</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const Add = ()=>{
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="AddHome" component={AddHome} />
                <Stack.Screen name="AddRoom" component={AddRoomScreen}/>
                <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
            </Stack.Navigator>


        )
}



const styles = StyleSheet.create({

    container:{
        padding:25,
        minHeight:300,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
    },
    cardConnected:{
        marginTop:25,
        width:330,
        height:100,
        backgroundColor:'#2d4d68',
        color:"White",
        padding:25,
        borderRadius:10,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },

    card: {
        width:150,
        height:150,
        padding:25,
        margin:10,
        backgroundColor:'white',
        borderRadius:8,
        alignItems: 'center',
        justifyContent:'center',
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
        fontSize:20,
        textAlign:'center'
    },
    text2:{
        color:'white'
    }
})



export default Add;