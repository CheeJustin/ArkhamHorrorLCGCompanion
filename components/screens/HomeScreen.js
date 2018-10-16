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
  ImageBackground,
  Modal,
  FlatList,
  LayoutAnimation
} from 'react-native';
import Menu from '../general/Menu.js';
import { AppLoading, Font } from 'expo';
import MaterialIcons from '../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import { Colors } from '../../styles/common.js';
import InvestigatorCard from '../InvestigatorCard.js';

const window = Dimensions.get('window');
// await Font.loadAsync({
//   Roboto: require("native-base/Fonts/Roboto.ttf"),
//   FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
//   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
// });
export default class HomeScreen extends React.Component {

  state = {
    fontLoaded: false,
    isLoading: true,
    data: []
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
  };

  componentDidMount() {
    // return fetch('https://facebook.github.io/react-native/movies.json')
    // return fetch('https://arkhamdb.com/api/public/card/01001')
    return fetch('https://arkhamdb.com/api/public/cards/core')
      .then((response) => response.json())
      .then((responseJson) => {
        // let response = [responseJson];
        let response = responseJson.slice(0, 10);
        this.setState({
          isLoading: false,
          data: response,
        }, function(){
          
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  };

  async getMoviesFromApi() {
    try {
      let response = await fetch(
        'https://facebook.github.io/react-native/movies.json'
      );
      let responseJson = await response.json();
      return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  };

  renderItem = ({item, index}) => {
    if (index == '1') {
        return(
            <View>
                <Text>{item.code} {item.name}</Text>
            </View>

        );
    }

    // if (item.idex == 2) {
        return(
            <View>
            <Text>{index}</Text>
                <Text>{item.name}</Text>
            </View>

        );
    // }

};

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <ImageBackground source={require('../../assets/images/background.png')}
        resizeMode='cover' 
        style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>Hello there</Text>
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            data={this.state.data}
            renderItem={({item, i}) => <InvestigatorCard data={item}/>}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ marginTop: 10 }}
          />
          <Menu/>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
  },
  text: {
    color: Colors.text
  },
  flatlist: {
    width: '100%',
    // padding: 16,
  },
  flatlistContent: {

    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 10,
    // marginBottom: 40
  },
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
