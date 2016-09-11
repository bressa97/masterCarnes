/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
import React, { Component } from 'react';
import { Cell, Section, TableView } from 'react-native-tableview-simple'
const SideMenu = require('react-native-side-menu');
const Menu = require('./menu');
import Icon from 'react-native-vector-icons/FontAwesome';
import TableExample from './views/firstpage.js';
import PageTwo from './views/pagetwo.js';

import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ScrollView,
   ListView,
   Navigator,
   Platform,
   TouchableHighlight,
   TouchableNativeFeedback,
   TouchableOpacity,
   Modal,
   NavigatorIOS
} from 'react-native';


class masterCarnesNative extends Component {
   state = {
      isOpen: false,
      selectedItem: 'About',
      modalVisible:false,
      navigationConfig:{
         component: TableExample,
         title: 'My Initial Scene',
         rightButtonTitle: '+',
         leftButtonTitle:'Menu',
         onLeftButtonPress:() => this.toggle(),
         onRightButtonPress:() => this.setModalVisible(true)
      }
   }

   componentDidMount(){

   }

   setModalVisible(visible) {
      this.setState({modalVisible: visible});
   }

   toggle() {
      console.log('TOGGLEE');
      this.setState({
         isOpen: !this.state.isOpen,
      });
   }

   updateMenuState(isOpen) {
      this.setState({ isOpen, });
   }

   onMenuItemSelected = (item) => {
      this.setState({
         isOpen: false,
         selectedItem: item,
      });
   }

   buttonClicked(){
      this.setState({
         isOpen: !this.state.isOpen,
      });
   }

   render() {
      var TouchableElement = TouchableHighlight;
      if (Platform.OS === 'android') {
         TouchableElement = TouchableNativeFeedback;
      }

      const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;

      return (
         <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <NavigatorIOS initialRoute={this.state.navigationConfig} style={{flex: 1}}/>
            <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
               <View style={{marginTop: 22}}>
                  <View>
                     <Text>Hello World!</Text>
                     <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <Text>Hide Modal</Text>
                     </TouchableHighlight>
                  </View>
               </View>
            </Modal>
         </SideMenu>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFF4',
   },
   button: {
      position: 'absolute',
      top: 80,
      padding: 10,
   },
   stage: {
      backgroundColor: '#EFEFF4',
      paddingBottom: 20,
      flex: 1
   },
   welcome: {
      fontSize: 20,
      color:'white',
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   }
});

AppRegistry.registerComponent('masterCarnesNative', () => masterCarnesNative);
