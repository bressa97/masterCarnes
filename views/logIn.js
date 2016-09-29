import React, { Component } from 'react';
import{View, Text, StyleSheet,TouchableOpacity,Image,Modal}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';

module.exports = class LogIn extends Component{
   constructor(props){
      super(props);
      this.state ={
        modalVisibleRegistro: false,
      };
   }
   setModalRegistroVisible(visible) {
     this.setState({modalVisibleRegistro: visible});
   }

   render(){
      return(
         <LinearGradient colors={['#31A3DD', '#022470']} style={styles.linearGradient}>
            <View style={{width:300}}>
               <Image source={require('../img/logui.png')} resizeMode="contain" style={{width:300,marginTop:-25,marginBottom:80}}/>
               <Hideo
                  iconClass={FontAwesomeIcon}
                  iconName={'envelope'}
                  iconColor={'white'}
                  labelStyle={{borderRadius:2}}
                  style={{borderRadius:2,marginBottom:20}}
                  iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                  inputStyle={{ color: '#464949' }}
               />

               <Hideo
                  iconClass={FontAwesomeIcon}
                  iconName={'key'}
                  iconColor={'white'}
                  labelStyle={{borderRadius:2}}
                  style={{borderRadius:2,marginBottom:40}}
                  iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                  inputStyle={{ color: '#464949' }}
               />
               <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'home'})}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:75}}>
                  <View style={{flex:1,borderRadius:2,backgroundColor:'#31A3DD',padding:20}}>
                     <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>Iniciar sesión</Text>
                  </View>
               </TouchableOpacity>
               <View style={{flex:1,flexDirection:'row',marginTop:15}}>
                 <Text style={{flex:0.6,textAlign:'right',color:'#ffffff'}}>
                  No tienes una cuenta?
                 </Text>
                 <TouchableOpacity style={{flex:0.4}}>
                  <Text style={{textDecorationLine:'underline',color:'#ffffff'}}onPress={() => {this.setModalRegistroVisible(true)}}> Regístrate</Text>
                 </TouchableOpacity>
               </View>
          </View>
          <Modal animationType={"slide"}transparent={false}visible={this.state.modalVisibleRegistro}onRequestClose={() => {alert("Modal has been closed.")}}>
          <View>
          <LinearGradient colors={['#31A3DD', '#022470']} style={styles.linearGradient}>
             <View style={{width:300}}>
                <Image source={require('../img/logui.png')} resizeMode="contain" style={{width:300,marginTop:-25,marginBottom:80}}/>
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'user'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                />
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'envelope'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                />
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'key'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                />
                <TouchableOpacity onPress={() => {this.props.navigator.push({id:'home'}),this.setModalRegistroVisible(!this.state.modalVisibleRegistro)}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:45}}>
                   <View style={{flex:1,borderRadius:2,backgroundColor:'#31A3DD',padding:20}}>
                      <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>Registrarte</Text>
                   </View>
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'row',marginTop:15}}>
                  <Text style={{flex:0.6,textAlign:'right',color:'#ffffff'}}>
                   Cuentas con una cuenta
                  </Text>
                  <TouchableOpacity style={{flex:0.4}}>
                   <Text style={{textDecorationLine:'underline',color:'#ffffff'}}onPress={() => {this.setModalRegistroVisible(!this.state.modalVisibleRegistro)}}> Iniciar sesión</Text>
                  </TouchableOpacity>
                </View>
           </View>
           </LinearGradient>
           </View>
          </Modal>
         </LinearGradient>
      );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 15,
    justifyContent:'center',
    alignItems:'center'
   }
});
