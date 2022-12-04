import React from 'react';
import { View, Text, Image, ScrollView, TextInput,SafeAreaView,StyleSheet } from 'react-native';
import Intro from './src/components/Intro'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {User, SignIn, CreateAccount} from './src/pages/User'
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

const AuthStack = createStackNavigator()
const Tabs = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const AddStack = createStackNavigator()
const UserStack = createStackNavigator()
const SettingsStack = createStackNavigator()

const HomeStackScreen = () =>(
    <HomeStack.Navigator>
        <HomeStack.Screen name ='Home' component={Home} />
    </HomeStack.Navigator>
)
const SearchStackScreen = () =>(
    <SearchStack.Navigator>
        <SearchStack.Screen name ='Search' component={Search} />
    </SearchStack.Navigator>
)
const AddStackScreen = () =>(
    <AddStack.Navigator>
        <AddStack.Screen name ='Add' component={Add} />
    </AddStack.Navigator>
)
const UserStackScreen = () =>(
    <UserStack.Navigator>
        <UserStack.Screen name ='User' component={User} />
    </UserStack.Navigator>
)
const SettingsStackScreen = () =>(
    <SettingsStack.Navigator>
        <SettingsStack.Screen name ='Settings' component={Setting} />
    </SettingsStack.Navigator>
)


const App = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name={"Home"} component={HomeStackScreen} />
                <Tabs.Screen name={"Search"} component={SearchStackScreen} />
                <Tabs.Screen name={"Add"} component={AddStackScreen} />
                <Tabs.Screen name={"User"} component={UserStackScreen} />
                <Tabs.Screen name={"Settings"} component={SettingsStackScreen} />

            </Tabs.Navigator>


            {/*<AuthStack.Navigator>*/}
            {/*    <AuthStack.Screen*/}
            {/*        name="SignIn"*/}
            {/*        component={SignIn}*/}
            {/*        options={{ title: "Sign In" }}*/}
            {/*    />*/}
            {/*    <AuthStack.Screen*/}
            {/*        name="CreateAccount"*/}
            {/*        component={CreateAccount}*/}
            {/*        options={{ title: "Create Account" }}*/}
            {/*    />*/}
            {/*</AuthStack.Navigator>*/}
        </NavigationContainer>
    );
}

export default App;
