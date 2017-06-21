import React, { Component } from 'react';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import * as firebase from 'firebase';
import Input from './input';


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
     this.props.dataSource[row].international=!this.props.dataSource[row].international;
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

   deleteItem(item){
      var newData = this.props.dataSource
      newData.splice(item,1);
      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource:dataSource.cloneWithRows(newData)});
   }

   setCantidad(index,cantidad){
     var dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2,
       sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.props.dataSource[index].kilos = cantidad
     this.props.dataSource[index].cantidadTotal = cantidad
     var newData = this.props.dataSource
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
         var imageInternational = <Image style={{opacity:0.15,height:180,width:250,position:'absolute',left:130,bottom:-95}} resizeMode="contain" source={{uri:'http://previews.123rf.com/images/carmenbobo/carmenbobo1501/carmenbobo150100014/35179260-Sello-de-goma-con-la-palabra-importada-interior-ilustraci-n-vectorial-Foto-de-archivo.jpg'}}/>
      }
      if(item.toneladas){
        var textToneladas=' TON'
      }else{
        var textToneladas=' KG'
      }
      if(item.toneladas){
        var textToneladasTitulo=' (TON.)'
      }else{
        var textToneladasTitulo=' (KG.)'
      }


      return(
         <View style={{margin:10,backgroundColor:'white',borderRadius:3,padding:10,overflow:'hidden'}}>
         <View style={{alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>{this.deleteItem(this.props.dataSource.indexOf(item))}}>
              <Iconi name="clear" style={{color:'#c2c2c2',fontSize:20}}/>
            </TouchableOpacity>
         </View>
         <View style={{flexDirection:'column'}}>
            <View>
               <Text style={{color:'rgb(55, 55, 55)'}}>
                  {item.name}{textInternational}{textToneladasTitulo}
               </Text>
               <Text style={{fontSize:10,color:'rgb(136, 136, 136)'}}>
                  {item.category}
               </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
               {imageInternational}
               <Input index={this.props.dataSource.indexOf(item)} valueChanged={this.setCantidad.bind(this)} data={this.props.dataSource.indexOf(item)}/>
               <View style={{flex:2,flexDirection:'row',justifyContent:'center'}}>
                  <Text style={{marginTop:6,alignItems:'center',justifyContent:'center',fontSize:14,backgroundColor:'transparent'}}>
                     {' '}KG{' '}
                  </Text>
                  <Switch
                  onValueChange={(toneladas) => {this.selectUnity(this.props.dataSource.indexOf(item),toneladas)}}
                  style={{marginBottom: 0}}
                  value={item.toneladas} />
                  <Text style={{marginTop:6,fontSize:14,backgroundColor:'transparent'}}>
                      {' '}TON
                  </Text>
               </View>
            </View>
         </View>
         <View style={{flexDirection:'row',marginBottom:-15}}>
            <View style={{flex:4,flexDirection:'row'}}>
                  <View style={{flexDirection:'row',marginTop:-14,marginLeft:-13}}>
                     <CheckboxField
                        label={" SUAVIZANTE"}
                        onSelect={() => {this.selectInyect(this.props.dataSource.indexOf(item))}}
                        selected={item.inyect}
                        defaultColor="#f0efef"
                        selectedColor="#24d279"
                        labelStyle={{flex:1,color:'#858585',fontSize:11}}
                        checkboxStyle={styles.checkboxStyle}
                        labelSide="right">
                        <Icon color="#fff" name="tint"/>
                     </CheckboxField>
                     <CheckboxField
                        label={" IMPORTADO"}
                        onSelect={(value) => {this.selectInternational(this.props.dataSource.indexOf(item),value)}}
                        selected={item.international}
                        defaultColor="#f0efef"
                        selectedColor="#d22439"
                        labelStyle={{flex:1,color:'#858585',fontSize:11,backgroundColor:'transparent'}}
                        checkboxStyle={styles.checkboxStyle}
                        labelSide="right">
                        <Icon color="#fff" name="flag"/>
                     </CheckboxField>
                  </View>
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
