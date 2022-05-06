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
import QandA from '../components/QandA';
import UnansweredQ from '../components/UnansweredQ';
import {getObjectsFromCollection, getObject, getReviews} from '../firebase_utils'
import { thisTypeAnnotation } from '@babel/types';

//TODO
//Make reviews only show up under appropriate resource id
//Sort reviews by Date 
//Only show first 3 reviews 
//Make review summary metadata accurate 


const AllReviews = (props) => {


    let name = props.route.params.name ? props.route.params.name : "Default";
    let reviewsArray = props.route.params.reviewsArray ? props.route.params.reviewsArray : null; 
    let currUserId = props.route.params.currUserId;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block style={styles.titleContainer}>
        <Ionicons name="md-chevron-back" size={24} style={styles.backIcon} color="white" onPress={() =>{  props.navigation.goBack()}}/>
          <View style={{flex: 1}}/>
          <Text style={styles.titleText}>
            {name}
          </Text>
          <View style={{flex: 1}}/>
          {/* <Ionicons name="bookmark-outline" size={24} color="white" /> */}
          <View style={{flex: 1}}/>
        </Block>
        <Block>
          <Text style={{fontSize: 17, padding: '3%'}}>
            Viewing all <Text style={{fontWeight: '600'}}>{reviewsArray !== null ? reviewsArray.length : "" } </Text>reviews 
          </Text>
        </Block>
        <ScrollView>
          <Block flex>
            {
              reviewsArray === null ? 
              <Block>
                <Text>
                "No reviews yet! Add a review to help the community learn."
                </Text>
              </Block>
              :
              <Block>
                {
                  reviewsArray.map((x, i) => (
                    <ReviewPreviewCard item={{...x, key: i}} key={"result"+i}
                      text = {x.reviewText}
                      navigation={props.navigation} 
                      profileImage={x.userProfileRef}
                      tag={x.usertag}
                      username={x.username}
                      currUserId={currUserId ? currUserId : null}
                      />
                  ))
                }
        
              </Block>
            }
            </Block>
          </ScrollView>
      </Block>
    );
  
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

export default AllReviews