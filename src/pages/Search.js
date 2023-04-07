import React,{useEffect} from 'react';
import { StyleSheet} from 'react-native';
import PerformSearch from "../components/PerformSearch";
import AddRoomScreen from "../screens/AddRoomScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import EditRoomScreen from "../screens/EditRoomScreen";
import EditDeviceScreen from "../screens/EditDeviceScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Search = ({navigation})=>{
    return(
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="PerformSearch" component={PerformSearch}/>
        <Stack.Screen name="AddRoom" component={AddRoomScreen}/>
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
        <Stack.Screen name="EditRoom" component={EditRoomScreen} />
        <Stack.Screen name="EditDevice" component={EditDeviceScreen} />
    </Stack.Navigator>
    )
}

export default Search;