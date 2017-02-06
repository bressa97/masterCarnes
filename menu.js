const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection:'column',
    padding: 0,
    paddingTop:40,

  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    borderRadius: 24,
  },
  name: {
    textAlign:'center',
    fontSize:19,
    color:'white',
  },
  item: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 10,
    color:'white',
    marginLeft:10,
    alignItems:'center',
    justifyContent:'center'

  },
  item2: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 5,
    color:'white',
    marginLeft:10,
    textAlign:'center'
  },
  correo: {
    fontSize:14,
    textAlign:'center',
    color:'white'
  }
});

module.exports = class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      correo:'',
      name:'',
      apellido:'',
      currentt:''
    };
  }

  componentWillMount(){
    var self = this;
    var current = firebase.auth().currentUser;
    /*console.log(current.uid+"log");
      firebase.database().ref('users/'+current.uid).on('value',function(snap) {
         self.setState({name:snap.val().name,apellido:snap.val().apellido,correo:snap.val().email});
      });*/
  }

  logOut(){
    firebase.auth().signOut();
    this.props.navigator1.replace({
      id:'logIn'
    });
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View scrollsToTop={false} style={styles.menu}>
      <View style={{height:window.height,flexDirection:'column'}}>
        <View style={{marginBottom:10}}>
        <TouchableOpacity onPress={()=>{this.props.onItemSelected('Home')}}>
          <Text
            style={styles.item}>
            <Iconi name="assignment"size={24}/> Pedidos
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity onPress={()=>{this.props.onItemSelected('Help')}}>
          <Text
            style={styles.item}>
            <Iconi name="assignment-turned-in"size={24}/> Pedidos cotizados
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{marginBottom:10,justifyContent:'flex-end',alignItems:'center',marginTop:35}}>
         <Image source={require('./img/logow.png')} style={{width:200,marginTop:35}} resizeMode='contain'/>
        <TouchableOpacity onPress={()=>{this.logOut()}}>
         <Text
            style={styles.item2}>
            <Iconi name="exit-to-app" size={15}/><Text> Cerrar sesión</Text>
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
};
