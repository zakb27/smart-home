import { createStackNavigator } from '@react-navigation/stack';
import {Button} from "react-native";
import React from "react";
const Stack = createStackNavigator();


const EditSchedule = ({route,navigation}) =>{

    return(
        <View>
            <Text>Yo</Text>
            <Button title="<" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default EditSchedule;

