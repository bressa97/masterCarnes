/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import LogIn from './views/logIn';
import Home from './views/home';

const firebaseConfig = {
  apiKey: "AIzaSyDCVpFUNpTfvXy4AFkUBx0WpegkUh42ek8",
  authDomain: "mastercarnes-9b9db.firebaseapp.com",
  databaseURL: "https://mastercarnes-9b9db.firebaseio.com",
  storageBucket: "",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class masterCarnesNative extends Component {
  constructor(props){
    super(props);
  }

  renderScene(route, navigator){
    switch(route.id){

      case 'logIn':
       return (<LogIn navigator={navigator}/>)
       break;

      case'home':
        return(<Home navigator={navigator}/>)
        break;
     }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id:'home'}}
        renderScene={this.renderScene.bind(this)}
      ></Navigator>
    );
  }
}

AppRegistry.registerComponent('masterCarnesNative', () => masterCarnesNative);
