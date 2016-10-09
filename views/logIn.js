import * as firebase from 'firebase';
import React, { Component } from 'react';
import{View, Text, StyleSheet,TouchableOpacity,Image,Modal,ToastAndroid,Platform,AlertIOS,AsyncStorage}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import Home from './home';

module.exports = class LogIn extends Component{
   constructor(props){
      super(props);
      this.state ={
        modalVisibleRegistro: false,
        name:'',
        apellido:'',
        email:'',
        password:''
      };
   }
   setModalRegistroVisible(visible) {
     this.setState({modalVisibleRegistro: visible});
   }
   logIn(email,password){
     console.log(email,password);
     if(!email||!password){
       Platform.select({
        ios:()=>AlertIOS.alert('Porfavor llene los campos solicitados'),
        android:()=>ToastAndroid.show('Porfavor llene los campos solicitados', ToastAndroid.SHORT)
      })()
       return;
     }
     var user = firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
     });
     user.then(function(user) {
        if(user){
           user.getToken().then(function(token) {
              AsyncStorage.setItem('@auth:user',token);
              this.props.navigator.push({
                id: 'home'
              });
           })
        }else{

        }
     });
   }
   signUp(name,apellido,email,password){
    if(!name||!apellido||!email||!password){
      Platform.select({
       ios:()=>AlertIOS.alert('Porfavor llene los campos solicitados'),
       android:()=>ToastAndroid.show('Porfavor llene los campos solicitados', ToastAndroid.SHORT)
     })()
    }else{
     firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
    this.setModalRegistroVisible(!this.state.modalVisibleRegistro);
    this.props.navigator.push({
          id: 'home'
        });
      }
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
                  placeholder={'Correo'}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
               />

               <Hideo
                  iconClass={FontAwesomeIcon}
                  iconName={'key'}
                  iconColor={'white'}
                  labelStyle={{borderRadius:2}}
                  style={{borderRadius:2,marginBottom:40}}
                  iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                  inputStyle={{ color: '#464949' }}
                  placeholder={'Contraseña'}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({password})}
               />
               <TouchableOpacity onPress={()=>{this.logIn(this.state.email,this.state.password)}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:75}}>
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
                <Image source={require('../img/logui.png')} resizeMode="contain" style={{width:300,marginTop:-25,marginBottom:30}}/>
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'user'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                   placeholder={'Nombre'}
                   value={this.state.name}
                   onChangeText={(name) => this.setState({name})}
                />
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'user'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                   placeholder={"Apellido"}
                   value={this.state.apellido}
                   onChangeText={(apellido) => this.setState({apellido})}
                />
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'envelope'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                   placeholder={"Correo"}
                   value={this.state.email}
                   onChangeText={(email) => this.setState({email})}
                />
                <Hideo
                   iconClass={FontAwesomeIcon}
                   iconName={'key'}
                   iconColor={'white'}
                   labelStyle={{borderRadius:2}}
                   style={{borderRadius:2,marginBottom:20}}
                   iconBackgroundColor={'rgba(53, 54, 196, 0.18)'}
                   inputStyle={{ color: '#464949' }}
                   placeholder={"Contraseña"}
                   value={this.state.password}
                   onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity onPress={() => {this.signUp(this.state.name,this.state.apellido,this.state.email,this.state.password)}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:25}}>
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
