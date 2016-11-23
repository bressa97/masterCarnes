import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,WebView } from 'react-native';

module.exports = class Help extends Component {
   constructor(props) {
      super(props)
   }

   componentWillMount(){
      var route = this.props.navigator.navigationContext.currentRoute;
      route.title = "newTitle";
      route.leftButtonTitle = 'NOBAKC'
      route.onLeftButtonPress = () => this.props.navigator.pop()
      this.props.navigator.replace(route)
   }

   render(){
      return(
         <View style={{flex:1,backgroundColor:'#3394b8'}}>
         <WebView
            source={{uri: 'http://s3-us-west-2.amazonaws.com/mastercnrs/chat.html'}}
            style={{marginTop: 56,backgroundColor:'#7176f2'}}
            injectedJavaScript=""
         />
      </View>
      )
   }
}
