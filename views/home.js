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
import LoopAnimation from 'react-native-LoopAnimation';

import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Easing,
   ScrollView,
   ListView,
   Navigator,
   Platform,
   AsyncStorage,
   Animated,
   Dimensions,
   AlertIOS,
   TouchableHighlight,
   TouchableNativeFeedback,
   TouchableOpacity,
   Modal,
   NavigatorIOS,
   Image,
   StatusBar
} from 'react-native';
const Window = Dimensions.get('window');

module.exports = class Home extends Component {
  constructor(props){
   super(props);
   this.state = {
      isOpen: false,
      selectedItem: 'Home',
      modalVisible:false,
      day:'',
      ref2:'',
      scale: new Animated.Value(1),

      }
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }, function(error) {
        // An error happened.
      });
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
         AlertIOS.alert(token+'')
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
      if(isOpen==true){
         Animated.spring(
            this.state.scale,
            {
               duration:200,
               tension:0,
               toValue: 0.9,
            }
         ).start();
      }else{
         Animated.spring(
            this.state.scale,
            {
               duration:200,
               tension:0,
               toValue: 1,
            }
         ).start();
      }
      this.setState({ isOpen, });
   }

   onMenuItemSelected(item){
      Animated.spring(
         this.state.scale,
         {
            duration:200,
            tension:0,
            toValue: 1,
         }
      ).start();
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
         <LinearGradient colors={['rgba(0, 139, 221, 1)', 'rgba(0, 0, 0, 0.9)']}style={{flex:1,flexDirection:'column'}}>
            <LoopAnimation source={require('../img/meat.jpg')} type={Easing.ease.inOut} style={{top:0,left:-850,opacity:0.3,height:Window.height}} duration={300000}/>
            <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={(isOpen) => this.updateMenuState(isOpen)}>
               <StatusBar
                  backgroundColor="#bfbfbf"
                  barStyle="default"
               />
               <Animated.View style={{flex:1,transform: [                        // `transform` is an ordered array
                  {scale:this.state.scale},  // Map `scale` to `scale`
               ],overflow:'hidden'}}>
               <Navigator
                 ref="ref2"
                 initialRoute={{ id: 'Home'}}
                 renderScene={this.renderScene.bind(this)}
                 style={{shadowColor: '#000000',shadowOffset: {width: 10,height: 10},shadowRadius: 100,shadowOpacity: 1.0}}
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
               </Animated.View>
               <Orden modalVisible={this.state.modalVisible} hide={()=>{this.setModalVisible(false)}}/>
            </SideMenu>
         </LinearGradient>

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
