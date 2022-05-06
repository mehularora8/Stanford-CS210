import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Pressable, Modal} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { argonTheme, Images } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { format } from "date-fns";
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import {getObjectsFromCollection, getObject, getReviews, deleteReview} from '../firebase_utils'

//Data pieces needed: 
//Person: userid, profile picture, name, persona tag, 
//Review: date, rating value, upvotes, text, comments

//TODO 
//Make read more functional
//Adjust size of card based on amount of text 

deleteRev = (reviewId, resourceId) => {
  deleteReview(resourceId, reviewId)
}

const ReviewPreviewCard = (props) => {

  let ratingsObj = null
  let date = null
  let formattedDate = null
  let longReview = false
  if (props.text !== undefined) {
    if (props.text.length > 150) {
      longReview = true;
    }
  }
  if (props.item !== undefined) {
    ratingsObj = props.item.reviewRatings
    if (props.item.date != undefined) {
      date = props.item.date.toDate()
      formattedDate = format(date, "MMM yyyy");
    }
  }

  const [modalVisible, setModalVisible] = React.useState(false);


    return (
          <Block flex style={styles.reviewPreviewCard}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                
                    <Text style={styles.modalText}>Would you like to delete your review?</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}} >
                    <View style={{flex: 1}}/>
                      <Pressable
                            style={[styles.button, styles.buttonReport]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>Cancel</Text>
                          </Pressable>
                        <View style={{flex: 1}}/>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                              deleteRev(props.item.reviewId, props.resourceId, props)
                              setModalVisible(!modalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Delete Review</Text>
                        </Pressable>
                        <View style={{flex: 1}}/>
                    </View>
                  </View>
                </View>
              </Modal>

            <Block style={{display: "inline-block"}}>
                <Image
                      source={{ uri: props.userProfileRef ? props.userProfileRef : Images.ProfilePicture }}
                      style={styles.avatar}
                />
                <View >
                  <Block style={styles.ellipses}>
                      
                                       
                                          {/* Delete button */}
                    {props.currUserId === props.item.userId ? 
      
                      <Ionicons name="ellipsis-horizontal-sharp" size={24} color="#999" onPress={() => {
                      setModalVisible(!modalVisible)}}/>
                     
                    : <View/>}
                  </Block>
                  <Block style={styles.reviewHeadlineContainer}>
                    <Text style={styles.username}> 
                    {/* username data */}
                        {props.username ? props.username : "Anonymous"}
                    </Text>

                      <Rating 
                        type="custom"
                        ratingColor="#fc3901"
                        ratingBackgroundColor="#999999"
                        fractions={1}
                        startingValue={ratingsObj === undefined ? 0 : ratingsObj.Overall}
                        imageSize={15}
                        readonly  
                        />
                 
                  </Block>
                  <View style={styles.reviewSubHeadlineContainer}>
                    <Text style={styles.identityTag}>
                      {/* user identity tag data */}
                      {props.tag ? props.tag : ""}
                    </Text>
                    <Text style={styles.identityTag}>
                      {/* rating date */}
                      {formattedDate !== null ? formattedDate : ""}
                    </Text>
                  </View>
                </View>
              </Block>
           <Text style={styles.reviewText}>
             {/* review text data */}
             {props.text}

             {/* NOTE: not shortening reviews for now */}
             {/* { longReview ? 
               <Text style={styles.readMore}>...Read more</Text> : ""
             } */}
           </Text>
          </Block>
        );
}

const styles = StyleSheet.create({
  reviewPreviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "2%",
    padding: "2%"
  },
  username: {
    fontSize: 15,
    // fontWeight: "300",
  }, 
  identityTag: {
    fontSize: 13,
    fontWeight: "200",
  },
  overallRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -2,

  },
  overallRatingText: {
    fontSize: 15,
    paddingBottom: 5,
    fontFamily: "Open Sans",
  },
  reviewHeadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 67,
    marginRight: 5,
    marginTop: -75
  },
  ellipses: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: -65,
    marginRight: 5,
    zIndex: 10
  },
  reviewSubHeadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 67,
    marginRight: 5,
    marginTop: -35
  },
  subReviewText: {
    fontFamily: "Open Sans",
    fontSize: 13,
  },
  starContainer: {
    display: 'flex',
    alignSelf: "flex-start",
    marginBottom: 8,
  }, 
  subReviewBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }, 
  subReviewNumVal: {
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 11,
    marginLeft: 4
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 62,
    borderWidth: 0,
  },
  reviewText: {
    fontFamily: "Open Sans",
    fontSize: 13,
    marginTop: 5,
    paddingLeft: 5,
  }, 
  backIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    padding: 0,
    backgroundColor: argonTheme.COLORS.WHITE,
    elevation: 0,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.PRIMARY
  },
  readMore: {
    color: argonTheme.COLORS.PRIMARY
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    paddingLeft: '8%',
    paddingRight: '8%'
  },
  buttonReport: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default ReviewPreviewCard;