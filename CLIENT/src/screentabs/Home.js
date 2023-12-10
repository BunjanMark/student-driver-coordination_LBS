import { View, Text,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
    const navigator = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Go to login'
        onPress={() => {
          navigator.navigate("LoginScreen");
        }}
      >
        Log out
      </Button>
    </View>
  )
}

export default Home