import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TextInput,
} from 'react-native';

module.exports = class input extends Component {
   constructor(props){
      super(props)
      this.state = {
        cantidadTotal:0,
      }
   }

   editValue(index,cantidadTotal){
     this.setState({cantidadTotal:cantidadTotal});
     this.props.valueChanged(index,cantidadTotal);
   }

   render(){
      return(
        <TextInput
          keyboardType={'numeric'}
          style={{flex:3,height: 40, backgroundColor:'#e8e8e8',borderColor:'#e8e8e8',borderRadius:6,padding:7}}
          onChangeText={(cantidadTotal) => {this.editValue(this.props.index,cantidadTotal)}}
          value={this.state.cantidadTotal}
        />
      )
   }
}
