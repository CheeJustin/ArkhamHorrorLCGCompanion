import React from 'react';
import {
  View,
  Image,
  Text,
  Icon,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {
  Colors,
  Metrics
} from '../../styles/common.js';
import { AppLoading, Font } from 'expo';
import Teutonic from '../../assets/fonts/Teutonic.ttf';

const MARGIN = 32;
const WIDTH = Dimensions.get('window').width - MARGIN * 2;
const CARD_WIDTH = WIDTH;
const CARD_HEIGHT = WIDTH * 0.75;

export default class InvestigatorCardModel extends React.Component {

  state = {
    fontLoaded: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {},
      onPress: props.onPress,
      visible: props.visible,

      // width: WIDTH / (props.numColumns || 1) - (props.offset || 0),
      // height: (WIDTH / (props.numColumns || 1) - (props.offset || 0)) * 2,
    };

    console.log('https://arkhamdb.com' + this.state.data.imagesrc);
  };
  
  async componentWillMount() {
    try {
      await Font.loadAsync({
        Teutonic
      });

      this.setState({ fontLoaded: true });
    }
    catch(error) {
      console.log('error loading icon fonts', error);
    }
  };

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (


      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.state.onPress}>
        <View
          style={styles.modalContainer}>
          <View
            style={styles.container}>
            <Text style={styles.text}>Hello World!</Text>

            <Image
              source={{uri: 'https://arkhamdb.com' + this.state.data.imagesrc}}
              style={[
                styles.image,
                { width: CARD_WIDTH, height: CARD_HEIGHT }
              ]}
              />

            <Image
              source={{uri: 'https://arkhamdb.com' + this.state.data.backimagesrc}}
              style={[
                styles.image,
                { width: CARD_WIDTH, height: CARD_HEIGHT }
              ]}
              />

            <TouchableHighlight
              onPress={this.state.onPress}>
              <Text style={styles.text}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
  
      // <TouchableHighlight
      //   style={[styles.container, {width: this.state.width, height: this.state.height}]}
      //   onPress={this.state.onPress}
      //   underlayColor="white">
      //   <View>
      //     <Image
      //       source={this.state.avatar}
      //       style={[
      //         styles.image,
      //         { width: this.state.width - SPACING, height: this.state.height - SPACING }
      //       ]}
      //       />

      //     <Image
      //       source={require('../../assets/images/overlay.png')}
      //       style={[
      //         styles.image,
      //         { width: this.state.width - SPACING, height: this.state.height - SPACING, position: 'absolute' }
      //       ]}
      //       />
      //     <View style={ styles.textContainer }>
      //       <Text style={{ flex: 1 }}/>
      //       <Text style={styles.text}>{ this.state.data.name }</Text>
      //       <View style={styles.divider} />
      //       <Text style={[styles.text, styles.subname]}>{ this.state.data.subname }</Text>
      //     </View>
      //   </View>
      // </TouchableHighlight>
    );
  }
};


const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderRadius: Metrics.borderRadius,
    width: WIDTH,
    margin: MARGIN,
    // height: null,
    // margin: 16,
    backgroundColor: 'green',
    // margin: 16,
    // padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Metrics.borderRadius,
    alignSelf: 'center',
  },
  // textContainer: {
  //   marginTop: -150,
  //   height: 150,
  //   width: '100%',
  //   paddingLeft: 12,
  //   paddingRight: 12,
  //   paddingBottom: 8,
  //   paddingTop: 12,
  // },
  text: {
    fontSize: 14,
    fontFamily: 'Teutonic',
    color: Colors.text,
    // fontWeight: 'bold', // NOTE: Can't use the fon't weight while using a fontFamily
  },
  // divider: {
  //   backgroundColor: Colors.text,
  //   height: 0.5,
  //   opacity: 0.2,
  // },
  // subname: {
  //   color: Colors.accent,
  //   fontSize: 11,
  //   opacity: 0.5,
  //   textAlign: 'right',
  // }
});