/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
