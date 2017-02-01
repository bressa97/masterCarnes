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
    this.state = {
      ref1:''
    }
  }
  componentDidMount(){
    var navigator = this.refs.ref1;
    this.setState({ref1:navigator})
    console.log(this.state.ref1);
  }
  renderScene(route){
    switch(route.id){

      case 'logIn':
       return (<LogIn navigator1={this.state.ref1}/>)
       break;

      case 'home':
        return(<Home navigator1={this.state.ref1}/>)
        break;
     }
  }

  render() {
    return (
      <Navigator
        ref='ref1'
        initialRoute={{id:'logIn'}}
        renderScene={this.renderScene.bind(this)}
      ></Navigator>
    );
  }
}

AppRegistry.registerComponent('masterCarnesNative', () => masterCarnesNative);
