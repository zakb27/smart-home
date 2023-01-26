import React,{useEffect} from 'react';
import { View, Text, Image, ScrollView, TextInput,SafeAreaView,Button } from 'react-native';
import BleManager from 'react-native-ble-plx';
// const bleManager = new BleManager();
const Add = ()=>{
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [messages, setMessages] = React.useState([]);


    // useEffect(() => {
    //     
    //     client.on('connect', () => {
    //         setConnectionStatus(true)
    //         client.subscribe('smarthome', function (err) {
    //             if (!err) {
    //                 client.publish('smarthome', 'Hello World');
    //             }
    //         })
    //     });
    //     client.on('message', (topic, payload, packet) => {
    //         setMessages(messages.concat(payload.toString()));
    //     });
    //
    // }, []);


    const test = () =>{
        console.log("SAOIMETUH")

    }

    return(



        <SafeAreaView>
            <Text>
                Temporary click with pi server
            </Text>

            {/*<Button onPress={test} title={'Something'}>*/}
            {/*    Connect*/}
            {/*</Button>*/}

            <Text>{messages}</Text>


        </SafeAreaView>


    )
}

export default Add;