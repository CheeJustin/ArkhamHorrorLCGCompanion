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

// import {
//   Button,
//   Icon,
//   Text,
// } from 'native-base';

export default class InvestigatorCard extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {},
      width: (Dimensions.get('window').width) / 2,
    };
  };

  render() {
    return (
      <View style={[styles.container, {width: this.state.width, height: this.state.width}]}>
        <Image source={{ uri: 'https://arkhamdb.com' + this.state.data.imagesrc}} style={[ styles.image, { height: this.state.width * 2 , width: this.state.width * 2 }] }/>
        <View style={{ marginTop: -150, height: 150, width: null, padding: 16, paddingTop: 12 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }} note>{ this.state.data.experienceSpent & this.state.data.experienceCount ? `data.experienceSpent \ data.experienceCount` : '0' } &nbsp;</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{ this.state.data.scenarioCount || '0' } &nbsp;</Text>
          </View>
            <Text style={{ flex: 1 }}/>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{ this.state.data.name }</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', width: 24, height: 1, marginRight: 8, opacity: 0.2 }} />
              <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 20, marginTop: 4, opacity: 0.7 }} note>{ this.state.data.subtitle }</Text>
            </View>
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
    backgroundColor: 'red',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: Metrics.borderRadius,
    alignSelf: 'center',
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