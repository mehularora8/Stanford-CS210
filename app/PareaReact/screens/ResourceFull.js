import React, {Component} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, View, Dimensions, Platform, Linking, ScrollView, Pressable } from 'react-native';
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
import {getObjectsFromCollection, getObject, getReviews, getQuestions} from '../firebase_utils'
import { thisTypeAnnotation } from '@babel/types';
import QuestionPreviewCard from '../components/QuestionPreviewCard';

//TODO
//Make reviews only show up under appropriate resource id
//Sort reviews by Date 
//Only show first 3 reviews 
//Make review summary metadata accurate 

const ResourceFull = (props) => {

    const [reviewsArray, setReviewsArray] = React.useState(null);
    const [reviewsArrayPrev, setReviewsArrayPrev] = React.useState(null);
    const [resourceData, setResourceData] = React.useState(null);
    const [questionsArray, setQuestionsArray] = React.useState(null);
    const [questionsArrayPrev, setQuestionsArrayPrev] = React.useState(null);
    const [saved, setSaved] = React.useState(false);


    let resourceId = props.route.params.resourceId
    console.log(props)
    console.log(resourceId)
    let name = props.route.params.name ? props.route.params.name : "Default";
    //let id = this.props.route.params.id;
    let tags = props.route.params.tags //note this must be taken out of route params and pulled from central data store

    React.useEffect(() => {
      if (reviewsArray == null) {
        getReviews('resources', resourceId).then((x) => { //need to pass resource id here 
          setReviewsArray(x)
          if (x.length > 3) {
            setReviewsArrayPrev(x.slice(0,3))
          } else {
            setReviewsArrayPrev(x)
          }
        })
      }
    })

    React.useEffect(() => {
      if (questionsArray == null) {
        getQuestions('resources', resourceId).then((x) => {
          setQuestionsArray(x)
          if (x.length > 3) {
            setQuestionsArrayPrev(x.slice(0,3))
          } else {
            setQuestionsArrayPrev(x)
          }
        })
      }
    })

    React.useEffect(() => {
      if (resourceData == null) {
        getObject('resources', resourceId).then((x) => {
          setResourceData(x)
        })
      }
    })
 

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
          { saved ? 
          //ADD CODE TO SAVE / UNSAVE RESOURCES TO FIREBASE IN THESE onPRESS methods :) 
            <Pressable onPress={() => setSaved(false)}>
              <Ionicons name="bookmark" size={24} color="white" /> 
              </Pressable>
          :
            <Pressable onPress={() => setSaved(true)}>
              <Ionicons name="bookmark-outline" size={24} color="white" />
          </Pressable>
          } 
          <View style={{flex: 1}}/>
        </Block>
        <ScrollView>

          <Block flex>
            <Block flex style={styles.topInfoCard}>
                <Block style={styles.topInfoImg}>

                  <Image source={{url: props.route.params.image}} style={{width: 145, height: 145}} />
                </Block>
                <Block flex style={styles.topInfoText}>
                  <Block>
                    <Text>
                      {props.route.params.type}
                    </Text>
                  </Block>
                  <Block flex style={styles.locationInfo}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Block flex style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={styles.locationText}> {resourceData !== null? resourceData.City : ""}</Text>
                      <Entypo name="dot-single" size={24} color="black" />  
                      <Text style={styles.locationText}>
                          3.9 mi
                      </Text>
                    </Block>
                  </Block>
                  <Block flex style={styles.tagsHolder}>
                    {tags.map((x) => (
                      <Text size={10} key={x} style={styles.labels}>
                        {x}
                      </Text>
                    ))}
                  </Block>
              
                  <Button style={styles.addButton} onPress={() => {
                      props.navigation.navigate('AddReview', { name: props.route.params.name });
                    }}>
                  ADD A REVIEW
                </Button>
                </Block>
                </Block> 
                {/* end of topInfoText */}
            {/* end of topInfoCard */}
        
            <ReviewSummaryCard resourceId={resourceId}/>
            {
              reviewsArrayPrev === null ? 
              <Block>
                <Text>
                "No reviews yet! Add a review to help the community learn."
                </Text>
              </Block>
              :
              <Block>
                {
                  reviewsArrayPrev.map((x, i) => (
                    <ReviewPreviewCard item={{...x, key: i}} key={"result"+i}
                      text = {x.reviewText}
                      navigation={props.navigation} />
                  ))
                }
                {/* <ReviewPreviewCard />
                <ReviewPreviewCard/> */}
              </Block>
            }
            <Button style={styles.seeReviewsButton} onPress={() => props.navigation.navigate('AllReviews', {reviewsArray: reviewsArray, name: props.route.params.name})}>
                    See all reviews
            </Button>
            <Divider style={styles.divider}/>
            <QandA resourceId={resourceId} />
            { questionsArrayPrev === null ? <Text>"No questions yet. Help the community learn about " + name + " by asking a question." </Text>: 
              <Block>
                  {
                    questionsArrayPrev.map((x, i) => (
                      <QuestionPreviewCard item={{...x, key: i}} key={"result"+i}
                        text= {x.question}
                        navigation={props.navigation} />
                    ))
                  }
              </Block>
            }
            <Button style={styles.seeReviewsButton} onPress={() => props.navigation.navigate('AllQuestions', {questionsArray: questionsArray, name: props.route.params.name})}>
                    See all questions
            </Button>
            <Divider style={styles.divider} />
            <ContactCard />
            <Divider style={styles.divider}/>
            <ReportCard resourceName={resourceData !== null ? resourceData.Name : ""} resourceId={resourceId}/>
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

export default ResourceFull