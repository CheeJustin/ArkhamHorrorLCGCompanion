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
  TextInput,
  Modal,
  LayoutAnimation
} from 'react-native';
import Menu from '../general/Menu';
import { AppLoading, Font } from 'expo';
import MaterialIcons from '../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

const window = Dimensions.get('window');
// await Font.loadAsync({
//   Roboto: require("native-base/Fonts/Roboto.ttf"),
//   FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
//   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
// });
export default class HomeScreen extends React.Component {

  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        MaterialIcons
      });

      this.setState({ fontLoaded: true });
    }
    catch(error) {
      console.log('error loading icon fonts', error);
    }
  }
//   state = {
//     modalVisible: false,
//     menuButtonPos: 0,
//     menuWidth: 40,
//     overlayVisible: false,
//     biome: 'city',
//     locations: [
//       require('../../assets/images/bg_forest.jpg'),
//       require('../../assets/images/bg_volcano.jpg'),
//       require('../../assets/images/bg_mountain.jpg'),
//       require('../../assets/images/bg_pond.jpg'),
//       require('../../assets/images/bg_ocean2.jpg')
//     ],
//     currentLocation: require('../../assets/images/bg_forest.jpg'),
//   };

//   setModalVisible(visible) {
//     this.setState({modalVisible: visible});
//   };

//   showButtons() {
//     // Both of these being asynchronously called to prevent overlap of animations.
//     setTimeout(() => {
//       LayoutAnimation.easeInEaseOut();
//       this.setState({overlayVisible: true});
//     }, 0);

//     setTimeout(() => {
//       LayoutAnimation.spring();
//       this.setState({menuButtonPos: (this.state.menuWidth + 12)});
//     }, 0);

//   };

//   dismissButtons() {
//     // Animate the update
//     LayoutAnimation.easeInEaseOut();
//     this.setState({menuButtonPos: 0, overlayVisible: 0});

//     // We wait a few milliseconds before fully dismissing the modal view.
//     setTimeout(() => {
//       this.setState({modalVisible: false});
//     }, 400);
//   };

//   setLocation(index) {
//     this.setState({ currentLocation: this.state.locations[index] });
//   };

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Text>Hello there</Text>

        <Menu/>
      </View>
    );
  }
}


//   render() {
//     return (
//       <View style={styles.container}>

//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={this.state.modalVisible}
//           onShow={() => { this.showButtons(); }}
//           onRequestClose={() => { alert('Modal has been closed.'); }}>

//           <View style={{ flex: 1 }}>
//             <Fade
//               visible={this.state.overlayVisible}
//               style={{ flex: 1 }}>
//               <TouchableHighlight
//                 underlayColor="#00000088"
//                 onPress={() => { this.dismissButtons(); }}
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   backgroundColor: '#00000088'
//                 }}>
//                 <View style={{
//                   width: 200,
//                   height: 200,
//                   borderRadius: 8,
//                   borderColor: 'chocolate',
//                   borderWidth: 2,
//                   backgroundColor: 'burlywood',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   padding: 16,
//                 }}>
//                   <TouchableHighlight
//                     onPress={() => {
//                       this.setModalVisible(!this.state.modalVisible);
//                     }}>
//                       <Text style={{color: 'brown', textAlign: 'center', fontWeight: 'bold'}}>
//                         Hello World!{'\n\n'}This is a beautiful menu!
//                       </Text>
//                   </TouchableHighlight>
//                 </View>
//               </TouchableHighlight>
//             </Fade>


//             <View
//               style={{position: 'absolute', top: 0, right: 0}}>

//               // First location button
//               <MenuIcon
//                 disabled={this.state.currentLocation === this.state.locations[0]}
//                 style={{right: this.state.menuButtonPos * 5 + 12}}
//                 source={this.state.locations[0]}
//                 onPress={() => { this.setLocation(0); }}/>

//               // Second location button
//               <MenuIcon
//                 disabled={this.state.currentLocation === this.state.locations[1]}
//                 style={{right: this.state.menuButtonPos * 4 + 12}}
//                 source={this.state.locations[1]}
//                 onPress={() => { this.setLocation(1); }}/>

//               // Third location button
//               <MenuIcon
//                 disabled={this.state.currentLocation === this.state.locations[2]}
//                 style={{right: this.state.menuButtonPos * 3 + 12}}
//                 source={this.state.locations[2]}
//                 onPress={() => { this.setLocation(2); }}/>

//               // Fourth location button
//               <MenuIcon
//                 disabled={this.state.currentLocation === this.state.locations[3]}
//                 style={{right: this.state.menuButtonPos * 2 + 12}}
//                 source={this.state.locations[3]}
//                 onPress={() => { this.setLocation(3); }}/>

//               // Fifth location button
//               <MenuIcon
//                 disabled={this.state.currentLocation === this.state.locations[4]}
//                 style={{right: this.state.menuButtonPos + 12}}
//                 source={this.state.locations[4]}
//                 onPress={() => { this.setLocation(4); }}/>


//               // Shop button
//               <MenuIcon
//                 style={{top: this.state.menuButtonPos + 28}}
//                 icon='shop'
//                 type='entypo'
//                 onPress={() => { this.setModalVisible(true); }}/>


//               // Work/watch ads button
//               <MenuIcon
//                 style={{top: this.state.menuButtonPos * 2 + 28}}
//                 icon='work'
//                 onPress={() => { this.setModalVisible(true); }}/>


//               // Settings button
//               <MenuIcon
//                 style={{top: this.state.menuButtonPos * 3 + 28}}
//                 icon='settings'
//                 type='material-community'
//                 onPress={() => { this.setModalVisible(true); }}/>


//               // Original Menu Icon
//               <MenuIcon
//                 style={{right: 12}}
//                 icon='earth'
//                 type='material-community'
//                 onPress={() => { this.props.navigation.navigate('Details'); }}/>
//             </View>
//           </View>
//         </Modal>

//         <Image
//           style={{ width: window.width, height: window.height, resizeMode: 'cover' }}
//           source={this.state.currentLocation}/>




//         <TouchableHighlight
//           style={[styles.menuButton]}
//           underlayColor='sandybrown'
//           onPress={() => { this.setModalVisible(true); }}>
//           <Icon
//             name='menu'
//             color='chocolate'/>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// onPress={() => this.props.navigation.navigate('Details')}

  // <ScrollView
  //   style={{ flex: 1, backgroundColor: 'blue' }}
  //   horizontal={true}>
  // <Image style={{ flex: 1 }}source={require('../../assets/images/bg_forest.jpg')}/>
  // </ScrollView>

// <SvgUri
// width="2100"
// height="700"
// source={require('../../assets/images/bgs_forest.svg')} />

// <Button
//   title="Go to Details"
//   onPress={() => this.props.navigation.navigate('Details')}
// />
// <Image
//   style={{
//     height: 500,
//     width: 700,
//   }}
//   source={require('../../assets/images/bgs_forest.jpg')}
// />
// <ScrollView
//   style={{
//     flexGrow: 1
//   }}
//   horizontal={true}>
// <Image
//   style={{
//     flexGrow: 1,
//     height: 500
//   }}
//   source={require('../../assets/images/bgs_forest.jpg')} />
//   </ScrollView>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#252527',
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#fff'
  }
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#252527',
//     // flexDirection: 'column',
//   },
//   menuButton: {
//     width: 40,
//     height: 40,
//     padding: 0,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     borderRadius: 8,
//     borderColor: 'chocolate',
//     borderWidth: 2,
//     backgroundColor: 'burlywood',
//     top: 28,
//     right: 12,
//   },
// });
