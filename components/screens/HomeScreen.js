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
  FlatList,
  SectionList,
  LayoutAnimation,
} from 'react-native';
import Menu from '../general/Menu.js';
import { AppLoading, Font } from 'expo';
import MaterialIcons from '../../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import { Colors } from '../../styles/common.js';
import InvestigatorCard from '../investigator/InvestigatorCard.js';
import InvestigatorCardModal from '../investigator/InvestigatorCardModal.js';
import Header from '../general/Header.js';
// import { Header } from '../../node_modules/react-native-elements';

const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });


const window = Dimensions.get('window');
// await Font.loadAsync({
//   Roboto: require("native-base/Fonts/Roboto.ttf"),
//   FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
//   Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//   Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
// });

const uniqueAttributeFilter = function(attribute) {
  if (attribute)
    return (ele, i, arr) => arr.map(ele => ele[attribute]).indexOf(ele[attribute]) === i
  else
    return (ele, i, arr) => arr.indexOf(ele) === i
};

const factionFilter = function(value) {
  return (ele) => ele.faction_code === value;
};

export default class HomeScreen extends React.Component {

  state = {
    fontLoaded: false,
    isLoading: true,
    selectedInvestigator: null,
    data: [],
  };

  selectInvestigator(investigator) {
    this.setState({selectedInvestigator: investigator});
  }
  

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
    this.loadData();
  };

  async loadData() {
    console.log('loadingData()');
    await db.find({ type_code: 'investigator' })
      .sort({ code: 1 })
      .exec(async (err, investigators) => {
        if (investigators.length > 0) {
          console.log('EXISTING investigators count', investigators.length);
          const data = {
            guardians: investigators.filter(factionFilter('guardian')).filter(uniqueAttributeFilter('name')),
            seekers: investigators.filter(factionFilter('seeker')).filter(uniqueAttributeFilter('name')),
            rogues: investigators.filter(factionFilter('rogue')).filter(uniqueAttributeFilter('name')),
            mystics: investigators.filter(factionFilter('mystic')).filter(uniqueAttributeFilter('name')),
            survivors: investigators.filter(factionFilter('survivor')).filter(uniqueAttributeFilter('name')),
            neutrals: investigators.filter(factionFilter('neutral')).filter(uniqueAttributeFilter('name')),
          };

          this.setState({
            isLoading: false,
            data: data,
            // data: data.guardians.concat(data.seekers).concat(data.rogues).concat(data.mystics).concat(data.survivors).concat(data.neutrals),
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
            await db.find({type_code: 'investigator'})
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
  };


  _renderItem = ({ section, index }) => {
    const numColumns = 4

    if (index % numColumns !== 0) return null;

    const items = [];

    for (let i = index; i < index + numColumns; i++) {
      if (i >= section.data.length) {
        break;
      }

      items.push(
        <View
          key={index}>
        <InvestigatorCard
          data={section.data[i]}
          numColumns={numColumns}
          offset={numColumns}
          onPress={() => {
            this.selectInvestigator(section.data[i]);
          }}
        />
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {items}
      </View>
    );
  };

  render() {
    if (!this.state.fontLoaded || this.state.isLoading) {
      return <AppLoading />;
    }

    let modal;
    if (this.state.selectedInvestigator !== null) {
      modal = <InvestigatorCardModal 
        visible={this.state.selectedInvestigator !== null}
        data={this.state.selectedInvestigator}
        onPress={() => {
          this.selectInvestigator(null);
        }}/>;
    }

    return (
      <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode='cover' 
        style={styles.background}>
        <View style={styles.container}>
          <Header style={styles.title} text="Investigators"/>
            {/* <FlatList
              style={styles.flatlist}
              contentContainerStyle={styles.flatlistContent}
              data={this.state.data}
              renderItem={ ({item, i}) =>
                <InvestigatorCard
                  data={item}
                  numColumns={4}
                  offset={4}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              columnWrapperStyle={{ marginTop: 0 }}
            /> */}
          <SectionList
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            renderSectionHeader={({section: {title}}) => (
              <View>
                <Header
                  style={styles.header}
                  text={title}
                />
                <View style={styles.divider} />
              </View>
            )}
            sections={[
              { title: 'Guardians', data: this.state.data.guardians },
              { title: 'Seekers', data: this.state.data.seekers },
              { title: 'Rogues', data: this.state.data.rogues },
              { title: 'Mystics', data: this.state.data.mystics },
              { title: 'Survivors', data: this.state.data.survivors },
              { title: 'Neutrals', data: this.state.data.neutrals },
            ]}
            renderItem={this._renderItem}
          />
          <Menu/>
          {modal}
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
  titleHeader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 32,
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
  header: {
    padding: 8,
    fontSize: 20,
  },
  divider: {
    backgroundColor: Colors.text,
    height: 0.5,
    opacity: 0.2,
    marginTop: -4,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
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
