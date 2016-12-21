import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,WebView,TouchableOpacity,Modal} from 'react-native';
import Iconi from 'react-native-vector-icons/MaterialIcons';

var productosContestados = [
  {fecha:'14 Febrero 2016',productos:3,kilos:150},
  {fecha:'14 Febrero 2016',productos:2,kilos:150},
  {fecha:'14 Febrero 2016',productos:1,kilos:150},
  {fecha:'14 Febrero 2016',productos:2,kilos:150},
  {fecha:'14 Febrero 2016',productos:1,kilos:150},
  {fecha:'14 Febrero 2016',productos:2,kilos:150},
  {fecha:'14 Febrero 2016',productos:1,kilos:150},
  {fecha:'14 Febrero 2016',productos:2,kilos:150},
  {fecha:'14 Febrero 2016',productos:1,kilos:150},
  {fecha:'14 Febrero 2016',productos:2,kilos:150},
  {fecha:'14 Febrero 2016',productos:1,kilos:150},
]

module.exports = class Help extends Component {
   constructor(props) {
      super(props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource:ds.cloneWithRows(productosContestados),
        orderDetailsModal:false,
        detalle:''
      }
   }

   setModalVisible(visible,rowData){
     if(visible){
       this.setState({
         orderDetailsModal:visible,
         detalle:rowData,
       })
     }else{
       this.setState({orderDetailsModal:visible})
     }
   }

   renderRow(rowData){
     return(
       <View style={{flexDirection:'row',backgroundColor:'white',borderRadius:3,padding:10,marginLeft:10,marginRight:10,marginTop:10,elevation:2}}>
         <View style={{flex:5}}>
           <Text style={{fontSize:16,color:'#373737'}}>{rowData.fecha}</Text>
           <TouchableOpacity style={{marginTop:10,borderRadius:3}}onPress={()=>this.setModalVisible(true,rowData)}>
             <Text style={{color:'#0071B2',padding:3}}><Iconi name="info"/> Más información</Text>
           </TouchableOpacity>
         </View>
         <View style={{flex:3}}>
           <Text style={{fontSize:34,textAlign:'right',color:'#8c8c8c'}}>{rowData.productos}<Iconi size={25} name="assignment"/></Text>
           <Text style={{fontSize:14,textAlign:'right',color:'#8c8c8c'}}>{rowData.kilos} Kilos</Text>
         </View>
       </View>
     )
   }

   render(){
     var modal = (
       <Modal animationType={'slide'}visible={this.state.orderDetailsModal} transparent={false}onRequestClose={() => {console.log(null)}}>
         <View style={{flex:10,flexDirection:'column',backgroundColor:'#0071B2'}}>
           <View style={{backgroundColor:'#0071B2',marginTop:12,flex:1,flexDirection:'row',alignItems:'center'}}>
             <Text style={{color:'#FFFFFF',flex:9,marginLeft:10,fontSize:16}}>{this.state.detalle.productos}</Text>
             <TouchableOpacity style={{flex:5}}onPress={() => {this.setModalVisible(false,null)}}>
               <Text style={{textAlign:'right',color:'#FFFFFF',marginRight:10,fontSize:16}}><Iconi size={20} name="close"/></Text>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
     )
      return(
      <View style={{flex:1,backgroundColor:'#e6e6e6',paddingTop:55}}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
        {modal}
      </View>
      )
   }
}
