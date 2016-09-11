import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet } from 'react-native';
module.exports = class PageTwo extends Component {
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
         <View>
            <Text>
               2
            </Text>
         </View>
      )
   }
}
