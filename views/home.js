import React, { Component } from 'react';
import { Cell, Section, TableView } from 'react-native-tableview-simple'
const SideMenu = require('react-native-side-menu');
const Menu = require('../menu');
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Help from './pagetwo'

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


var products = [
  {name:'CABEZA DE LOMO',category:'CERDO'},
  {name:'CABEZA DE PCO S/CACHETE',category:'CERDO'},
  {name:'CUERO PLANCHADO',category:'CERDO'},
  {name:'CHULETA DE PÙERCO CORTA NAT',category:'CERDO'},
  {name:'CHULETA DE PÙERCO LARGA NAT',category:'CERDO'},
  {name:'CHULETA DE PÙERCO HAUMADA',category:'CERDO'},
  {name:'ESPALDILLA DE PCO USA',category:'CERDO'},
  {name:'CHAMORRO',category:'CERDO'},
  {name:'MANITAS',category:'CERDO'},
  {name:'MORCON',category:'CERDO'},
  {name:'TOCINO AHUMADO',category:'CERDO'},
  {name:'TOCINO AHUM. REBANADO',category:'CERDO'},
  {name:'LOMO CAÑA PCO.',category:'CERDO'},
  {name:'LENGUA DE PUERCO',category:'CERDO'},
  {name:'LECHONES PZA.',category:'CERDO'},
  {name:'COSTILLA CARGADA DE PCO',category:'CERDO'},
  {name:'COSTILLA TOCINERA',category:'CERDO'},
  {name:'COSTILLA CORBATA',category:'CERDO'},
  {name:'CHULETA',category:'CERDO'},
  {name:'ESPALDILLA',category:'CERDO'},
  {name:'MANTECA KG',category:'CERDO'},
  {name:'MANTECA GRANEL',category:'CERDO'},
  {name:'CHICHARRON PRENZADO',category:'CERDO'},
  {name:'PAPADA DE PCO.',category:'CERDO'},
  {name:'PIERNA PCO S/H',category:'CERDO'},
  {name:'PIERNA PCO C/H',category:'CERDO'},
  {name:'PIERNA DE PUERCO (COMBO) C/HUESO,CUERO Y LONJA',category:'CERDO'},
  {name:'BRISKET(PECHO DE RES S/H)',category:'RES'},
  {name:'PECHO C/HUESO',category:'RES'},
  {name:'CLOD(PALETA DE RES S/H)',category:'RES'},
  {name:'PALETA DE RES C/H',category:'RES'},
  {name:'CHAMBERETE C/HUESO',category:'RES'},
  {name:'CHAMBERETE S/HUESO',category:'RES'},
  {name:'HUESO TUETANO',category:'RES'},
  {name:'COSTILLA FLECHA',category:'RES'},
  {name:'PULPA NEGRA',category:'RES'},
  {name:'PULPA BOLA',category:'RES'},
  {name:'PULPA BLANCA',category:'RES'},
  {name:'PULPA PARA DESHEBRAR',category:'RES'},
  {name:'PULPAS MIXTAS (BOLA, NEGRA,BCA,LOMO) VACA',category:'RES'},
  {name:'COSTILLA DE RES S/F AL VACIO',category:'RES'},
  {name:'CUETE DE RES AL VACIO',category:'RES'},
  {name:'PESCUESO DE RES',category:'RES'},
  {name:'FALDA DE RES',category:'RES'},
  {name:'RECORTE DE RES',category:'RES'},
  {name:'RECORTE DE FORE',category:'RES'},
  {name:'NUEZ DE TERNERA',category:'RES'},
  {name:'ARRACHERA NAT USA',category:'CORTES FINOS RES'},
  {name:'ARRACHERA NAT NACIONAL',category:'CORTES FINOS RES'},
  {name:'ARRACHERA MARINADA MASTER',category:'CORTES FINOS RES'},
  {name:'ARRACHERA MARINADA NAC.',category:'CORTES FINOS RES'},
  {name:'ARRACHERA MARINADA OUTSIDE',category:'CORTES FINOS RES'},
  {name:'AGUJA NORTEÑA',category:'CORTES FINOS RES'},//SE REPITE
  {name:'FILETE DE RES USA',category:'CORTES FINOS RES'},
  {name:'FILETE DE RES',category:'CORTES FINOS RES'},
  {name:'CABEZA DE FILETE',category:'CORTES FINOS RES'},
  {name:'AHUJA NORTEÑA',category:'CORTES FINOS RES'},//SE REPITE
  {name:'COSTILLA DE RIB EYE',category:'CORTES FINOS RES'},
  {name:'CHULETON NATURAL',category:'CORTES FINOS RES'},
  {name:'T-BONE LARGO PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'T BONE PORTHER HOUSE PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'NEW-YORK PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'RIB-EYE PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'PRIME RIB PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'TOP SILOIN PZA. BASICA',category:'CORTES FINOS RES'},
  {name:'SHORT RIB',category:'CORTES FINOS RES'},
  {name:'CABEZA DE RES',category:'VÍCERAS DE RES'},
  {name:'CABEZA DE RES VACA ',category:'VÍCERAS DE RES'},
  {name:'CABEZA DE RES NOVILLO',category:'VÍCERAS DE RES'},
  {name:'CACHETE ',category:'VÍCERAS DE RES'},
  {name:'LABIO USA',category:'VÍCERAS DE RES'},
  {name:'LENGUA DE RES USA',category:'VÍCERAS DE RES'},
  {name:'PESCUEZO',category:'VÍCERAS DE RES'},
  {name:'COLA',category:'VÍCERAS DE RES'},
  {name:'HIGADO',category:'VÍCERAS DE RES'},
  {name:'MENUDO',category:'VÍCERAS DE RES'},
  {name:'PATA',category:'VÍCERAS DE RES'},
  {name:'MOLLEJA',category:'VÍCERAS DE RES'},
  {name:'TRIPA',category:'VÍCERAS DE RES'},
  {name:'CORAZON',category:'VÍCERAS DE RES'},
  {name:'GRASA',category:'VÍCERAS DE RES'},
  {name:'PECHUHA IQF S/H',category:'POLLO, PESCADO Y OTROS'},
  {name:'PECHUGA BLOCK S/H',category:'POLLO, PESCADO Y OTROS'},
  {name:'PECHUGA CHILENA',category:'POLLO, PESCADO Y OTROS'},
  {name:'MILANESA PICOSITA',category:'POLLO, PESCADO Y OTROS'},
  {name:'PIERNA Y MUSLO',category:'POLLO, PESCADO Y OTROS'},
  {name:'NUGGET',category:'POLLO, PESCADO Y OTROS'},
  {name:'ALITAS',category:'POLLO, PESCADO Y OTROS'},
  {name:'PAVO ENTERO',category:'POLLO, PESCADO Y OTROS'},
  {name:'PIERNA DE PAVO',category:'POLLO, PESCADO Y OTROS'},
  {name:'FILETE BASSA',category:'POLLO, PESCADO Y OTROS'},
  {name:'FILETE DE TILAPIA (MOJARRA)',category:'POLLO, PESCADO Y OTROS'},
  {name:'FILETE DE PESCADO POLAK',category:'POLLO, PESCADO Y OTROS'},
  {name:'MOJARRA ENTERA',category:'POLLO, PESCADO Y OTROS'},
  {name:'CABRITOS',category:'POLLO, PESCADO Y OTROS'},
  {name:'PAPA LISA',category:'POLLO, PESCADO Y OTROS'},
  {name:'PAPA CORRUGADA',category:'POLLO, PESCADO Y OTROS'},
  {name:'PAPA CRISSCUT',category:'POLLO, PESCADO Y OTROS'}
];

module.exports = class Home extends Component {
  constructor(props){
    super(props);
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
   this.state = {
      isOpen: false,
      selectedItem: 'Home',
      modalVisible:false,
      dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap()),
      }
    }
   convertFoodArrayToMap() {
    var foodCategoryMap = {}; // Create the blank map
    products.forEach(function(productsItem) {
      if (!foodCategoryMap[productsItem.category]) {
        // Create an entry in the map for the category if it hasn't yet been created
        foodCategoryMap[productsItem.category] = [];
      }
      foodCategoryMap[productsItem.category].push(productsItem);
    });
    return foodCategoryMap;
  }
  renderRow(productsItem) {
    return (
      <View style={{backgroundColor:'#ffffff',padding:10,flexDirection:'row',justifyContent:'center'}}>
        <View style={{flex:2}}>
          <Text>{productsItem.name}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity>
              <View style={{flex:1}}>
                  <View style={{height:40,width:40,borderRadius:20,alignItems:'center',backgroundColor:'rgb(219, 69, 69)',alignItems:'center',justifyContent:'center'}}>
                     <Icon name="minus" style={{color:'white'}}/>
                  </View>
              </View>
           </TouchableOpacity>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Text>
                  1.5 Ton
               </Text>
            </View>
            <TouchableOpacity>
               <View style={{flex:1}}>
                  <View style={{height:40,width:40,borderRadius:20,alignItems:'center',backgroundColor:'rgb(4, 131, 236)',alignItems:'center',justifyContent:'center'}}>
                     <Icon name="plus" style={{color:'white'}}/>
                  </View>
               </View>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSectionHeader(sectionData, category) {
    return (
      <View style={{backgroundColor:'#f1f1f1',height:28,justifyContent:'center'}}>
        <Text style={{fontWeight: "700",marginTop:3,marginLeft:5,color:'rgb(79, 78, 78)'}}>{category}</Text>
      </View>
    )
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
         <View style={{flex:1,marginTop:60,backgroundColor:'white'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
               <Image source={require('../img/loguig.png')} resizeMode="contain" style={{width:300,opacity:0.1}}/>
            </View>
         </View>
        )
        break;
       case'Help':
         return(<Help navigator={navigator}/>)
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
                 { return (<TouchableOpacity onPress={()=>{this.toggle()}}><Icon name="bars" style={{marginLeft:10,fontSize:34,color:'#0071B2'}}/></TouchableOpacity>); },
                RightButton: (route, navigator, index, navState) =>
                  { return (<TouchableOpacity style={{marginTop:-1,marginRight:10}}onPress={() => {this.setModalVisible(true)}}><Icon name="plus" style={{color:'#0071B2',fontSize:34}}/></TouchableOpacity>); },
                Title: (route, navigator, index, navState) =>
                  { return (<Text style={{fontSize:18,color:'#0071B2'}}>12 Dic 2016</Text>); },
              }}
              style={{backgroundColor: '#ffffff'}}
            />
         }
         />

            <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
              <StatusBar
                 backgroundColor="#0071B2"
              />
              <Navigator
                initialRoute={{ title: 'Awesome Scene', index: 0 }}
                renderScene={(route, navigator) =>
                  <View style={{flex:1}}>
                     <ListView
                        style={{flex:.9}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSectionHeader={this.renderSectionHeader}
                      />
                     <TouchableOpacity style={{flex:.08,backgroundColor:'#0071B2',alignItems:'center'}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                        <Text style={{color:'#ffffff',marginTop:8}}>Verificar cotización</Text>
                     </TouchableOpacity>
                  </View>
                }
                style={{paddingTop:60}}
                navigationBar={
                 <Navigator.NavigationBar
                   style={{alignContent:'center',alignItems:'center'}}
                   routeMapper={{
                     LeftButton: (route, navigator, index, navState) =>
                      { return (<TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible)}}><Icon name="close" style={{fontSize:20,marginLeft:10,color:'white'}}/></TouchableOpacity>); },
                     RightButton: (route, navigator, index, navState) =>
                       { return (<Text></Text>); },
                     Title: (route, navigator, index, navState) =>
                       { return (<Text style={{fontSize:18,color:'#ffffff',marginLeft:-1}}>Solicitar cotización</Text>); },
                   }}
                   style={{backgroundColor: '#0071B2',justifyContent:'center'}}
                 />
               }
             />
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
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});
