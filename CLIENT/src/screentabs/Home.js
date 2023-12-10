import { View, Text,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class App extends React.Component {
    state = {
      search: '',
    };
  
    updateSearch = (search) => {
      this.setState({ search });
    };
  
    render() {
      const { search } = this.state;
  
      return (
        <SafeAreaView>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        /></SafeAreaView>
      );
    }
  }
