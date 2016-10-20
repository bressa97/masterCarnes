import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,WebView,Image,TouchableOpacity,Modal} from 'react-native';


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
module.exports = class Help extends Component {
   constructor(props) {
      super(props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        noOrders: false,
        orderDetails:false,
        dataSource: ds.cloneWithRows(productosPedidos),
      }
   }
   setModalVisible(visible) {
    this.setState({orderDetails: visible});
   }
   renderRow(rowData){
     return(
       <View style={{flex:10,flexDirection:'row'}}>
         <Text style={{flex:7,fontSize:14}}>{rowData.nombre}</Text>
         <Text style={{flex:3,textAlign:'right',fontSize:14}}>{rowData.cantidad} Kg</Text>
       </View>
     );
   }
   componentWillMount(){

   }

   render(){
      if(this.state.noOrders==true){
        return(
        <View style={{flex:1,marginTop:56,backgroundColor:'white'}}>
           <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../img/loguig.png')} resizeMode="contain" style={{width:300,opacity:0.3}}/>
           </View>
        </View>
      );
      }else{
        return(
          <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',marginTop:60,backgroundColor:'white',borderRadius:3,padding:10,marginLeft:10,marginRight:10,elevation:2}}>
              <View style={{flex:5}}>
                <Text style={{fontSize:18}}>15 Octubre 2016</Text>
                <TouchableOpacity style={{borderColor:'#0071B2',borderWidth:1,marginTop:10}}onPress={()=>this.setModalVisible(true)}>
                  <Text style={{color:'#0071B2',textAlign:'center',padding:10}}>Más información</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:3}}>
                <Text style={{fontSize:18,textAlign:'right'}}>150 Kilos</Text>
              </View>
            </View>
            <Modal animationType={"slide"}transparent={false}visible={this.state.orderDetails}onRequestClose={() => {alert("Modal has been closed.")}}>
              <View style={{flex:10,flexDirection:'column'}}>
                <View style={{backgroundColor:'#0071B2',flex:1,flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#FFFFFF',flex:5,marginLeft:10,fontSize:16}}>15 Octubre 2016</Text>
                  <TouchableOpacity style={{flex:5}}onPress={() => {this.setModalVisible(!this.state.orderDetails)}}>
                    <Text style={{textAlign:'right',color:'#FFFFFF',marginRight:10,fontSize:16}}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
                <ListView style={{flex:8,margin:10}}dataSource={this.state.dataSource}renderRow={this.renderRow.bind(this)}/>
                <View style={{flex:1,margin:10,alignItems:'center',flexDirection:'column'}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{flex:5,color:'#0071B2',fontSize:20}}>TOTAL</Text>
                    <Text style={{flex:5,color:'#0071B2',fontSize:20,textAlign:'right'}}>180 Kilogramos</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      }
   }
}
