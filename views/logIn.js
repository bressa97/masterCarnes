import React, { Component } from 'react';
import{View, Text, StyleSheet,TouchableOpacity,Image}from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';

module.exports = class LogIn extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LinearGradient colors={['#31A3DD', '#022470']} style={styles.linearGradient}>
         <View style={{width:300}}>

         <Image source={require('../img/logui.png')} resizeMode="contain" style={{width:300,marginTop:-100,marginBottom:100}}/>
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

         <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'home'})}} style={{backgroundColor:'rgba(214, 159, 34, 0)'}}>
            <View style={{flex:1,borderRadius:2,backgroundColor:'#31A3DD',padding:20}}>
               <Text style={{color:'white',justifyContent:'center',textAlign:'center'}}>LOGIN</Text>
            </View>
         </TouchableOpacity>
         <Text>
            Register
         </Text>
         </View>

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
