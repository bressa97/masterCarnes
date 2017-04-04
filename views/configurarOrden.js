import React, { Component } from 'react';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import * as firebase from 'firebase';


import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ScrollView,
   Switch,
   ListView,
   Navigator,
   Platform,
   TouchableHighlight,
   TouchableNativeFeedback,
   TouchableOpacity,
   Modal,
   NavigatorIOS,
   Image,
   StatusBar
} from 'react-native';

module.exports = class Home extends Component {
   constructor(props){
      super(props)
      this.state = {
        cantidadTotal:0,
      }
   }

   componentWillMount(){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)})
   }

   selectInyect(row){
     var dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.props.dataSource[row].inyect=!this.props.dataSource[row].inyect;
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)});
   }

   selectNational(row){
     var dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.props.dataSource[row].national=!this.props.dataSource[row].national;
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)});
   }

   selectInternational(row,value){
     var dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.props.dataSource[row].international=value
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)});
   }
   selectUnity(row,toneladas){
     var dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.props.dataSource[row].toneladas=toneladas
     if (this.props.dataSource[row].toneladas == true) {
       this.props.dataSource[row].cantidadTotal=this.props.dataSource[row].kilos*1000;
     }else{
       this.props.dataSource[row].cantidadTotal=this.props.dataSource[row].kilos;
     }
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)});
   }
   sendOrder(index){
     this.props.navigator.push({index:2,order:this.props.dataSource})
   }

   editValue(index,cantidadTotal){
     this.setState({cantidadTotal:cantidadTotal});
     this.props.dataSource[index].kilos = cantidadTotal;
   }

   deleteItem(item){
      var newData = this.props.dataSource
      newData.splice(item,1);
      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource:dataSource.cloneWithRows(newData)});
   }

   renderRow(item){
     if(item.inyect){
       var colorInyect = '#0071B2'
     }else if(item.national){
       var colorNational = '#0071B2'
     }else if(item.international){
       var colorInternational = '#0071B2'
     }else{
       var colorInyect = 'rgb(163, 163, 163)'
       var colorNaitonal = 'rgb(163, 163, 163)'
       var colorInternational = 'rgb(163, 163, 163)'
     }

      if(item.international){
         var textInternational=' (IMP.)'
         var imageInternational = <Image style={{opacity:0.15,height:110,width:190,position:'absolute',left:20,bottom:-80}} resizeMode="contain" source={{uri:'http://previews.123rf.com/images/carmenbobo/carmenbobo1501/carmenbobo150100014/35179260-Sello-de-goma-con-la-palabra-importada-interior-ilustraci-n-vectorial-Foto-de-archivo.jpg'}}/>
      }
      if(item.toneladas){
        var textToneladas='ton'
      }else{
        var textToneladas='kg'
      }
      if(item.toneladas){
        var textToneladasTitulo=' (TON.)'
      }else{
        var textToneladasTitulo=' (KG.)'
      }


      return(
         <View style={{margin:10,backgroundColor:'white',borderRadius:3,padding:10,overflow:'hidden'}}>
         <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{flex:4}}>
               <Text style={{color:'rgb(55, 55, 55)'}}>
                  {item.name}{textInternational}{textToneladasTitulo}
               </Text>
               <Text style={{fontSize:10,color:'rgb(136, 136, 136)'}}>
                  {item.category}
               </Text>
            </View>
            <View style={{flex:4,flexDirection:'row',alignItems:'center'}}>
               {imageInternational}
                  <TextInput
                    keyboardType={'numeric'}
                    style={{flex:2,height: 40, backgroundColor:'#cccccc', borderWidth: 1}}
                    onChangeText={(cantidadTotal) => {this.editValue(this.props.dataSource.indexOf(item),cantidadTotal)}}
                    value={this.state.cantidadTotal}
                  />
               <View style={{flex:1,flexDirection:'row'}}>
                  <Text style={{fontSize:10,backgroundColor:'transparent'}}>
                      {textToneladas}
                  </Text>
               </View>
            </View>
         </View>
         <View style={{flexDirection:'row',marginBottom:-15}}>
            <View style={{flex:4,flexDirection:'row'}}>
                  <View style={{flexDirection:'row',marginTop:5}}>
                     <Switch
                     onValueChange={(value) => {this.selectInternational(this.props.dataSource.indexOf(item),value)}}
                     style={{marginBottom: 0}}
                     value={item.international} />
                     <Switch
                     onValueChange={(toneladas) => {this.selectUnity(this.props.dataSource.indexOf(item),toneladas)}}
                     style={{marginBottom: 0}}
                     value={item.toneladas} />
                  </View>
                  <View style={{flexDirection:'column',marginTop:-14,marginLeft:-13}}>
                     <CheckboxField
                        label={" SUAVIZANTE"}
                        onSelect={() => {this.selectInyect(this.props.dataSource.indexOf(item))}}
                        selected={item.inyect}
                        defaultColor="#f0efef"
                        selectedColor="#24d279"
                        labelStyle={{flex:1,color:'#858585',fontSize:10}}
                        checkboxStyle={styles.checkboxStyle}
                        labelSide="right">
                        <Icon color="#fff" name="tint"/>
                     </CheckboxField>
                  </View>
                  <TouchableOpacity onPress={()=>{this.deleteItem(this.props.dataSource.indexOf(item))}}>
                    <Iconi name="clear" style={{fontSize:20,marginLeft:30,marginTop:10,color:'black'}}/>
                  </TouchableOpacity>
            </View>
         </View>
      </View>)
   }

   render(){
      return(
         <View style={{flex:1,backgroundColor:'#0071B2'}}>
            <ListView
               dataSource={this.state.dataSource}
               renderRow={this.renderRow.bind(this)}
             />
          <TouchableOpacity style={{flex:.08,backgroundColor:'#03d282',alignItems:'center',justifyContent:'center'}} onPress={() => {this.sendOrder()}}>
            <Text style={{color:'#ffffff',justifyContent:'center'}}>3. Enviar cotización</Text>
         </TouchableOpacity>
         </View>
      )
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
    }});
