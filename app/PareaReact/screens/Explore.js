import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { BottomSheet } from 'react-native-elements';
import { Button, Card, Input } from '../components';

import articles from '../constants/articles';
import AddResource from './AddResource';
import { height } from 'dom-helpers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getObjectsFromCollection } from '../firebase_utils';
import { argonTheme } from '../constants';

// TODO: pull types from firebase
const types = ['Healthcare', 'Restaurants', 'Activities']

var Map = require('../components/Map').default

const { width } = Dimensions.get('screen');

const Home = (props) => {


  function addResourceClick(nav) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        const uid = user.uid;
        nav.navigate('AddResource')
      } else {
        nav.navigate('RegisterPage')
      }
    })
  }

  const [pressed, setPressed] = React.useState({
    "Healthcare": false,
    "Restaurants": false,
    "Activities": false,
  })

  const navigation = props.navigation
  const [resourceData, setResourceData] = React.useState(null);
  const [filteredResources, setFilteredResources] = React.useState(null);
  const [results, setResults] = React.useState(0);

  React.useEffect(() => {
    if (resourceData == null) {
      getObjectsFromCollection('resources').then((x) => {
        const cleaned = x.filter(function(obj) {
          return obj.data.Location != "";
        })
        setResourceData(cleaned)
        setResults(cleaned.length)
      })
    }
  })

    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>

          {/* <Block flex style={styles.topBlock} /> */}
          {
            resourceData == null ? <View/> :
            <Map navigation={navigation} resources={resourceData}/>
          }
            {/* <Input placeholder="Search for activities, care providers, restaurants" 
                style={styles.input}/> */}

          {/* START:filter */}
          <Block flex style={styles.tagsHolder}>
            {types.map((x) => (
              // TODO: Change button style when pressed
              <Button style={pressed[x] === true ? styles.pressed : styles.labels} onPress={() => {
                let temp = pressed
                temp[x] = !temp[x]
                setPressed(temp)
                if (pressed[x]) {
                  var toShow = resourceData.filter(resource => resource.data.Type === x)
                  setFilteredResources(toShow)
                  setResults(toShow.length)
                } else {
                  setFilteredResources(null)
                  setResults(resourceData.length)
                }
              }}>
                <Text size={10} key={x}>
                  {x}
                </Text>
              </Button>
            ))}
          </Block>
          {/* END:filter */}

          <Button  style={styles.addResource} onPress={()=> addResourceClick(navigation)}>
              <Text style={styles.addResourceText}>
                Add a
                </Text>
                <Text style={styles.addResourceText}>
                Resource
                </Text>
          </Button>

          <Block flex style={styles.articles}>
            <Block flex style={styles.resourcesText}>
              <Text style={styles.headerText}>Resources Near You</Text>
              <Text style={styles.resultsHeader}> {results} results</Text>
            </Block>

            {
              ((resourceData !== null) && (filteredResources === null)) ? 
                resourceData.map((x, i) => (
                <Card item={{...x, key: i}} key={"result"+i} navigation={props.navigation} horizontal />
              ))
              :
              <View/>
            }

            {
              ((resourceData !== null) && (filteredResources !== null)) ? 
                filteredResources.map((x, i) => (
                <Card item={{...x, key: i}} key={"result"+i} navigation={props.navigation} horizontal />
              ))
              :
              <View/>
            }
          </Block>
        </ScrollView>
      </Block>
    )
}

const styles = StyleSheet.create({
  home: {
    width: width,
    marginVertical: 0,
  },
  scrollView : {
    marginVertical: 0,
  },
  articles: {
    width: width - 20,
    alignSelf: 'center',
    paddingVertical: theme.SIZES.BASE - 20,
    borderRadius: 9,
  },
  headerText: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 10,
    fontWeight: 'bold',
    borderRadius: 9,
    marginTop: 10
  },
  input: {
    // backgroundColor: "#FC3901",
    marginVertical: -430,
    width: width - 40,
    alignSelf: 'center',
    // opacity: 0.70,
  },
  topBlock: {
    backgroundColor: "#FC3901",
    marginVertical: 30,
    opacity: 0.7,
  },
  resourcesText: {
    // fontWeight: 'bold',
    flexDirection: 'row',
  },
  resultsHeader: {
    textAlign: "right",
    paddingLeft: 135,
    paddingVertical: 5,
    fontWeight: '200',
    fontSize: 12,
    paddingBottom: -5,
    marginTop: 10
  }, 
  addResource: {
    marginTop: -100,
    marginBottom: 20,
    alignSelf: 'flex-end',
    borderRadius: 100,
    width: 80,
    height: 80
  },
  addResourceText: {
    color: 'white'
  },
  tagsHolder: {
    flexDirection: "row",
    position: 'absolute',
    marginTop: 45,
    marginLeft: 10
  },
  labels: {
    // backgroundColor: "rgba(196, 196, 196, 0.5)",
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 12,
    margin: 5,
    padding: 5,
    flex: 1,
    overflow: 'hidden',
    opacity: 0.8,
    height: "80%",
  },
  pressed: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderRadius: 12,
    margin: 5,
    padding: 5,
    flex: 1,
    overflow: 'hidden',
    opacity: 0.8,
    height: "80%",
  }
});

export default Home;
