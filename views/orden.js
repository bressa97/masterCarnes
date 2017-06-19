import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import ConfigurarOrden from './configurarOrden'
import Iconi from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import FCM from 'react-native-fcm';

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
   AsyncStorage,
   StatusBar,
   AlertIOS,
   ToastAndroid,
   TextInput,
} from 'react-native';

module.exports = class Orden extends Component {
   constructor(props){
      super(props)
      this.state={
         products:this.props.data,
         searchValue:"",
         filteredProducts:this.props.data
      }
   }

   componentDidMount(){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap(this.state.products))})
   }

   searchList(text){
      this.setState({searchValue:text.text});
      var filtered = this.state.products.filter(function(element){
         reg = new RegExp(text.text.toLowerCase());
         console.log(text.text);
         return reg.test(JSON.stringify(element).toLowerCase());
      })
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({filteredProducts:filtered})
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap(filtered))})
   }

   convertFoodArrayToMap(products) {
      if(products){
         var foodCategoryMap = {}; // Create the blank map
         products.forEach(function(productsItem) {
            if (!foodCategoryMap[productsItem.category]) {
               // Create an entry in the map for the category if it hasn't yet been created
               foodCategoryMap[productsItem.category] = [];
            }
            foodCategoryMap[productsItem.category].push(productsItem);
         });
         return foodCategoryMap;
      }else{
         return [];
      }
   }

   close(){
      this.props.hide()
   }

   dataToSend(){
     var res = []
     this.state.products.map(function(item) {
       if(item.selected){
         item.inyect = false,
         item.national = false,
         item.international = false,
         item.toneladas = false,
         item.kilos = 0,
         item.cantidadTotal = 0
         res.push(item)
       }
     })
     return res
   }

   select(row){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.state.products[row].selected=!this.state.products[row].selected
      this.setState({products:this.state.products});
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap(this.state.filteredProducts))})
   }

   clear(){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      var unselected = this.state.products.map(function(element){
         element.selected = false;
         return element
      })
      this.setState({products:unselected});
      this.setState({searchValue:''});
      this.setState({dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap(unselected))})
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
         <View style={{backgroundColor:'#f1f1f1',height:35,justifyContent:'center',marginTop:0,marginBottom:0}}>
            <Text style={{fontWeight:"700",marginLeft:5,marginTop:15,marginBottom:10,color:'rgb(79, 78, 78)',fontSize:15}}>{category}</Text>
         </View>
      )
   }

   validate(navigator){
      var self = this;
      if(self.dataToSend().length == 0){
         Platform.select({
            ios:()=>AlertIOS.alert('Porfavor seleccione al menos un producto'),
            android:()=>ToastAndroid.show('Porfavor seleccione al menos un producto', ToastAndroid.SHORT)
         })()
         return;
      }else{
         navigator.push({ title: 'Awesome Scene', index: 1,dataSource:this.dataToSend() })
      }
   }

   goBack(){
     const self = this;
     var resetProducts = this.state.products;
   }

   renderScene(route, navigator){
      var self= this
      if(route.index==0)
         return(
            <View style={{flex:1,backgroundColor:'#0071B2'}}>
               <TextInput
                 style={{margin:10,height: 40, borderColor: 'gray', color:'white', borderWidth: 0,borderRadius:10,backgroundColor:'rgba(194, 194, 194, 0.21)',padding:10}}
                 onChangeText={(text) => this.searchList({text})}
                 value={this.state.searchValue}
                  placeholder="Busqueda"
                  placeholderTextColor="rgba(255, 255, 255, 0.2)"
               />
               <ListView
                  style={{flex:.9}}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  renderSectionHeader={this.renderSectionHeader}
                  />
               <TouchableOpacity style={{flex:.08,flexDirection:'row',backgroundColor:'#03d282',alignItems:'center',justifyContent:'center'}} onPress={() => {this.validate(navigator)}}>
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
            firebase.database().ref('pedido').once('value',function (pedidoSnap) {
               var pedidokey = pedidoSnap.val()+1
               FCM.getFCMToken().then(token => {
                  var user = firebase.auth().currentUser;
                  console.log(user);
                    firebase.database().ref('users/'+user.uid).once('value',function(data){
                      var userInfo = data.val();
                      console.log(userInfo);
                      firebase.database().ref('ordenes_abiertas/' + pedidokey).set({
                          device:token||'null',
                          date:Date.now(),
                          user:user.uid,
                          empresa:userInfo.empresa,
                          telefono:userInfo.telefono,
                          id:pedidokey,
                          email:user.email,
                          order:route.order});
                    })
                  pedidoSnap.ref.set(pedidokey);
               })
            })
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
         return(<Modal animationType={"slide"} transparent={false} visible={this.props.modalVisible} onRequestClose={() => {console.log("Modal has been closed.")}}>
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
                      return (<TouchableOpacity onPress={() => {self.props.hide()}}><Iconi name="clear" style={{fontSize:30,marginLeft:10,marginTop:10,color:'white'}}/></TouchableOpacity>);

                      if(route.index==1)
                      return (<TouchableOpacity onPress={() => {self.goBack(),navigator.pop()}}><Iconi name="arrow-back" style={{fontSize:30,marginLeft:10,marginTop:10,color:'white'}}/></TouchableOpacity>);
                   },
                   RightButton: function(route, navigator, index, navState){
                     if(route.index==0)
                     return (<TouchableOpacity onPress={() => {self.clear()}}><Iconi name="delete" style={{fontSize:30,marginRight:10,marginTop:10,color:'white'}}/></TouchableOpacity>);
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
                        <Text style={{fontSize:18,color:'#ffffff',marginTop:5,marginLeft:-1,justifyContent:'center'}}>Cotizacion Enviada</Text>
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
