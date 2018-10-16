import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Button,
  Text,
  Icon,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  Metrics
} from '../styles/common.js';
import { AppLoading, Font } from 'expo';
import Teutonic from '../assets/fonts/Teutonic.ttf';


// NOTE: The string passed into the require must be static, so I'm placing it in this variable to pull properly.
const AVATARS = {
  '01001': require('../assets/images/investigators/01001.png'),
  '01002': require('../assets/images/investigators/01002.png'),
  '01003': require('../assets/images/investigators/01003.png'),
  '01004': require('../assets/images/investigators/01004.png'),
  '01005': require('../assets/images/investigators/01005.png'),

  '02001': require('../assets/images/investigators/02001.png'),
  '02002': require('../assets/images/investigators/02002.png'),
  '02003': require('../assets/images/investigators/02003.png'),
  '02004': require('../assets/images/investigators/02004.png'),
  '02005': require('../assets/images/investigators/02005.png'),

  '03001': require('../assets/images/investigators/03001.png'),
  '03002': require('../assets/images/investigators/03002.png'),
  '03003': require('../assets/images/investigators/03003.png'),
  '03004': require('../assets/images/investigators/03004.png'),
  '03005': require('../assets/images/investigators/03005.png'),
  '03006': require('../assets/images/investigators/03006.png'),

  '04001': require('../assets/images/investigators/04001.png'),
  '04002': require('../assets/images/investigators/04002.png'),
  '04003': require('../assets/images/investigators/04003.png'),
  '04004': require('../assets/images/investigators/04004.png'),
  '04005': require('../assets/images/investigators/04005.png'),

  '99001': require('../assets/images/investigators/99001.png'),
  '98007': require('../assets/images/investigators/98007.png'),
  '98010': require('../assets/images/investigators/98010.png'),
  '98013': require('../assets/images/investigators/98013.png'),
}
const SPACING = 8;
// import {
//   Button,
//   Icon,
//   Text,
// } from 'native-base';

export default class InvestigatorCard extends React.Component {

  state = {
    fontLoaded: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {},
      width: Dimensions.get('window').width / (props.numColumns || 1) - (props.offset || 0),
      height: (Dimensions.get('window').width / (props.numColumns || 1) - (props.offset || 0)) * 2,
      avatar: AVATARS[props.data.code],
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
      <View style={[styles.container, {width: this.state.width, height: this.state.height}]}>
        <Image
          source={this.state.avatar}
          style={[
            styles.image,
            { width: this.state.width - SPACING, height: this.state.height - SPACING }
          ]}
          />

        <Image
          source={require('../assets/images/overlay.png')}
          style={[
            styles.image,
            { width: this.state.width - SPACING, height: this.state.height - SPACING, position: 'absolute' }
          ]}
          />
        <View style={ styles.textContainer }>
          <Text style={{ flex: 1 }}/>
          <Text style={styles.text}>{ this.state.data.name }</Text>
          <View style={styles.divider} />
          <Text style={[styles.text, styles.subname]}>{ this.state.data.subname }</Text>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    borderRadius: Metrics.borderRadius,
    // width: null,
    // margin: 16,
    // backgroundColor: 'red',
    // margin: 16,
    // padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Metrics.borderRadius,
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: -150,
    height: 150,
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    paddingTop: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Teutonic',
    color: Colors.text,
    // fontWeight: 'bold', // NOTE: Can't use the fon't weight while using a fontFamily
  },
  divider: {
    backgroundColor: Colors.text,
    height: 0.5,
    opacity: 0.2,
  },
  subname: {
    color: Colors.accent,
    fontSize: 11,
    opacity: 0.5,
    textAlign: 'right',
  }
});


  // return (
  //     <View style={{ height: 150, borderRadius: 4, width: null, marginBottom: 8 }}>
  //       <Image source={ require('../assets/daisy.png') } style={{ height: 150, borderRadius: 4, width: null }}/>
  //       <Image source={ require('../assets/transparency.png') } style={{ marginTop: -150, height: 150, borderRadius: 4, width: null }}/>
  //       <Image source={ require('../assets/transparency.png') } style={{ marginTop: -150, height: 150, borderRadius: 4, width: null }}/>
  //       <View style={{ marginTop: -150, height: 150, width: null, padding: 16, paddingTop: 12 }}>
  //         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
  //           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }} note>{ data.experienceSpent & data.experienceCount ? `data.experienceSpent \ data.experienceCount` : '0' } &nbsp;</Text>
  //           <Icon type="MaterialCommunityIcons" name="star-circle" style={{ color: 'white', fontSize: 20 }}/>
  //         </View>
  //         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
  //           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{ data.scenarioCount || '0' } &nbsp;</Text>
  //           <Icon type="MaterialCommunityIcons" name="book-open-page-variant" style={{ color: 'white', fontSize: 20 }}/>
  //         </View>
  //           <Text style={{ flex: 1 }}/>
  //           <Text style={{ color: 'white', fontWeight: 'bold' }}>{ data.name }</Text>
  //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //             <View style={{ backgroundColor: 'white', width: 24, height: 1, marginRight: 8, opacity: 0.2 }} />
  //             <Text style={{ color: 'white', fontStyle: 'italic', fontFamily: 'Tangerine', fontSize: 20, marginTop: 4, opacity: 0.7 }} note>{ data.subtitle }</Text>
  //           </View>
  //       </View>
  //     </View>
  // );