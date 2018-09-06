import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';


const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
},
{
  initialRouteName: 'Home',
  swipeEnabled: false,
  navigationOptions: {
    header: null
  },
  // transitionConfig: () => ({
  // 	transitionSpec: {
  //   duration: 500,
  //   easing: Easing.out(Easing.poly(4)),
  //   timing: Animated.timing,
  //   useNativeDriver: true,
  // },
  // screenInterpolator: sceneProps => {
  //     const { position, scene } = sceneProps

  //     const thisSceneIndex = scene.index

  //     const opacity = position.interpolate({
  //       inputRange: [thisSceneIndex - 1, thisSceneIndex],
  //       outputRange: [0, 1],
  //     })

  //     return { opacity }
  //   },
  // }),
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {

  render() {
    return <RootStack/>;
  }
}
