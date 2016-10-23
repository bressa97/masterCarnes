import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';

import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   ScrollView,
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
   }

   componentWillMount(){
      var dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)})
   }

   sumaKilos(index){
     this.props.dataSource[index].kilos= this.props.dataSource[index].kilos+1
     var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)})
   }

   restaKilos(index){
     if(this.props.dataSource[index].kilos == 0){
       return;
     }
     this.props.dataSource[index].kilos = this.props.dataSource[index].kilos-1
     var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });
     this.setState({dataSource:dataSource.cloneWithRows(this.props.dataSource)})
   }

   renderRow(item){
      return(
         <View style={{margin:10,backgroundColor:'white',borderRadius:3,padding:10}}>
         <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{flex:4}}>
               <Text style={{color:'rgb(55, 55, 55)'}}>
                  {item.name}
               </Text>
               <Text style={{fontSize:10,color:'rgb(136, 136, 136)'}}>
                  {item.category}
               </Text>
               <View style={{flexDirection:'row'}}>
                  <View style={{flex:4,flexDirection:'row'}}>
                        <View style={{flexDirection:'row',marginTop:5}}>
                           <Iconi size={20} name="language"style={{color:'rgb(163, 163, 163)'}}/>
                           <Iconi size={20} name="home"style={{color:'rgb(163, 163, 163)',marginLeft:5}}/>
                           <Iconi size={20} name="label"style={{color:'rgb(163, 163, 163)',marginLeft:5}}/>
                        </View>
                  </View>
               </View>
            </View>
            <View style={{flex:4,flexDirection:'row',alignItems:'center'}}>
               <View style={{flex:2,flexDirection:'row',alignItems:'center',marginTop:8}}>
                   <TouchableOpacity onPress={()=>{this.restaKilos(this.props.dataSource.indexOf(item))}}style={{alignItems:'center'}}>
                    <View style={{flex:1,alignItems:'center',alignItems:'center'}}>
                        <View style={{height:40,width:40,borderRadius:3,alignItems:'center',backgroundColor:'rgb(219, 69, 69)',alignItems:'center',justifyContent:'center'}}>
                           <Icon name="minus" style={{color:'white'}}/>
                        </View>
                    </View>
                 </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.sumaKilos(this.props.dataSource.indexOf(item))}}>
                     <View style={{flex:1,alignItems:'center'}}>
                        <View style={{height:40,width:40,marginLeft:5,borderRadius:3,alignItems:'center',backgroundColor:'#0071B2',alignItems:'center',justifyContent:'center'}}>
                           <Icon name="plus" style={{color:'white'}}/>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={{flex:1,flexDirection:'row'}}>
                  <Text style={{fontSize:35,color:'rgb(55, 55, 55)'}}>
                     {item.kilos}
                  </Text>
                  <Text style={{fontSize:10}}>
                      kg.
                  </Text>
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
          <TouchableOpacity style={{flex:.08,backgroundColor:'#03d282',alignItems:'center',justifyContent:'center'}} onPress={() => {this.props.navigator.push({index:2})}}>
            <Text style={{color:'#ffffff',justifyContent:'center'}}>3. Enviar cotización</Text>
         </TouchableOpacity>
         </View>
      )
   }
}
