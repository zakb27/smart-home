import React,{useEffect} from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PerformSearch from "../components/PerformSearch";



const Search = ()=>{
    const [value, setValue] = React.useState('');

    return(
        <View>
            <Input
            value = {value}
            placeholder={'Find'}
            accessoryLeft={<Ionicons name={'search'} size={20} />}
            onChangeText={nextValue => setValue(nextValue)}
            />
            <PerformSearch
            value={value}
            />
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {}


})