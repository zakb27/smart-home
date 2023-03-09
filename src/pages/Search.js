import React,{useEffect} from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PerformSearch from "../components/PerformSearch";



const Search = ({navigation})=>{
    const [value, setValue] = React.useState('');

    return(
            <PerformSearch
            value={value}
            />
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {}


})