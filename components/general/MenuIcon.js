import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class MenuIcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon,
      source: props.source,
      onPress: props.onPress,
      type: props.type,
      disabled: props.disabled,
    };
  };

  getImage() {
    return (
        this.state.source ?
          <Image
            source={this.state.source}
            resizeMode='cover'
            style={{ width: '100%', height: '100%', borderRadius: 6 }}/>
        :
          <Icon
            name={this.state.icon}
            type={this.state.type}
            color={colors.buttonForeground}/>
    );
  };

  getDisabledImage() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        { this.getImage() }
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.6)', borderRadius: 6 }}/>
      </View>
    );
  };


  render() {
    const { source, style, onPress, icon, type, disabled } = this.props;

    return (
      <TouchableHighlight
        disabled={disabled}
        style={[styles.menuButton, style]}
        underlayColor={colors.buttonBackground}
        onPress={onPress}>
          { disabled ? this.getDisabledImage() : this.getImage() }
      </TouchableHighlight>
    );
  };
}

const colors = {
  buttonForeground: 'white',
  buttonBackground: '#78c5e9' // NOTE: Unused
};

const styles = StyleSheet.create({
  menuButton: {
    width: 40,
    height: 40,
    padding: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    borderRadius: 20,
    // borderColor: 'chocolate',
    // borderWidth: 2,
    backgroundColor: colors.buttonBackground,
    // top: 28,
    // right: 12,
  },
});
