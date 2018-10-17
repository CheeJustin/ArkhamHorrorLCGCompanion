import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {
  Colors,
} from '../../styles/common.js';
import { AppLoading, Font } from 'expo';
import Teutonic from '../../assets/fonts/Teutonic.ttf';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.text || {},
      style: props.style || {},
      fontLoaded: false,
    };
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
      <Text style={[styles.text, this.state.style]}>{this.state.text}</Text>
    );
  }
};


const styles = StyleSheet.create({
  // NOTE: Can't use the fon't weight while using a fontFamily
  text: {
    fontSize: 24,
    fontFamily: 'Teutonic',
    color: Colors.text,
  }
});