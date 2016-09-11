<Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
   <View style={{marginTop: 22}}>
      <View>
         <Text>Hello World!</Text>
         <Button onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
            <Text>Hide Modal</Text>
         </Button>
      </View>
   </View>
</Modal>
