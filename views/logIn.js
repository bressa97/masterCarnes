import React, { Component } from 'react';
import{View, Text, StyleSheet}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';

module.exports = class LogIn extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#1a75ff'}}>
        <Text>
          Log in
        </Text>
      </View>
    );
  }
}
