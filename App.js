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
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';

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
                <Tabs.Navigator
                screenOptions ={({ route })=>({
                    tabBarIcon: ({focused,color,size})=>{
                        let iconName;
                        size=27
                        if(route.name==='Home'){
                            iconName=focused?'home'
                                : 'home-outline';
                        }
                        else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';

                        }
                        else if (route.name === 'Add') {
                            iconName = focused ? 'add' : 'add-outline';
                            size=40;
                        }
                        else if (route.name === 'User') {
                            iconName = focused ? 'person' : 'person-outline';

                        }

                        return <Ionicons name={iconName} size={size} color={color} />;

                    },
                    tabBarActiveTintColor: '#2d4d68',
                    tabBarInactiveTintColor: 'gray',
                    tabBarShowLabel: false,
                    tabBarStyle: { height: 85 },
                })}
                >
                    <Tabs.Screen name={"Home"} component={Home} tabBarShowLabel={false} />
                    <Tabs.Screen name={"Search"} component={Search} />
                    <Tabs.Screen name={"Add"} component={Add} />
                    <Tabs.Screen name={"Settings"} component={Settings} />
                    <Tabs.Screen name={"User"} component={UserMain} />
                </Tabs.Navigator>
            </NavigationContainer>
        );
}

const App = ()=> {

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
        return(
            <ApplicationProvider {...eva} theme={eva.light}>
                <Authenticator />
            </ApplicationProvider>
            )
    }
    else{
        return(
            <ApplicationProvider {...eva} theme={eva.light}>
                <Main />
            </ApplicationProvider>
            )
    }

}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});