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

const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });


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
        MaterialIcons,
      });

      this.setState({ fontLoaded: true });
    }
    catch(error) {
      console.log('error loading icon fonts', error);
    }
  };

  async componentDidMount() {
    // return fetch('https://facebook.github.io/react-native/movies.json')
    // return fetch('https://arkhamdb.com/api/public/card/01001')
    // await db.find({$and: [{type_code: 'investigator'}, { $not: { pack_code: 'books' }}]})
    //   .sort({ code: 1 })
    //   .exec(async (err, investigators) => {
    //     if (investigators.length > 0) {
    //       console.log('EXISTING investigators count', investigators.length);
    //       this.setState({
    //         isLoading: false,
    //         data: investigators,
    //       }, function() {

    //       });
    //       return;
    //     }
    //     else {
    //       console.log('NO investigators');
    //     }
    //   });
    this.loadData();
  };

  async loadData() {
    await db.find({$and: [{type_code: 'investigator'}, { $not: { pack_code: 'books' }}]})
      .sort({ code: 1 })
      .exec(async (err, investigators) => {
        if (investigators.length > 0) {
          console.log('EXISTING investigators count', investigators.length);
          this.setState({
            isLoading: false,
            data: investigators,
          }, function() {

          });
        }
        else {
          console.log('NO investigators');
          this.fetchCards();
        }
      });
  };

  async fetchCards() {
    console.log('Fetching cards!');
    fetch('https://arkhamdb.com/api/public/cards')
      .then((response) => response.json())
      .then((responseJson) => {
        let response = responseJson;
        db.insert(response, async (err, newDocs) => {
          if (err) {
            console.log('Error', err);
          }
          else {
            await db.find({$and: [{type_code: 'investigator'}, { $not: { pack_code: 'books' }}]})
              .sort({ code: 1 })
              .exec(async (err, investigators) => {
                if (investigators.length > 0) {
                  console.log('NEW ivestigators? count', investigators.length);
                  this.setState({
                    isLoading: false,
                    data: investigators,
                  }, function() {

                  });
                }
                else {
                  console.log('NO investigators');
                }
              });
          }
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

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
    if (!this.state.fontLoaded || this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <ImageBackground source={require('../../assets/images/background.png')}
        resizeMode='cover' 
        style={styles.background}>
        <View style={styles.container}>
          <Text style={[styles.text, styles.title]}>Investigators</Text>
          <FlatList
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            data={this.state.data}
            renderItem={ ({item, i}) =>
              <InvestigatorCard
                data={item}
                numColumns={4}
                offset={4}/>
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            columnWrapperStyle={{ marginTop: 0 }}
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
    color: Colors.text,
  },
  title: {
    marginTop: 32,
    fontSize: 16,
  },
  flatlist: {
    width: '100%',
    padding: 8,
  },
  flatlistContent: {
    paddingBottom: 120,
    // marginBottom: 0
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
