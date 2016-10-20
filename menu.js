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
    flexDirection:'column',
    padding: 0,
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
    fontSize:22,
    color:'white',
  },
  item: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 5,
    color:'white',
    marginLeft:10,
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
    fontSize:16,
    textAlign:'center',
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
      <LinearGradient colors={['#0071B2', '#022470']}style={{height:window.height,flexDirection:'column'}}>
      <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={{height:window.height,flexDirection:'column'}}>
        <View style={styles.avatarContainer}style={{marginTop:15,marginBottom:20}}>
          <Text style={styles.name}>Donald Morton</Text>
          <Text style={styles.correo}>r_fonseca_8@hotmail.com</Text>
          <View style={{flex:1,height:1,backgroundColor:'white',marginTop:40,marginLeft:15,marginRight:17}}/>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity onPress={()=>{this.props.onItemSelected('Home')}}>
          <Text
            style={styles.item}>
            <Icon name="fax"size={20}/> Pedidos
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity onPress={()=>{this.props.onItemSelected('Help')}}>
          <Text
            style={styles.item}>
            <Icon name="comments-o"size={20}/> Chat
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{flex:1,marginBottom:35,justifyContent:'flex-end'}}>
        <TouchableOpacity onPress={()=>{this.props.onItemSelected('LogIn')}}>
         <Text
            style={styles.item2}>
            <Icon name="sign-out"size={20}/> Cerrar sesión
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </LinearGradient>
    );
  }
};
