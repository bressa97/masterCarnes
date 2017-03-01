import * as firebase from 'firebase';
import React, { Component } from 'react';
import{View, Text, KeyboardAvoidingView,StyleSheet,TouchableOpacity,Dimensions,StatusBar,Easing,Image,Modal,ToastAndroid,Platform,AlertIOS,AsyncStorage}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi,Hideo } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import Home from './home';
import LoopAnimation from 'react-native-LoopAnimation';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
const Window = Dimensions.get('window');


module.exports = class LogIn extends Component{
   constructor(props){
      super(props);
      var user = firebase.auth().currentUser;
      this.state ={
         modalVisibleRegistro: false,
         name:'',
         apellido:'',
         email:'',
         password:'',
         telefono:'',
         empresa:'',
         loading:false,
         id:'',
         block:true,
      };
   }

   componentWillMount(){
     const self = this;
     firebase.auth().onAuthStateChanged(function(user) {
       console.log(user);
      if (user) {
        self.props.navigator1.replace({id:'home'})
      }
    });
   }

   setModalRegistroVisible(visible) {
      this.setState({modalVisibleRegistro: visible});
   }

   logIn(email,password){
      this.setState({loading:true})
      var self=this
      if(!email||!password){
         Platform.select({
            ios:()=>AlertIOS.alert('Porfavor llene los campos solicitados'),
            android:()=>ToastAndroid.show('Porfavor llene los campos solicitados', ToastAndroid.SHORT)
         })()
         return;
      }
      var user = firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
         Platform.select({
            ios:()=>AlertIOS.alert('Accesos incorrectos'),
            android:()=>ToastAndroid.show('Accesos incorrectos', ToastAndroid.SHORT)
         })()
         self.setState({loading:false})
         var errorCode = error.code;
         var errorMessage = error.message;
      });

     user.then(function(user) {
        self.setState({loading:false})
        if(user){
           user.getToken().then(function(token) {
              AsyncStorage.setItem('@auth:user',JSON.stringify(user));
              self.props.navigator1.push({
                id: 'home'
              });
           })
        }else{

         }
      });
   }

   signUp(name,apellido,email,password,empresa,telefono){
      var self = this;
      if(!name||!apellido||!email||!password||!empresa||!telefono){
         Platform.select({
            ios:()=>AlertIOS.alert('Porfavor llene los campos solicitados'),
            android:()=>ToastAndroid.show('Porfavor llene los campos solicitados', ToastAndroid.SHORT)
         })()
      }else{
         firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user) {
            if(user){
               var self = this;
               var current = firebase.auth().currentUser;
               console.log(current.uid+"uid login");
               firebase.database().ref('users/'+current.uid).set({name:name,apellido:apellido,email:email,empresa:empresa,telefono:telefono});
            }else{

            }
         });
         setTimeout(function () {
            self.setModalRegistroVisible(!self.state.modalVisibleRegistro);
            self.props.navigator1.push({
               id: 'home'
            });
         }, 2000);
      }
   }

   getRandomImage(){
      images = [
      require('../img/meat.jpg'),
      require('../img/meat3.jpg')
      ]
      var r = Math.floor(Math.random() * 2)
      return(images[r])
   }

   renderButton(){
      if(this.state.loading==false){
         return(
            <TouchableOpacity onPress={()=>{this.logIn(this.state.email,this.state.password)}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:65}}>
               <View style={{flex:1,borderRadius:2,backgroundColor:'#086b9e',padding:20}}>
                  <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>Iniciar sesión</Text>
               </View>
            </TouchableOpacity>
         )
      }else{
         return(
            <TouchableOpacity style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:65}}>
               <View style={{flex:1,borderRadius:2,backgroundColor:'#086b9e',padding:20}}>
                  <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>Loading</Text>
               </View>
            </TouchableOpacity>
         )
      }
   }
   statusBar(){
     if(Platform.OS == 'android'){
       return(
         <StatusBar backgroundColor="#086b9e" barStyle="light-content"/>
       )
     }else{
       return(
         <StatusBar backgroundColor="blue" barStyle="light-content"/>
       )
     }
   }
   loopAnimation(){
     if (Platform.OS == 'android') {
      return;
    }else{
      return <LoopAnimation source={require('../img/meat2.jpg')} type={Easing.ease.inOut} style={{top:0,left:-850,opacity:0.35,height:Window.height}} duration={300000}/>
    }
   }
   changeStatePassword(){
     this.setState({block:!this.state.block})
   }

   render(){
      return(
      <LinearGradient colors={['#086b9e', '#000000', '#000000', '#000000']} style={styles.linearGradient}>
         {this.statusBar()}
         {this.loopAnimation()}
         <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingBottom:10}}>
         <KeyboardAvoidingView behavior='padding'>
         <View style={{flex:1}}>
         <Image source={require('../img/logow.png')} resizeMode="contain" style={{width:300,marginTop:-25}}/>
         <View style={{flexDirection:'row',flex:8,justifyContent:'center',alignItems:'center'}}>
         <View style={{flex:7.4}}>
           <Hoshi
           label={'Correo'}
           // this is used as active and passive border color
           borderColor={'#aee2c9'}
           labelStyle={{ color: '#fcfffe' }}
           inputStyle={{ color: '#ffffff' }}
           value={this.state.email}
           onChangeText={(email) => this.setState({email})}
           />
           <Hoshi
           style={{marginTop:10}}
           secureTextEntry={this.state.block}
           label={'Contraseña'}
           // this is used as active and passive border color
           borderColor={'#aee2c9'}
           labelStyle={{ color: '#fcfffe' }}
           inputStyle={{ color: '#ffffff' }}
           value={this.state.email}
           onChangeText={(email) => this.setState({email})}
           value={this.state.password}
           onChangeText={(password) => this.setState({password})}
           />
         </View>
         <View style={{flex:0.6}}>
           <TouchableOpacity onPress={()=>this.changeStatePassword()}style={{marginTop:70}}>
             <Icon name="eye"size={20} style={{color:'white'}}/>
           </TouchableOpacity>
         </View>
       </View>



         {this.renderButton()}

         <View style={{flex:1,flexDirection:'row',marginTop:5}}>
            <Text style={{flex:0.6,textAlign:'right',color:'#ffffff'}}>
               No tienes una cuenta?
            </Text>
            <TouchableOpacity style={{flex:0.4}}>
               <Text style={{textDecorationLine:'underline',color:'#ffffff'}}onPress={() => {this.setModalRegistroVisible(true)}}> Regístrate</Text>
            </TouchableOpacity>
         </View>
      </View>
      </KeyboardAvoidingView>

      </View>

       <Modal animationType={"slide"}transparent={false}visible={this.state.modalVisibleRegistro}onRequestClose={() => {console.log("Modal has been closed.")}}>
       <View style={{flex:1}}>
       <LinearGradient colors={['#31A3DD', '#022470']} style={styles.linearGradient}>
          <View style={{width:300,backgroundColor:'transparent'}}>
             <Image source={require('../img/logui.png')} resizeMode="contain" style={{width:300,marginTop:-25}}/>
               <View style={{flexDirection:'row',flex:14,justifyContent:'center',alignItems:'center',marginTop:-40}}>
               <View style={{flex:13}}>
             <Hoshi
              label={'Nombre'}
              // this is used as active and passive border color
              borderColor={'#aee2c9'}
              labelStyle={{ color: '#fcfffe' }}
              inputStyle={{ color: '#ffffff' }}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
            />
             <Hoshi
              label={'Apellido'}
              // this is used as active and passive border color
              borderColor={'#aee2c9'}
              labelStyle={{ color: '#fcfffe' }}
              inputStyle={{ color: '#ffffff' }}
              value={this.state.apellido}
              onChangeText={(apellido) => this.setState({apellido})}
            />
             <Hoshi
              label={'Correo electrónico'}
              // this is used as active and passive border color
              borderColor={'#aee2c9'}
              labelStyle={{ color: '#fcfffe' }}
              inputStyle={{ color: '#ffffff' }}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />
              <Hoshi
               label={'Empresa'}
               // this is used as active and passive border color
               borderColor={'#aee2c9'}
               labelStyle={{ color: '#fcfffe' }}
               inputStyle={{ color: '#ffffff' }}
               value={this.state.empresa}
               onChangeText={(empresa) => this.setState({empresa})}
             />
             <Hoshi
              label={'Telefono'}
              keyboardType = 'numeric'
              borderColor={'#aee2c9'}
              labelStyle={{ color: '#fcfffe' }}
              inputStyle={{ color: '#ffffff' }}
              value={this.state.telefono}
              onChangeText={(telefono) => this.setState({telefono})}
            />
             <Hoshi
             secureTextEntry={this.state.block}
              label={'Contraseña'}
              // this is used as active and passive border color
              borderColor={'#aee2c9'}
              labelStyle={{ color: '#fcfffe' }}
              inputStyle={{ color: '#ffffff' }}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />
        </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={()=>this.changeStatePassword()}style={{marginTop:330}}>
                <Icon name="eye"size={20} style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => {this.signUp(this.state.name,this.state.apellido,this.state.email,this.state.password,this.state.empresa,this.state.telefono)}} style={{backgroundColor:'rgba(214, 159, 34, 0)',marginTop:15}}>
                <View style={{flex:1,borderRadius:2,backgroundColor:'#31A3DD',padding:20}}>
                   <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>Registrarte</Text>
                </View>
             </TouchableOpacity>
             <View style={{flex:1,flexDirection:'row',marginTop:5,backgroundColor:'transparent'}}>
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
    justifyContent:'center',
    alignItems:'center'
   }
});
