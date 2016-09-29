import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,WebView,Image } from 'react-native';

module.exports = class Help extends Component {
   constructor(props) {
      super(props)
   }

   componentWillMount(){

   }

   render(){
      return(
      <View style={{flex:1,marginTop:60,backgroundColor:'white'}}>
         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../img/loguig.png')} resizeMode="contain" style={{width:300,opacity:0.3}}/>
         </View>
      </View>
      )
   }
}
