import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AddRoomScreen from "../screens/AddRoomScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
import {LinearGradient} from "expo-linear-gradient";
import EditRoomScreen from "../screens/EditRoomScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import EditDeviceScreen from "../screens/EditDeviceScreen";
const Stack = createStackNavigator();


const AddHome = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <Text style={styles.mainTitle}>Sync</Text>
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
            <TouchableOpacity style={styles.card}
                              onPress={() => {
                                  navigation.navigate('EditRoom')
                              }}
            >
                <Text style={styles.text}>Edit Room</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}
                              onPress={() => {
                                  navigation.navigate('EditDevice')
                              }}
            >
                <Text style={styles.text}>Edit Device</Text>
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
                <Stack.Screen name="EditRoom" component={EditRoomScreen} />
                <Stack.Screen name="EditDevice" component={EditDeviceScreen} />
            </Stack.Navigator>


        )
}



const styles = StyleSheet.create({

    container:{
        padding:25,
        backgroundColor:'#8da0e2',
        flex:1,
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        justifyContent:'center',
    },
    mainTitle:{
        color:'#8da0e2',
        fontSize:40,
        paddingHorizontal:30,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
        width:'100%',
    },
    card: {
        width:150,
        height:180,
        padding:25,
        margin:10,
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:8,
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    text: {
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 15,
    },

})



export default Add;