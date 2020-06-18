import * as React from 'react';
import { Component } from 'react'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import QuizContainer from './components/QuizContainer'
import { createDummyData } from './utils/helpers'
import { white } from './utils/colours'
import reducer from './reducers'
import middleware from './middlewares'
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux'
import Constants  from 'expo-constants'
import { Provider } from 'react-redux'


const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator()

function MainNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen
      name='Mobile Flash Cards Home'
      component={DeckList}
      />
      <Stack.Screen 
        name='DeckDetail'
        component={DeckDetail}
      />
      <Stack.Screen 
        name='AddCard'
        component={AddCard}
        /> 
      <Stack.Screen 
        name='AddDeck'
        component={AddDeck}
        /> 
      <Stack.Screen
        name='QuizContainer'
        component={QuizContainer}
        />
    </Stack.Navigator>
  )
}

class App extends Component {
  
  componentDidMount(){
    createDummyData()
  }
  render(){
    return (
      <NavigationContainer>
        <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App
