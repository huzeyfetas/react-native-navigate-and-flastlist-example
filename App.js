import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';
import {ListItem, Text, Avatar} from 'react-native-elements';

//home
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfItem: [],
    };
  }

  //1 listeyi düzenlemek lazım;

  filterList(listOfItem) {
    let list = listOfItem.filter(c => c.mechanics);

    list.map(c => {
      c.customMecId = c.cardId + '-' + c.mechanics[0].name;
      c.customMacName = c.mechanics[0].name;
    });

    this.setState({listOfItem: list});
  }

  componentDidMount() {
    const customHeaders = {
      'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
      'x-rapidapi-key': '014fa71c28mshb4b50cd6a25a2aap168c47jsn11a451998ac7',
    };
    axios
      .get('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards', {
        headers: customHeaders,
      })
      .then(res => {
        const list = res.data.Basic;
        this.filterList(list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onClick(item) {
    console.log(this.props.navigation);
  }

  render() {
    //const {navigate} = this.props.navigation;

    //console.log(navigate);

    return (
      <SafeAreaView style={styles.container}>
        {this.state.listOfItem.length > 0 && (
          <FlatList
            data={this.state.listOfItem}
            renderItem={({item}) => (
              <TouchableOpacity>
                <ListItem
                  chevron
                  onPress={() =>
                    this.props.navigation.push('Detail Page', {item})
                  }
                  title={item.name}
                  subtitle={item.customMacName}
                  subtitleStyle={styles.subtitleStyleCss}
                  leftAvatar={{source: {uri: item.img}}}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.cardId}
          />
        )}
      </SafeAreaView>
    );
  }
}

//detail
class DetailScreen extends Component {
  //<View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
  render() {
    const gelenItem = this.props.route.params.item;
    console.warn(gelenItem);
    return (
      <View style={styles.detailScreenContainer}>
        <ListItem
          style={styles.listItemContainer}
          chevron
          title={gelenItem.name}
          subtitle={gelenItem.customMacName}
          subtitleStyle={styles.subtitleStyleCss}
          leftAvatar={{source: {uri: gelenItem.img}}}
        />

        <View style={styles.description}>
          <Text h2 style={{marginBottom: 20, fontFamily: 'Cochin'}}>
            DETAILS
          </Text>
          <Avatar rounded size="xlarge" source={{uri: gelenItem.img}} />
          <Text style={{fontSize: 20, marginTop: 20}}>
            Name : {gelenItem.name}
          </Text>
          <Text style={{fontSize: 20}}>Type : {gelenItem.type}</Text>
          <Text style={{fontSize: 20}}>Faction : {gelenItem.faction}</Text>
          <Text style={{fontSize: 20}}>Rarity : {gelenItem.rarity}</Text>
          <Text style={{fontSize: 20}}>Card Set : {gelenItem.cardSet}</Text>
          <Text style={{fontSize: 20}}>
            Player Class : {gelenItem.playerClass}
          </Text>
        </View>

        <View style={styles.buttonOfDatailScreen}>
          <Button
            title="BACK"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail Page" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  detailScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#B4DCFF',
  },
  listItemContainer: {
    flex: 1,
  },
  description: {
    flex: 6,
    alignItems: 'center',
  },
  buttonOfDatailScreen: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#65B5FF',
  },
  itemCss: {
    fontSize: 24,
    color: 'red',
    padding: 5,
  },
  textcss1: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    padding: 5,
  },
  textcss: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 85,
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 24,
    backgroundColor: '#aaea',
  },
  subtitleStyleCss: {
    fontSize: 12,
    opacity: 0.9,
  },
});
