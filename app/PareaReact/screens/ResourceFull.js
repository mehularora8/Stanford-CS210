import React, {Component, useState, useEffect} from 'react';
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
import {getObjectsFromCollection, getObject, 
        getReviews, getQuestions, putObject,
        getSavedIds} from '../firebase_utils'
import { thisTypeAnnotation } from '@babel/types';
import QuestionPreviewCard from '../components/QuestionPreviewCard';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Toast from 'react-native-toast-message'


function addReviewClick(nav, user, setUser, paramname, resourceId) {
  const auth = getAuth();
  onAuthStateChanged(auth, (guser) => {
    if (!guser || guser.isAnonymous) {
      setUser(null);
      nav.navigate("RegisterPage");
      return
    }
  })

  if (!user) return;

  const params = { 
    name: paramname,
    resourceId: resourceId,
    username: user.first,
    usertag: user.type != null ? user.type: "Parea User",  // defualt user tag
    userProfileRef: user.profileRef ? user.profileRef: null,  // set to default photo here
    userId: user.uid
  };
  Toast.show({
    type: 'info',
    text1: 'Review submitted!',
    visibilityTime: 2000
  });
  nav.navigate('AddReview', params);
}

//TODO
//Make reviews only show up under appropriate resource id
//Sort reviews by Date 
//Only show first 3 reviews 
//Make review summary metadata accurate 

refreshData = async (setReviewsArray, setQuestionsArray, setReviewsArrayPrev, setQuestionsArrayPrev, resourceId, setOverall) => {
  getReviews('resources', resourceId).then((x) => { //need to pass resource id here 
    setReviewsArray(x)
    if (x.length > 3) setReviewsArrayPrev(x.slice(0, 3))
    else setReviewsArrayPrev(x)
  })
  getQuestions('resources', resourceId).then((x) => {
    setQuestionsArray(x)
    if (x.length > 3) setQuestionsArrayPrev(x.slice(0, 3))
    else setQuestionsArrayPrev(x)
  })
  getObject('resources', resourceId).then((x) => {
    setOverall(x.Ratings.Overall)
  })

  Toast.show({
    type: 'info',
    text1: 'Refreshing!',
    visibilityTime: 2000
  });

  
}

saveResource = async (user, setUser, resourceId, nav) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (guser) => {
    if (!guser || guser.isAnonymous) {
      setUser(null);
      nav.navigate("RegisterPage");
      return
    }
  });
  

  if (user.savedResources.includes(resourceId)) return user;
  user.savedResources.push(resourceId);
  
  putObject('users', user.uid, user)

  /* REMOVE ME */
  // console.log("Saved resource --> user:", user)
  setUser(user);
}

unsaveResource = async (user, setUser, resourceId, nav) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (guser) => {
    if (!guser || guser.isAnonymous) {
      setUser(null);
      nav.navigate("RegisterPage");
      return
    }
  });

  if (user.savedResources.length == 0) {
    // console.log("Unsaving a resource from a user with no saved, weird...")
    return user;
  }
  let index = user.savedResources.indexOf(resourceId);
  if (index > -1) user.savedResources.splice(index, 1)

  putObject('users', user.uid, user)

  /* REMOVE ME */
  // console.log("UNNsaved resource --> user:", user)
  setUser(user);
}


