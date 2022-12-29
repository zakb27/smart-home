import React from 'react';
import { View, Text, Image, ScrollView, TextInput,SafeAreaView,Button,StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);


const UserMain = ()=>{
    return(
        <SafeAreaView>
            <Text>
                This is the user page
            </Text>

        </SafeAreaView>


    )
}

export {UserMain};