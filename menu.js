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


const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 0,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    fontSize:18,
    marginLeft:45,
    top: 20,
    color:'white',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color:'white',
    marginLeft:10,
  },
  correo: {
    fontSize:11,
    marginLeft:36,
    color:'white'
  }
});

module.exports = class Menu extends Component {
  constructor(props){
    super(props);

  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <LinearGradient colors={['#31A3DD', '#022470']}>
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}style={{marginTop:15,marginBottom:20}}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Donald Morton</Text>
          <Text style={styles.correo}>r_fonseca_8@hotmail.com</Text>
          <View style={{height:1,backgroundColor:'white',marginTop:40,width:180,marginLeft:15}}/>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}} onPress={()=>{this.props.onItemSelected('Home')}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            style={styles.item}>
            <Icon name="fax"/> Pedidos
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}}onPress={()=>{this.props.onItemSelected('Help')}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            style={styles.item}>
            <Icon name="comments-o"/> Chat
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}}onPress={()=>{this.props.onItemSelected('logOut')}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            style={styles.item}>
            <Icon name="sign-out"/> Cerrar sesión
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      </LinearGradient>
    );
  }
};
