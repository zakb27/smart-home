import React,{useState,useEffect} from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {UserMain, SignIn, CreateAccount} from './src/pages/User'
import Home from './src/pages/Home'
import Search from './src/pages/Search'
import Add from './src/pages/Add'
import Settings from './src/pages/Settings'

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
//
// const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

// const firebaseConfig = {
//     apiKey: "AIzaSyBTyXi7xD19kg3p-sqRHph-g_zUoSsoAKA",
//     authDomain: "smart-home-81ebd.firebaseapp.com",
//     projectId: "smart-home-81ebd",
//     storageBucket: "smart-home-81ebd.appspot.com",
//     messagingSenderId: "304145939648",
//     appId: "1:304145939648:web:e4f63f7a0e160e070e8125",
//     measurementId: "G-EDC747VQHF"
// };
//
// const app = initializeApp(firebaseConfig);

const App = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if(user){
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
    else{
        return(
            <View>
                <Text>Login</Text>
            </View>
        )
    }
}

export default App;
