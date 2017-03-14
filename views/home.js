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

var products = [
  {
     selected:false,
     name:'CABEZA DE LOMO',category:'CERDO'},
  {
     selected:false,
     name:'CABEZA DE PCO S/CACHETE',category:'CERDO'},
  {
     selected:false,
     name:'CUERO PLANCHADO',category:'CERDO'},
  {
     selected:false,
     name:'CHULETA DE PÙERCO CORTA NAT',category:'CERDO'},
  {
     selected:false,
     name:'CHULETA DE PÙERCO LARGA NAT',category:'CERDO'},
  {
     selected:false,
     name:'CHULETA DE PÙERCO HAUMADA',category:'CERDO'},
  {
     selected:false,
     name:'ESPALDILLA DE PCO USA',category:'CERDO'},
  {
     selected:false,
     name:'CHAMORRO',category:'CERDO'},
  {
     selected:false,
     name:'MANITAS',category:'CERDO'},
  {
     selected:false,
     name:'MORCON',category:'CERDO'},
  {
     selected:false,
     name:'TOCINO AHUMADO',category:'CERDO'},
  {
     selected:false,
     name:'TOCINO AHUM. REBANADO',category:'CERDO'},
  {
     selected:false,
     name:'LOMO CAÑA PCO.',category:'CERDO'},
  {
     selected:false,
     name:'LENGUA DE PUERCO',category:'CERDO'},
  {
     selected:false,
     name:'LECHONES PZA.',category:'CERDO'},
  {
     selected:false,
     name:'COSTILLA CARGADA DE PCO',category:'CERDO'},
  {
     selected:false,
     name:'COSTILLA TOCINERA',category:'CERDO'},
  {
     selected:false,
     name:'COSTILLA CORBATA',category:'CERDO'},
  {
     selected:false,
     name:'CHULETA',category:'CERDO'},
  {
     selected:false,
     name:'ESPALDILLA',category:'CERDO'},
  {
     selected:false,
     name:'MANTECA KG',category:'CERDO'},
  {
     selected:false,
     name:'MANTECA GRANEL',category:'CERDO'},
  {
     selected:false,
     name:'CHICHARRON PRENZADO',category:'CERDO'},
  {
     selected:false,
     name:'PAPADA DE PCO.',category:'CERDO'},// N U I
  {
     selected:false,
     name:'PIERNA PCO S/H',category:'CERDO'},// N U I
  {
     selected:false,
     name:'PIERNA PCO C/H',category:'CERDO'},// N I
  {
     selected:false,
     name:'PIERNA DE PUERCO (COMBO) C/HUESO,CUERO Y LONJA',category:'CERDO'},
  {
     selected:false,
     name:'BRISKET(PECHO DE RES S/H)',category:'RES'}, // N IM I
  {
     selected:false,
     name:'PECHO C/HUESO',category:'RES'},
  {
     selected:false,
     name:'CLOD(PALETA DE RES S/H)',category:'RES'},
  {
     selected:false,
     name:'PALETA DE RES C/H',category:'RES'},
  {
     selected:false,
     name:'CHAMBERETE C/HUESO',category:'RES'},
  {
     selected:false,
     name:'CHAMBERETE S/HUESO',category:'RES'}, // N I
  {
     selected:false,
     name:'HUESO TUETANO',category:'RES'},
  {
     selected:false,
     name:'COSTILLA FLECHA',category:'RES'}, // N I
  {
     selected:false,
     name:'PULPA NEGRA',category:'RES'}, // N IM I
  {
     selected:false,
     name:'PULPA BOLA',category:'RES'}, // N IM I
  {
     selected:false,
     name:'PULPA BLANCA',category:'RES'}, // N IM I
  {
     selected:false,
     name:'PULPA PARA DESHEBRAR',category:'RES'}, //N
  {
     selected:false,
     name:'PULPAS MIXTAS (BOLA, NEGRA,BCA,LOMO) VACA',category:'RES'}, // I
  {
     selected:false,
     name:'COSTILLA DE RES S/F AL VACIO',category:'RES'},// I
  {
     selected:false,
     name:'CUETE DE RES AL VACIO',category:'RES'},// N IMP I
  {
     selected:false,
     name:'PESCUESO DE RES',category:'RES'},// I
  {
     selected:false,
     name:'FALDA DE RES',category:'RES'}, // I
  {
     selected:false,
     name:'RECORTE DE RES 95/5 V',category:'RES'}, //N I
  {
     selected:false,
     name:'RECORTE DE RES 80/20 NOVILLO NACONAL',category:'RES'}, //N I
  {
     selected:false,
     name:'RECORTE DE FORE',category:'RES'},
  {
     selected:false,
     name:'NUEZ DE TERNERA',category:'RES'},
  {
     selected:false,
     name:'ARRACHERA NAT USA INSIDE',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'ARRACHERA NAT INSIDE NACIONAL',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'ARRACHERA MARINADA MASTER USA',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'ARRACHERA MARINADA NACIONAL',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'ARRACHERA MARINADA OUTSIDE',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'AGUJA NORTEÑA',category:'CORTES FINOS RES'},//SE REPITE // INYECTADA
  {
     selected:false,
     name:'FILETE DE RES NAC NOVILLO',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'FILETE DE RES NAC VACA',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'CABEZA DE FILETE',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'COSTILLA DE RIB EYE',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'CHULETON NACIONAL',category:'CORTES FINOS RES'}, //INYECTADO
  {
     selected:false,
     name:'T-BONE LARGO PZA. BASICA NACIONAL',category:'CORTES FINOS RES'}, //INYECTADO
  {
     selected:false,
     name:'T BONE PORTHER HOUSE PZA. BASICA NACIONAL',category:'CORTES FINOS RES'},
  {
     selected:false,
     name:'NEW-YORK PZA. BASICA',category:'CORTES FINOS RES'}, //IMPORTADO //NACIONAL SOLO EN EL NACIONAL SE INYECTA
  {
     selected:false,
     name:'RIB-EYE PZA. BASICA',category:'CORTES FINOS RES'},//IMPORTADO //NACIONAL SOLO EN EL NACIONAL SE INYECTA
  {
     selected:false,
     name:'PRIME RIB PZA. BASICA',category:'CORTES FINOS RES'},//NACIONAL IMPORTADO //NACIONAL SOLO EN EL NACIONAL SE INYECTA
  {
     selected:false,
     name:'TOP SILOIN PZA. BASICA',category:'CORTES FINOS RES'},//NACIONAL IMPORTADO //NACIONAL SOLO EN EL NACIONAL SE INYECTA
  {
     selected:false,
     name:'SHORT RIB',category:'CORTES FINOS RES'},//NACIONAL IMPORTADO //NACIONAL SOLO EN EL NACIONAL SE INYECTA
  {
     selected:false,
     name:'CASCOS DE RES (SIN LENGUA)',category:'VÍCERAS DE RES'},
  {
     selected:false,
     name:'CABEZA DE RES VACA ',category:'VÍCERAS DE RES'},
  {
     selected:false,
     name:'CABEZA DE RES NOVILLO',category:'VÍCERAS DE RES'},
  {
     selected:false,
     name:'CACHETE ',category:'VÍCERAS DE RES'}, //SOLO USA
  {
     selected:false,
     name:'LABIO USA',category:'VÍCERAS DE RES'}, // SOLO USA
  {
     selected:false,
     name:'LENGUA DE RES USA',category:'VÍCERAS DE RES'}, // SOLO USA
  {
     selected:false,
     name:'PESCUEZO',category:'VÍCERAS DE RES'}, // I
  {
     selected:false,
     name:'COLA',category:'VÍCERAS DE RES'},
  {
     selected:false,
     name:'HIGADO',category:'VÍCERAS DE RES'}, // NAC USA
  {
     selected:false,
     name:'MENUDO',category:'VÍCERAS DE RES'}, //NAC USA
  {
     selected:false,
     name:'PATA',category:'VÍCERAS DE RES'}, // NAC USA
  {
     selected:false,
     name:'MOLLEJA',category:'VÍCERAS DE RES'},// NAC USA
  {
     selected:false,
     name:'TRIPA',category:'VÍCERAS DE RES'}, // NAC USA
  {
     selected:false,
     name:'CORAZON',category:'VÍCERAS DE RES'}, // NAC USA
  {
     selected:false,
     name:'GRASA',category:'VÍCERAS DE RES'},
  {
     selected:false,
     name:'PECHUHA IQF S/H',category:'POLLO, PESCADO Y OTROS'}, // NAC USA
  {
     selected:false,
     name:'PECHUGA BLOCK S/H',category:'POLLO, PESCADO Y OTROS'}, // SOLO USA
  {
     selected:false,
     name:'PECHUGA CHILENA S/H',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'MILANESA PICOSITA',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'PIERNA Y MUSLO',category:'POLLO, PESCADO Y OTROS'},//SOLO USA
  {
     selected:false,
     name:'NUGGET',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'ALITAS',category:'POLLO, PESCADO Y OTROS'},// NAC USA
  {
     selected:false,
     name:'PAVO ENTERO',category:'POLLO, PESCADO Y OTROS'},//SOLO USA
  {
     selected:false,
     name:'PIERNA DE PAVO',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'FILETE BASSA',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'FILETE DE TILAPIA (MOJARRA)',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'FILETE DE PESCADO POLAK',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'MOJARRA ENTERA',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'CABRITOS',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'PAPA LISA',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'PAPA CORRUGADA',category:'POLLO, PESCADO Y OTROS'},
  {
     selected:false,
     name:'PAPA CRISSCUT',category:'POLLO, PESCADO Y OTROS'}
];

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
      products:products,
      }
   }

   componentDidMount() {
      var navigatorr = this.refs.ref2;
      this.setState({ref2:navigatorr})
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
         var user = firebase.auth().currentUser;
         AsyncStorage.getItem('@auth:user',function(key,value) {
            //AlertIOS.alert(''+token)
         });
         firebase.database().ref().child('devices').child(token).set(true);
      });
      self.setState({day:mm+'/'+dd+'/'+yyyy});
   }

   setModalVisible(visible) {
    var productsP = this.state.products
      this.setState({modalVisible: visible});
      for (var i = 0; i < productsP.length; i++) {
        if (productsP[i].selected==true) {
          productsP[i].selected = false;
        }
      }
      this.setState({products:productsP})
   }

   toggle() {
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

   loopAnimation(){
      if (Platform.OS == 'android') {
         return;
      }else{
         return(
            null
         )
      }
   }

   renderScene(route){
     switch(this.state.selectedItem){
       case 'Home':
        return (
           <Pedidos navigator2={this.state.ref2}data={this.state.products}/>
        )
        break;
       case 'Help':
         return(
            <Help navigator2={this.state.ref2}data={this.state.products}/>
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
         <LinearGradient colors={['#0071B2', '#0071B2']}style={{flex:1,flexDirection:'column'}}>
           {this.loopAnimation()}
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
               <Orden modalVisible={this.state.modalVisible} data={this.state.products}hide={()=>{this.setModalVisible(false)}}/>
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
