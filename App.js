import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
const Stack = createNativeStackNavigator();
import { onAuthStateChanged } from "firebase/auth";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {UserMain} from './src/pages/User'
import Home from './src/pages/Home'
import Search from './src/pages/Search'
import Add from './src/pages/Add'
import Settings from './src/pages/Settings'
import {auth} from "./firebase"
const Authenticator = () =>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}}  name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown:false}}  name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Main = () =>{
    const Tabs = createBottomTabNavigator()

    return (
            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen name={"Home"} component={Home} options={{ title: 'My home' }} />
                    <Tabs.Screen name={"Search"} component={Search} />
                    <Tabs.Screen name={"Add"} component={Add} />
                    <Tabs.Screen name={"User"} component={UserMain} />
                    <Tabs.Screen name={"Settings"} component={Settings} />
                </Tabs.Navigator>
            </NavigationContainer>
        );
}

export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const thing =  onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true)
            }
            else{
                setIsSignedIn(false)
            }
            return thing;
        }
        );


    }, []);

    if(!isSignedIn){
        return(<Authenticator />)
        // return(<View><Text>Yhooho</Text></View>)
    }
    else{
        return(<Main />)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});