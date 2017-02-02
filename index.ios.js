/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';
import DragDebuger from 'react-debbuger';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
//iuusmawo
import LogIn from './views/logIn';
import Home from './views/home';

const firebaseConfig = {
  apiKey: "AIzaSyDCVpFUNpTfvXy4AFkUBx0WpegkUh42ek8",
  authDomain: "mastercarnes-9b9db.firebaseapp.com",
  databaseURL: "https://mastercarnes-9b9db.firebaseio.com",
  storageBucket: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
var user = firebase.auth().currentUser;

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
           initialRoute={{id:'logIn'}}
           renderScene={this.renderScene.bind(this)}
         ></Navigator>
    );
  }
}

AppRegistry.registerComponent('masterCarnesNative', () => masterCarnesNative);
