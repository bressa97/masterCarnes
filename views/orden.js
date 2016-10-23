import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import ConfigurarOrden from './configurarOrden'
import Iconi from 'react-native-vector-icons/MaterialIcons';


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
     name:'AHUJA NORTEÑA',category:'CORTES FINOS RES'},//SE REPITE //INYECTADA
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

module.exports = class Orden extends Component {
   constructor(props){
      super(props)
      this.state={
         products:products
      }
   }

   componentDidMount(){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap())})
   }

   convertFoodArrayToMap() {
      var foodCategoryMap = {}; // Create the blank map
      this.state.products.forEach(function(productsItem) {
         if (!foodCategoryMap[productsItem.category]) {
            // Create an entry in the map for the category if it hasn't yet been created
            foodCategoryMap[productsItem.category] = [];
         }
         foodCategoryMap[productsItem.category].push(productsItem);
      });
      return foodCategoryMap;
   }

   close(){
      this.props.hide()
   }

   dataToSend(){
     var res = []
     this.state.products.map(function(item) {
       if(item.selected){
         item.kilos = 0
         res.push(item)
       }
     })
     console.log(res);
     return res
   }

   select(row){
          var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          });

      this.state.products[row].selected=!this.state.products[row].selected
      this.setState({products:this.state.products});
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap())})
   }
      renderRow(productsItem,section,row) {

         if(productsItem.selected){
            var textSel = (<Icon name="check"style={{color:'white'}}/>)
            var backgroundColor = '#0071B2'
            var textColor='white'
         }else{
            var textSel = null;
            var textColor='rgb(130, 130, 130)'
            var backgroundColor = 'white'
         }

         return (
            <TouchableHighlight onPress={()=>{this.select(this.state.products.indexOf(productsItem))}}>
            <View style={{backgroundColor:backgroundColor,padding:10,flexDirection:'row',justifyContent:'center',borderColor:'rgb(224, 224, 224)',borderWidth:0,borderBottomWidth:1}}>
               <View style={{flex:2,justifyContent:'center'}}>
                  <Text style={{color:textColor}}>{productsItem.name}</Text>
                  <View style={{flexDirection:'row',marginTop:5}}>
                     <Iconi  size={20} name="language"style={{color:textColor}}/>
                     <Iconi  size={20} name="home"style={{color:textColor,marginLeft:5}}/>
                     <Iconi  size={20} name="label"style={{color:textColor,marginLeft:5}}/>
                  </View>
               </View>
               <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                  {textSel}
               </View>
            </View>
            </TouchableHighlight>
         )
      }

      renderSectionHeader(sectionData, category) {
            return (
               <View style={{backgroundColor:'#f1f1f1',height:28,justifyContent:'center',marginTop:0,marginBottom:0}}>
                  <Text style={{fontWeight:"700",marginLeft:5,color:'rgb(79, 78, 78)'}}>{category}</Text>
               </View>
            )
      }

      renderScene(route, navigator){
         var self= this
         if(route.index==0)
            return(
               <View style={{flex:1}}>
                 <ListView
                    style={{flex:.9}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader}
                  />
                 <TouchableOpacity style={{flex:.08,flexDirection:'row',backgroundColor:'#03d282',alignItems:'center',justifyContent:'center'}} onPress={() => {navigator.push({ title: 'Awesome Scene', index: 1,dataSource:this.dataToSend() })}}>
                    <Text style={{color:'#ffffff',justifyContent:'center'}}>Verificar cotización </Text><Iconi name="arrow-forward" color="white"/>
                 </TouchableOpacity>
              </View>
            )
         if(route.index==1)
         return(
            <ConfigurarOrden navigator={navigator} hide={()=>{this.close()}} dataSource={route.dataSource}/>
         )

         if(route.index==2){
            setTimeout(function () {
               self.props.hide()
            }, 3000);
            return(
               <View style={{backgroundColor:'#0071B2',flex:1,justifyContent:'center',alignItems:'center'}}>
               <Iconi name="assignment" color="white" size={70}/>
               <Text style={{color:'white',textAlign:'center',fontSize:30}}>
               Cotizacion Enviada!
               </Text>
               <Text style={{color:'white',textAlign:'center',fontSize:15}}>
               Recibira un correo con los precios solicitados
               </Text>
               </View>
            )
         }
      }



      render(){
         var self = this
         return(<Modal animationType={"slide"} transparent={false} visible={this.props.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
      <StatusBar
       backgroundColor="#bfbfbf"
            barStyle="light-content"

      />
           <Navigator
             initialRoute={{ title: 'Awesome Scene', index: 0 }}
             renderScene={this.renderScene.bind(this)}
             style={{paddingTop:56}}
             navigationBar={
              <Navigator.NavigationBar
                style={{alignContent:'center',alignItems:'center'}}
                routeMapper={{
                   LeftButton: function(route, navigator, index, navState){
                      if(route.index==0)
                      return (<TouchableOpacity onPress={() => {self.props.hide()}}><Iconi name="clear" style={{fontSize:20,marginLeft:10,marginTop:10,color:'white'}}/></TouchableOpacity>);

                      if(route.index==1)
                      return (<TouchableOpacity onPress={() => {navigator.pop()}}><Iconi name="arrow-back" style={{fontSize:20,marginLeft:10,marginTop:10,color:'white'}}/></TouchableOpacity>);
                   },
                   RightButton: function(route, navigator, index, navState){
                      return (<Text></Text>);
                   },
                   Title: function(route, navigator, index, navState){
                      if(route.index==0)
                      return (
                        <View style={{justifyContent:'center'}}>
                           <Text style={{fontSize:18,color:'#ffffff',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Nueva Cotizacion</Text>
                           <Text style={{fontSize:10,color:'#ffffff',textAlign:'center',marginLeft:-1,justifyContent:'center'}}>1. Selecciona Productos</Text>
                        </View>
                     );

                      if(route.index==1)
                      return(
                        <View style={{justifyContent:'center'}}>
                           <Text style={{fontSize:18,color:'#ffffff',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Completa Cotizacion</Text>
                           <Text style={{fontSize:10,color:'#ffffff',textAlign:'center',marginLeft:-1,justifyContent:'center'}}>2.Ingresa Pesos y Variaciones</Text>
                        </View>)

                     if(route.index==2)
                     return(
                        <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:18,color:'#ffffff',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Completa Enviada</Text>
                        <Text style={{fontSize:10,color:'#ffffff',textAlign:'center',marginLeft:-1,justifyContent:'center'}}>Regresa al inicio</Text>
                        </View>)
                     }

                }}
                style={{backgroundColor: '#0071B2',justifyContent:'center'}}
              />
            }
          />
         </Modal>)
      }
}
