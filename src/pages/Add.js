import React,{useEffect,useState} from 'react';
import { View, Text, Image, ScrollView, TextInput,SafeAreaView,Button } from 'react-native';



const Add = ()=>{
    const [isConnected,setConnect] = useState(false)
    const [currentClient,changeClient] =useState('')

    useEffect(() => {
        async function fetchData() {
            fetch('http://192.168.0.18:3000/')
                .then((response) => response.text())
                .then((responseText) => {
                    console.log(responseText);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchData();

    }, []);




    return(
        <SafeAreaView>
            <Text>
                Temporary click with pi server
            </Text>

        </SafeAreaView>


    )
}

export default Add;