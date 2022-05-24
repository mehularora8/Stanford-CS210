import React, {Component} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, View, Dimensions, Platform, Linking, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import  ReviewSummaryCard from '../components/ReviewSummaryCard.js';
import ReviewPreviewCard from '../components/ReviewPreviewCard';
import ContactCard from '../components/ContactCard';
import { Divider } from 'react-native-elements';
import ReportCard from '../components/ReportCard';
import Card from '../components/Card'
import QandA from '../components/QandA';
import UnansweredQ from '../components/UnansweredQ';
import {getObjectsFromCollection, getObject, getReviews} from '../firebase_utils'
import { doc, onSnapshot } from "firebase/firestore";
import { thisTypeAnnotation } from '@babel/types';
import { getAuth, onAuthStateChanged } from "firebase/auth";

//TODO
//Make reviews only show up under appropriate resource id
//Sort reviews by Date 
//Only show first 3 reviews 
//Make review summary metadata accurate 


class Saved extends React.Component {

  state = {
    resources: []
  }

  pullSavedResourceIds = async () => {
    const auth = getAuth();
    let user = await getObject("users", auth.currentUser.uid)
    return (user && user.savedResources) ? user.savedResources : [];
  }

  renderSavedResources = async () => {
    let savedIds = await this.pullSavedResourceIds();
    let savedResources = await getObjectsFromCollection('resources');

    let resources = [];
    savedIds.forEach(id => {
      resources.push(savedResources.find(obj => { return obj["id"] === id }));
    })

    // console.log(savedIds, resources)

    this.setState({"resources": resources});
  }

  componentDidMount() {
    this.renderSavedResources();
  }

  render () {
    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block style={styles.titleContainer}>
            <View style={{flex: 1}}/>
          <Text style={styles.titleText}>
            Your Saved Resources 
          </Text>
          <View style={{flex: 1}}/>
        </Block>

        <ScrollView>
          { 
            this.state.resources.map((x, i) => (
              <Card num={i} item={{...x, key: i}} key={"result"+i} navigation={this.props.navigation} horizontal />
            ))
          }
          </ScrollView>
          <Block center padded>
            <Button onPress = {() => {
              this.renderSavedResources();
            }}>
              Refresh
            </Button>
          </Block>
      </Block>

    );
  }
  
}

const styles = StyleSheet.create({
  backIcon: {
    flex: 1, 
    marginLeft: 8
  },
  container: {
    backgroundColor: theme.COLORS.TERTIARY,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  titleContainer: {
    paddingTop: "12%",
    paddingBottom: "2%",
    alignItems: 'center',
    backgroundColor: argonTheme.COLORS.PRIMARY,
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    color: "white",
    fontSize: 17,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  topInfoCard: {
    flexDirection: "row",
  },
  addButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "95%",
    borderRadius: 12,
    marginLeft: "-1%"
  },
  topInfoImg: {
    width: "40%",
    height: 145,
    // backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: "1.5%"
  },
  topInfoText: {
    margin: "1.5%",
    height: 150,
    justifyContent: "space-between",
  },
  locationInfo: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  locationText: {
    fontSize: 13,
    fontFamily: "Open Sans",
  },
  tagsHolder: {
    flexDirection: "row",
  },
  labels: {
    backgroundColor: "rgba(196, 196, 196, 0.5)",
    borderRadius: 12,
    margin: 3,
    padding: 5,
    overflow: 'hidden',
    opacity: 0.6,
    height: "80%",
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  divider: {
    marginTop: 15,
    marginBottom: 5,
  },
  seeReviewsButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "95%",
    borderRadius: 12,
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    shadowColor: "rgba(153, 153, 153, 0.6)"
  },
});

export default Saved