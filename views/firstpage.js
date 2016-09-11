import React, { Component } from 'react';
import { View,ListView,Text,StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import PageTwo from '../views/pagetwo.js';

module.exports = class TableExample extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         buttonLabel:'click',
         ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2}),
         loaded: false
      }
   }

   getMoviesFromApiAsync() {
      return fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            ds: this.state.ds.cloneWithRows([
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'},
               {email:'sdcsc'}]),
            loaded: true
         })
      })
      .catch((error) => {
         console.error(error)
      })
   }

   componentDidMount(){
      this.getMoviesFromApiAsync()
   }

   changeToPageTwo(){

      this.setState({
         buttonLabel:'OK'
      })

      this.props.navigator.push({
         title: "Page 2",
         component: PageTwo
      })
   }

   renderRows(item){
      return(
         <View style={{flexDirection: 'column', flex:1, height: 70, padding:6, margin:0,backgroundColor:'#ececec',borderRadius:0,borderBottomColor:'#d1cfcf',borderBottomWidth:0.5}}>
            <View style={{flexDirection: 'row', flex:1}}>
               <Text style={{color:'#3b3b3b',fontSize:17,fontWeight:'300'}}>
                  18 Agosto 2016
               </Text>
            </View>
            <View style={{flexDirection: 'row', flex:1}}>
               <Text style={{color:'#9d9d9d',fontSize:12,fontWeight:'200'}}>
                  {item.email}
               </Text>
            </View>
         </View>
      )
   }

   renderFooter(){
      return(
         <View>
            <TouchableOpacity style={styles.button} onPress={()=>this.changeToPageTwo()}>
            <Text>{this.state.buttonLabel}</Text>
            </TouchableOpacity>
         </View>
      )
   }

   render() {
      if(!this.state.loaded){
         return(
            <View>
               <Text>
               Loading
               </Text>
            </View>
         )
      }

      return(
         <ScrollView>
            <ListView dataSource={this.state.ds} renderRow = {this.renderRows.bind(this)}/>
            <View style={styles.button}>
               <TouchableOpacity onPress={()=>this.changeToPageTwo()}>
               <Text>{this.state.buttonLabel}</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFF4',
   },
   button: {
      position: 'absolute',
      top: 80,
      padding: 10,
   },
   stage: {
      backgroundColor: '#EFEFF4',
      paddingBottom: 20,
      flex: 1
   },
   welcome: {
      fontSize: 20,
      color:'white',
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   }
})