const ResourceFull = (props) => {
    let navigation = props.navigation

    let resourceId = props.route.params.resourceId
    let name = props.route.params.name ? props.route.params.name : "Default";
    let tags = props.route.params.tags //note this must be taken out of route params and pulled from central data store

    const [savedIds, setSavedIds] = useState(null);
    const [reviewsArray, setReviewsArray] = useState(null);
    const [reviewsArrayPrev, setReviewsArrayPrev] = useState(null);
    const [resourceData, setResourceData] = useState(null);
    const [questionsArray, setQuestionsArray] = useState(null);
    const [questionsArrayPrev, setQuestionsArrayPrev] = useState(null);
    const [saved, setSaved] = useState(false);
    const [user, setUser] = useState(null);
    const [overall, setOverall] = useState(null);

    const auth = getAuth();


    useEffect(() => {
      if (reviewsArray == null) {
        getReviews('resources', resourceId).then((x) => { //need to pass resource id here 
          setReviewsArray(x)
          if (x.length > 3) setReviewsArrayPrev(x.slice(0, 3))
          else setReviewsArrayPrev(x)
        })
      }

      if (questionsArray == null) {
        getQuestions('resources', resourceId).then((x) => {
          setQuestionsArray(x)
          if (x.length > 3) setQuestionsArrayPrev(x.slice(0, 3))
          else setQuestionsArrayPrev(x)
        })
      }

      if (resourceData == null) {
        getObject('resources', resourceId).then((x) => {
          setResourceData(x)
        })
      }

      if (!user) {
        setSaved(false);
        onAuthStateChanged(auth, (guser) => {
          if (!user && guser && !guser.isAnonymous) {
            const uid = guser.uid
            getObject("users", uid).then(x => {
              setUser(x);
              setSaved(x.savedResources.indexOf(resourceId) > -1)
            })
          }
        });
      }
    })
    //if (resourceData != null ) {
      // console.log(resourceData.Address)
    //}


    
    return (
      <Block flex style={styles.container}>

        <StatusBar barStyle="light-content" />

        <Block style={styles.titleContainer}>
          <Ionicons name="md-chevron-back" size={24} style={styles.backIcon} color="white" onPress={() =>{ navigation.goBack() }}/>
          <View style={{flex: 1}}/>
          <Text style={styles.titleText}>
            {name}
          </Text>
          <View style={{flex: 1}}/>

          { 
            saved ? 
            <Pressable onPress={() => {
              unsaveResource(user, setUser, resourceId, navigation);
              setSaved(false);
            }}>
              <Ionicons name="bookmark" size={24} color="white" /> 
            </Pressable>
            :
            <Pressable onPress={() => {
              saveResource(user, setUser, resourceId, navigation);
              setSaved(true);
            }}>
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </Pressable>
          } 
        
          <View style={{flex: .25}}/>
          <Ionicons name="refresh" size={24} color="white" onPress={() => refreshData(setReviewsArray, setQuestionsArray, setReviewsArrayPrev, setQuestionsArrayPrev, resourceId, setOverall)}/>
          <View style={{flex: .25}}/>
        </Block> 

        <ScrollView>

          <Block>
            <Block style={styles.topInfoCard}>

                <Block style={styles.topInfoImg}>
                  <Image source={{url: props.route.params.image}} style={{width: 145, height: 145}} />
                </Block> 

                <Block flex style={styles.topInfoText}>
                  <Block>
                    <Text>
                      {props.route.params.type}
                    </Text>
                  </Block>

                  <Block style={styles.locationInfo}>
                    <Ionicons name="location-outline" size={24} color="black" style={{marginTop: "1.3%"}}/>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.locationText}> 
                        {resourceData && resourceData.Address ? resourceData.Address.substring(0, resourceData.Address.indexOf(',') + 1) : ""}
                      </Text>
                      <Text style={styles.locationText}> 
                        {resourceData && resourceData.Address ? resourceData.Address.substring(resourceData.Address.indexOf(',') + 2) : ""}
                      </Text>
                    </View>
                  </Block>

                  <Block flex style={styles.tagsHolder}>
                    {
                      tags.map((x) => (
                        <Text size={10} key={x} style={styles.labels}>
                          {x}
                        </Text>
                      ))
                    }
                  </Block> 
              
                  <Button style={styles.addButton} onPress={() => {
                      addReviewClick(navigation, user, setUser, props.route.params.name, resourceId);
                    }}>
                    ADD A REVIEW
                  </Button>
                </Block> 
            </Block>

         
            
            <ReviewSummaryCard overallRating={overall} resourceId={resourceId}/>
            
            

            {
              !reviewsArrayPrev || reviewsArrayPrev.length == 0 ? 
              <Block>
                <Text style={{padding: '2%', marginLeft: '1%', marginRight: '1%'}}>
                  No reviews yet! Add a review to help the community learn about {name}.
                </Text>
              </Block>
              :
              <Block>
           
                {
                  reviewsArrayPrev.map((x, i) => (
                    <ReviewPreviewCard item={{...x, key: "rpciresult" + i}} key={"rpcresult"+i}
                      text={x.reviewText}
                      username={x.username}
                      tag={x.usertag}
                      profileImage={x.userProfileRef}
                      navigation={navigation} 
                      currUserId={user ? user.uid : null}
                      resourceId={resourceId}
                    />
                  ))
                }
              <Button style={styles.seeReviewsButton} onPress={() => navigation.navigate('AllReviews', {reviewsArray: reviewsArray, name: props.route.params.name, resourceId: resourceId, currUserId: user ? user.uid : null})}>
                  See all reviews
              </Button>
              </Block>
            }

            <Divider style={styles.divider}/>
            <QandA resourceId={resourceId} nav={navigation} user={user}/>
            { 
              !questionsArrayPrev || questionsArrayPrev.length == 0 ? 
              <Text style={{padding: '2%', marginLeft: '1%', marginRight: '1%'}}> Get to know {name} by asking a question!</Text>
              : 
              <Block>
                  {
                    questionsArrayPrev.map((x, i) => (
                      <QuestionPreviewCard item={{...x, key: "qairesult" + i}} key={"qaresult" + i}
                        text= {x.question}
                        resourceId={resourceId}
                        questionData={x}
                        navigation={navigation} 
                      />
                    ))
                  }
                <Button style={styles.seeReviewsButton} onPress={() => navigation.navigate('AllQuestions', {questionsArray: questionsArray, name: props.route.params.name, resourceId: resourceId})}>
                  See all questions
              </Button>
              </Block>
            }



            <Divider style={styles.divider} />
            {
              resourceData && resourceData.Contact  && resourceData.Contact != "" ?
              <Block>
            <ContactCard phone={resourceData && resourceData.Contact ? resourceData.Contact : ""}/>
            <Divider style={styles.divider}/>
            </Block>
            :
            <Block/>
            }
            <ReportCard resourceName={resourceData && resourceData.Name ? resourceData.Name : ""} resourceId={resourceId}/>
          </Block>
        </ScrollView>
        <Toast
          position='top'
          topOffset={75}
        />
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
    marginTop: "3%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: '2%'
  },
  locationText: {
    flex: 1,
    flexWrap: "wrap",
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
    padding: 6,
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