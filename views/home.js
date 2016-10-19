import React, { Component } from 'react';
const SideMenu = require('react-native-side-menu');
const Menu = require('../menu');
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Help from './pagetwo'
import Pedidos from './pedidos'
import Orden from './orden'

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
   NavigatorIOS,
   Image,
   StatusBar
} from 'react-native';

module.exports = class Home extends Component {
  constructor(props){
    super(props);
   this.state = {
      isOpen: false,
      selectedItem: 'Home',
      modalVisible:false
      }
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

   onMenuItemSelected(item){
      this.setState({
         isOpen: false,
         selectedItem: item,
      });
   }

   renderScene(route, navigator){
     switch(this.state.selectedItem){
       case 'Home':
        return (
           <Pedidos navigator={navigator}/>
        )
        break;
       case'Help':
         return(
            <Help navigator={navigator}/>
         )
         break;
      }
   }


   render() {
      var TouchableElement = TouchableHighlight;
      if (Platform.OS === 'android') {
         TouchableElement = TouchableNativeFeedback;
      }

      const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)}/>;

      return (
         <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
         <StatusBar
          backgroundColor="#bfbfbf"
         />
         <Navigator
           initialRoute={{ id: 'Home'}}
           renderScene={this.renderScene.bind(this)}
           navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                 { return (<TouchableOpacity onPress={()=>{this.toggle()}}><Iconi name="menu" style={{marginLeft:10,fontSize:34,color:'#0071B2'}}/></TouchableOpacity>); },
                RightButton: (route, navigator, index, navState) =>
                  { return (<TouchableOpacity style={{marginTop:-1,marginRight:10}}onPress={() => {this.setModalVisible(true)}}><Iconi name="add-circle" style={{color:'#0071B2',fontSize:34}}/></TouchableOpacity>); },
                Title: (route, navigator, index, navState) =>
                  { return (
                     <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'#0071B2',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Mastercarnes</Text>
                        <Text style={{fontSize:10,color:'#0071B2',textAlign:'center',marginLeft:-1,justifyContent:'center'}}>13 Oct 2016</Text>
                     </View>
                  ); },
              }}
              style={{backgroundColor: '#ffffff'}}
            />
            }
         />
         <Orden modalVisible={this.state.modalVisible} hide={()=>{this.setModalVisible(false)}}/>
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
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});
