import React, { Component } from 'react';
const SideMenu = require('react-native-side-menu');
const Menu = require('../menu');
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Help from './pagetwo'
import Pedidos from './pedidos'
import LogIn from './logIn'
import Orden from './orden'
import FCM from 'react-native-fcm';
import * as firebase from 'firebase';

import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ScrollView,
   ListView,
   Navigator,
   Platform,
   AsyncStorage,
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
      modalVisible:false,
      day:'',
      ref2:''
      }
    }

   componentDidMount() {
     var navigatorr = this.refs.ref2;
     this.setState({ref2:navigatorr})
     console.log(this.state.ref2);
     const self = this;
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();
     if(dd<10) {
        dd='0'+dd;
     }
     if(mm<10) {
        mm='0'+mm;
     }

     FCM.requestPermissions(); // for iOS
     FCM.getFCMToken().then(token => {
         console.log(token)
        //  notifications.sendDeviceToken(token,function() {
        //     console.log('device sent',token);
        //  })
      });
     self.setState({day:mm+'/'+dd+'/'+yyyy});
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

   renderScene(route){
     switch(this.state.selectedItem){
       case 'Home':
        return (
           <Pedidos navigator2={this.state.ref2}/>
        )
        break;
       case 'Help':
         return(
            <Help navigator2={this.state.ref2}/>
         )
         break;
       case 'logIn':
         return(
            <LogIn navigator1={this.props.navigator1}navigator2={this.state.ref2}/>
         )
         break;
      }
   }


   render() {
      var TouchableElement = TouchableHighlight;
      if (Platform.OS === 'android') {
         TouchableElement = TouchableNativeFeedback;
      }

      const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)}navigator1={this.props.navigator1}/>;

      return (
         <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
         <StatusBar
          backgroundColor="#bfbfbf"
         />
         <Navigator
           ref="ref2"
           initialRoute={{ id: 'Home'}}
           renderScene={this.renderScene.bind(this)}
           navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                 { return (<TouchableOpacity onPress={()=>{this.toggle()}}><Iconi name="menu" style={{marginLeft:10,fontSize:34,color:'#0071B2',marginTop:7}}/></TouchableOpacity>); },
                RightButton: (route, navigator, index, navState) =>
                  { return (<TouchableOpacity style={{marginTop:7,marginRight:10}}onPress={() => {this.setModalVisible(true)}}><Iconi name="add-circle" style={{color:'#0071B2',fontSize:34}}/></TouchableOpacity>); },
                Title: (route, navigator, index, navState) =>
                  { return (
                     <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'#0071B2',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Mastercarnes</Text>
                        <Text style={{fontSize:10,color:'#0071B2',textAlign:'center',marginLeft:-1,justifyContent:'center'}}>{this.state.day}</Text>
                     </View>
                  ); },
              }}
              style={{backgroundColor: '#ffffff',marginBottom:0}}
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
