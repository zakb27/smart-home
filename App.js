import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import Intro from './src/components/Intro'

const App = () => {
  return (
      <ScrollView>
        <Intro />

        <View>
          <Text>Some more text</Text>
          <Image
              source={{
                uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
              }}
              style={{ width: 200, height: 200 }}
          />
        </View>
        <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}

        />
      </ScrollView>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
