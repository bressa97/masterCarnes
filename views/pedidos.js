import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,WebView,Image,TouchableOpacity} from 'react-native';

module.exports = class Help extends Component {
   constructor(props) {
      super(props)
      this.state = {
        noOrders: false//debe ser true
      }
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
                <TouchableOpacity style={{borderColor:'#0071B2',borderWidth:1,marginTop:10}}>
                  <Text style={{color:'#0071B2',textAlign:'center',padding:10}}>Más información</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:3}}>
                <Text style={{fontSize:18,textAlign:'right'}}>150 Kilos</Text>
              </View>
            </View>
          </View>
        );
      }
   }
}
