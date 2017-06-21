import React, { Component } from 'react';
import { View,ListView,AsyncStorage,Text,StyleSheet,WebView,RefreshControl,Image,TouchableOpacity,Modal,Switch} from 'react-native';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import Communications from 'react-native-communications';
import Orden from './orden'

function formatMoney(n,c,d,t){
var n = n,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

var productosPedidos = [
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
   {nombre:'Cabeza de lomo',cantidad:15},
]

var pedidos = [
   {date:12321323,qty:10},
   {date:12321323,qty:10},
   {date:12321323,qty:10},
   {date:12321323,qty:10}
]

module.exports = class Help extends Component {
   constructor(props) {
      super(props)
      var user = firebase.auth().currentUser;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        noOrders: true,
        refreshing:false,
        orderDetailsModal:false,
        modalVisible:false,
        dataSource: ds.cloneWithRows(productosPedidos),
        user:''
      }
   }

   setModalVisible(visible,item) {
      if(visible){
         var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
         });

         var items = []
         for(i in item.order ){
            items.push(item.order[i]);
         }


         this.setState({
            orderDetailsModal: visible,
            orderDetails:item,
            dataSourceDetail:ds.cloneWithRows(items)
         });
      }else{
         this.setState({orderDetailsModal:visible})
      }
   }

   renderRow(rowData){
      return(
         <View style={{flex:10,flexDirection:'row'}}>
            <Text style={{flex:7,fontSize:14}}>{rowData.nombre}</Text>
            <Text style={{flex:3,textAlign:'right',fontSize:14}}>{rowData.cantidad} Kg</Text>
         </View>
     );
   }

   componentDidMount(){
      var self = this;
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      var user = firebase.auth().currentUser;
         self.setState({refreshing:true})
         firebase.database().ref('ordenes_cerradas').orderByChild('user').equalTo(user.uid).on('value',function(snap) {
           if (snap.val() == null) {
             self.setState({noOrders:true,refreshing:false})
           }else{
             self.setState({refreshing:false})
             self.setState({noOrders:false,dataSource: dataSource.cloneWithRows(self.mapOrders(snap))})
           }
         });
   }

   _onRefresh() {
      this.componentDidMount()
    }

   mapOrders(snap){
      var arr = []
      snap.forEach(function(order) {
         var o = order.val();
         o.cantidadTotal = 0
         d = moment.unix(o.date/1000);
         for(i in o.order){
            o.cantidadTotal+=o.order[i].cantidadTotal;
         }
         o.date = d.format("LLL");
         arr.push(o)
      })
      return arr
   }

   renderRow(item){
      return(
          <TouchableOpacity style={{borderRadius:3}}onPress={()=>this.setModalVisible(true,item)}>
         <View style={{flexDirection:'row',borderRadius:3,padding:10,marginLeft:10,marginRight:10,marginTop:10,elevation:2,backgroundColor:'#fff',borderColor:'rgba(25, 120, 231, 0.2)',borderWidth:1}}>
           <View style={{flex:5}}>
             <Text style={{fontSize:16,color:'#373737'}}>{item.date}</Text>
               <Text style={{fontSize:27,color:'#0071B2',padding:3}}>Orden #{item.id}</Text>
           </View>
           <View style={{flex:3}}>
             <Text style={{fontSize:34,textAlign:'right',color:'#8c8c8c'}}>{item.order.length}<Iconi size={25} name="assignment"/></Text>
             <Text style={{fontSize:14,textAlign:'right',color:'#8c8c8c'}}>{formatMoney(item.cantidadTotal)} Kg</Text>
           </View>
         </View>
             </TouchableOpacity>
      )
   }

   renderRowDetai(item){
      if(item.international){
         var textInternational=' (IMP.)'
         var imageInternational = <Image style={{opacity:0.15,height:110,width:190,position:'absolute',left:20,bottom:-80}} resizeMode="contain" source={{uri:'http://previews.123rf.com/images/carmenbobo/carmenbobo1501/carmenbobo150100014/35179260-Sello-de-goma-con-la-palabra-importada-interior-ilustraci-n-vectorial-Foto-de-archivo.jpg'}}/>
      }

      function formatMoney(n,c, d, t){
      var n = n,
          c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? "." : d,
          t = t == undefined ? "," : t,
          s = n < 0 ? "-" : "",
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;
         return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
       };

      var price = null;
      var mesure = 'kg';

         if(item.toneladas){
            mesure = 'ton';
         }

         if(item.price){
            var price = (
               <View style={{flex:1,flexDirection:'row'}}>
               <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:17,color:'rgb(55, 55, 55)',backgroundColor:'transparent'}}>
                     ${item.price}/kg
                     </Text>
                  </View>
               </View>
               <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:1,flexDirection:'column'}}>
                     <Text style={{fontSize:17,color:'rgb(55, 55, 55)',backgroundColor:'transparent'}}>
                     ${formatMoney(item.price*item.cantidadTotal)}MXN
                     </Text>
                  </View>
               </View>
               </View>
            )
         }

      return(
            <View style={{margin:10,backgroundColor:'white',borderRadius:3,padding:10,overflow:'hidden'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:4}}>
                  <Text style={{color:'rgb(55, 55, 55)'}}>
                     {item.name}
                  </Text>
                  <Text style={{fontSize:10,color:'rgb(136, 136, 136)'}}>
                     {item.category}
                  </Text>
               </View>
               <View style={{flex:4,flexDirection:'row',alignItems:'center'}}>
                  <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:0}}>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={{fontSize:35,color:'rgb(55, 55, 55)',backgroundColor:'transparent'}}>
                        {item.kilos}
                     </Text>
                     <Text style={{fontSize:10,backgroundColor:'transparent'}}>
                        {mesure}.
                     </Text>
                  </View>
               </View>
            </View>
            {price}
            <View style={{flexDirection:'row',marginBottom:-15}}>
               <View style={{flex:4,flexDirection:'row'}}>
                     <View style={{flexDirection:'row',marginTop:5}}>
                        <Switch
                        disabled={true}
                        onValueChange={(value) => {this.selectInternational(this.props.dataSource.indexOf(item),value)}}
                        style={{marginBottom: 0}}
                        value={item.international} />
                     </View>
                     <View style={{flexDirection:'column',marginTop:-14,marginLeft:-13}}>
                        <CheckboxField
                           disabled={true}
                           label={" SUAVIZANTE"}
                           onSelect={()=>{}}
                           selected={item.inyect}
                           defaultColor="#f0efef"
                           selectedColor="#24d279"
                           labelStyle={{flex:1,color:'#858585',fontSize:10}}
                           checkboxStyle={styles.checkboxStyle}
                           labelSide="right">
                           <Icon color="#fff" name="tint"/>
                        </CheckboxField>
                     </View>
               </View>
            </View>
         </View>
      )
   }

   setModalVisibleOrders(visible) {
    var productsP = this.props.data
      this.setState({modalVisible: visible});
      for (var i = 0; i < productsP.length; i++) {
        if (productsP[i].selected==true) {
          productsP[i].selected = false;
        }
      }
      this.setState({products:productsP})
   }

   render(){
      if(this.state.noOrders){
        return(
        <View style={{flex:1,marginTop:56,backgroundColor:'white'}}>
           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../img/loguig.png')} resizeMode="contain" style={{width:300,opacity:0.3}}/>
              <Text style={{color:'#bebebe'}}>Realiza tu cotlizacion!</Text>
               <TouchableOpacity style={{padding:7,flexDirection:'row',justifyContent:'center',alignItems:'center',borderColor:'#0071B2',borderWidth:2,marginTop:10,borderRadius:3,width:130}}onPress={()=>this.setModalVisibleOrders(true)}>
                  <TouchableOpacity onPress={() => {this.setModalVisibleOrders(true)}}><Iconi name="add-circle" style={{color:'#0071B2',fontSize:28}}/></TouchableOpacity>
                  <Text style={{color:'#0071B2',textAlign:'center'}}>Cotizar</Text>
               </TouchableOpacity>
           </View>
           <Orden modalVisible={this.state.modalVisible} data={this.props.data}hide={()=>{this.setModalVisibleOrders(false)}}/>
        </View>
      );
      }else{
         if(this.state.orderDetailsModal){
            var modal = (
            <Modal animationType={"slide"} transparent={false} visible={this.state.orderDetailsModal} onRequestClose={() => {console.log("Modal has been closed.")}}>
              <View style={{flex:10,flexDirection:'column',backgroundColor:'#0071B2'}}>
                <View style={{backgroundColor:'#0071B2',marginTop:12,flex:1,flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#FFFFFF',flex:9,marginLeft:20,fontSize:20}}>Orden #{this.state.orderDetails.id}</Text>
                  <TouchableOpacity style={{flex:5}}onPress={() => {this.setModalVisible(false,null)}}>
                    <Text style={{textAlign:'right',color:'#FFFFFF',marginRight:20,fontSize:16}}><Iconi size={20} name="close"/></Text>
                  </TouchableOpacity>
                </View>
                <ListView style={{flex:8,margin:10}}dataSource={this.state.dataSourceDetail}renderRow={this.renderRowDetai.bind(this)} renderFooter={ ()=><View style={{flexDirection:'column',borderRadius:3,padding:10,marginLeft:10,marginRight:10,marginTop:10,elevation:2,backgroundColor:'#fff',borderColor:'rgba(25, 120, 231, 0.2)',borderWidth:1}}>
                  <Text style={{fontSize:12,color:'rgb(143, 143, 143)'}}>COMENTARIO</Text>
                  <Text>{this.state.orderDetails.comentario}</Text>
                  </View>}/>

                <Text style={{color:'#ffffff',textAlign:'center',padding:10,fontSize:16}}>Precios sujetos a cambio</Text>
              </View>
              <TouchableOpacity onPress={()=>Communications.phonecall('8189896512', true)} style={{height:70,backgroundColor:'#03d282',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white',fontSize:23}}>
                     <Iconi name="phone" size={23}/> Llamar Para Confirmar
                  </Text>
                  <Text style={{color:'white',fontSize:13}}>
                     Disponible 9:00 AM - 6:00PM Lunes-Sabado
                  </Text>
              </TouchableOpacity>
            </Modal>)
         }else {
            var modal = null;
         }
        return(
          <View style={{flex:1,backgroundColor:'#e6e6e6',paddingTop:65}}>
            <ListView
               style={{flex:1}}
               dataSource={this.state.dataSource}
               renderRow={this.renderRow.bind(this)}
               refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
        }
             />
             {modal}
          </View>
        );
      }
   }
}

const styles = StyleSheet.create({
   labelStyle: {
      flex: 1
   },
   checkboxStyle: {
      width: 30,
      height: 30,
      borderWidth: 1,
      borderColor: '#ffffff',
      borderRadius: 50
   }
});
