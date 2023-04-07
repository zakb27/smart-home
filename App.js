import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OpeningScreen from './src/screens/OpeningScreen'
const Stack = createNativeStackNavigator();
import { onAuthStateChanged } from "firebase/auth";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {UserMain} from './src/pages/User'
import Home from './src/pages/Home'
import Search from './src/pages/Search'
import Add from './src/pages/Add'
import Saved from './src/pages/Saved'
import {auth} from "./firebase"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';
import { MenuProvider } from 'react-native-popup-menu';

const Authenticator = () =>{
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}}  name="Welcome" component={OpeningScreen} />
                <Stack.Screen options={{headerShown:false}}  name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown:false}}  name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Main = () =>{
    const Tabs = createBottomTabNavigator()

    return (
            <NavigationContainer >
                <Tabs.Navigator
                screenOptions ={({ route })=>({


                    tabBarIcon: ({focused,color,size})=>{
                        let iconName;
                        size=27
                        if(route.name==='Rooms'){
                            iconName=focused?'home'
                                : 'home-outline';
                        }
                        else if (route.name === 'Favourites') {
                            iconName = focused ? 'bookmark' : 'bookmark-outline';
                        }
                        else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';

                        }
                        else if (route.name === 'Add') {
                            iconName = focused ? 'add' : 'add-outline';
                            // size=40;
                        }
                        else if (route.name === 'User') {
                            iconName = focused ? 'person' : 'person-outline';

                        }

                        return <Ionicons name={iconName} size={size} color={color} />;

                    },
                    tabBarActiveTintColor: '#cdf4f0',
                    tabBarInactiveTintColor: '#cdf4f0',
                    headerShown:false,
                    // tabBarShowLabel: false,
                    tabBarStyle: { height: 80,
                        paddingTop:3,
                        backgroundColor: '#8da0e2',
                        borderTopWidth:0,
                    },
                })}
                >
                    <Tabs.Screen name={"Favourites"} component={Saved} />
                    <Tabs.Screen name={"Rooms"} component={Home} tabBarShowLabel={false} />
                    <Tabs.Screen name={"Search"} component={Search} />
                    {/*<Tabs.Screen name={"Add"} component={Add} />*/}
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
                <MenuProvider>
                <Main />
                </MenuProvider>
            </ApplicationProvider>
            )
    }

}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});