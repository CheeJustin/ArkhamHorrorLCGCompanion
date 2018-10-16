import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Modal,
  LayoutAnimation,
  NativeModules,
  UIManager
} from 'react-native';
import Fade from '../general/Fade';
import MenuIcon from '../general/MenuIcon.js';

export default class Menu extends React.Component {

  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    modalVisible: false,
    overlayVisible: false,
    menuButtonPos: 0,
    menuButtonBottomPos: 32,
    menuWidth: 40,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  };

  showButtons() {
    // Both of these being asynchronously called to prevent overlap of animations.
    // setTimeout(() => {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // this.setState({overlayVisible: true});
    // }, 0);

    // setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({overlayVisible: true, menuButtonPos: 256, menuButtonBottomPos: 124});
    // }, 300);
  };

  dismissButtons() {
    // Animate the update
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({menuButtonPos: 0, menuButtonBottomPos: 32, overlayVisible: false});

    // We wait a few milliseconds before fully dismissing the modal view.
    setTimeout(() => {
      this.setState({modalVisible: false});
    }, 300);
  };

  render() {
    return (
      <View style={styles.menu}>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => { this.showButtons(); }}
          onRequestClose={() => { alert('Modal has been closed.'); }}>

          <View style={{ flex: 1 }}>
            <Fade
              visible={true}
              style={styles.fadeButtons}>

              <View
                style={{ position: 'absolute', bottom: 32 }}>
                <MenuIcon
                  icon='close'
                  onPress={() => { this.dismissButtons(); }}
                />
              </View>

              <View
                style={{ position: 'absolute', bottom: 32, paddingRight: this.state.menuButtonPos }}>
                <MenuIcon
                  icon='stars'/>
              </View>

              <View
                style={{ position: 'absolute', bottom: this.state.menuButtonBottomPos, paddingRight: this.state.menuButtonPos / 2 }}>
                <MenuIcon
                  icon='stars'/>
              </View>

              <View
                style={{ position: 'absolute', bottom: this.state.menuButtonBottomPos, paddingLeft: this.state.menuButtonPos / 2 }}>
                <MenuIcon
                  icon='stars'/>
              </View>

              <View
                style={{ position: 'absolute', bottom: 32, paddingLeft: this.state.menuButtonPos }}>
                <MenuIcon
                  icon='stars'/>
              </View>
            </Fade>
          </View>
        </Modal>

        <MenuIcon
          icon='visibility'
          style={styles.mainButton}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  menu: {
    // flex: 1,
    // backgroundColor: '#252527',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  mainButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 32
  },
  fadeButtons: {
    flex: 1,
    alignItems: 'center',
  }
});
