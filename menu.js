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

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#c8c8c8',
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
    color:'#1a75ff',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    marginLeft:10,
  },
  correo: {
    fontSize:11,
    marginLeft:36,
  }
});

module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}style={{marginTop:15,marginBottom:20}}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Donald Morton</Text>
          <Text style={styles.correo}>r_fonseca_8@hotmail.com</Text>
          <View style={{height:1,backgroundColor:'#b3b3b3',marginTop:40,width:180,marginLeft:15}}/>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            onPress={() => this.props.onItemSelected('About')}
            style={styles.item}>
            Pedidos
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            onPress={() => this.props.onItemSelected('About')}
            style={styles.item}>
            Ayuda
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',marginBottom:10}}>
        <TouchableOpacity style={{width:window.width,flexDirection:'row'}}>
          <Image source={{uri:'http://www.iberogen.es/content/uploads/2014/05/formulario.png'}} style={{width:25,height:25,marginLeft:5}}/>
          <Text
            onPress={() => this.props.onItemSelected('Contacts')}
            style={styles.item}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};
