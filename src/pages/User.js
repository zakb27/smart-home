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


const User = ()=>{
    return(
        <SafeAreaView>
            <Text>
                This is the user page
            </Text>

        </SafeAreaView>


    )
}

const SignIn = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Text>Sign In Screen</Text>
              <Button title="Sign In" onPress={() => alert('sdf')} />
              <Button
                  title="Create Account"
                  onPress={() => navigation.push("CreateAccount")}
              />
        </ScreenContainer>
    );

};


const CreateAccount = () => {

    return (
        <ScreenContainer>
            <Text>Create Account Screen</Text>
            <Button title="Sign Up" onPress={() => console.log('sdf')} />
        </ScreenContainer>
    // <Text>Create Account Screen</Text>
    );
};


export {User, SignIn, CreateAccount};