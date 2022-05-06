import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Pressable} from 'react-native';
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


//Data pieces needed: 
//Person: userid, profile picture, name, persona tag, 
//Review: date, rating value, upvotes, text, comments

//TODO 
//Make read more functional
//Adjust size of card based on amount of text 

deleteReview = (reviewId) => {
  console.log(reviewId)
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


  // const [currUser, setCurrUser] = useState(null);
  // const auth = getAuth();
  // useEffect(() => {
  //   if (!currUser) {
  //     onAuthStateChanged(auth, (guser) => {
  //       if (!currUser && guser && !guser.isAnonymous) {
  //         const uid = guser.uid
  //         getObject("users", uid).then(x => {
  //           setCurrUser(x);
  //         })
  //       }
  //     });
  //   }
  // })


    return (
          <Block flex style={styles.reviewPreviewCard}>
            <Block style={{display: "inline-block"}}>
                <Image
                      source={{ uri: props.userProfileRef ? props.userProfileRef : Images.ProfilePicture }}
                      style={styles.avatar}
                />
                <View >
                  <Block style={styles.reviewHeadlineContainer}>
                    <Text style={styles.username}> 
                    {/* username data */}
                        {props.username ? props.username : "Anonymous"}
                    </Text>
                    {/* Delete button */}
                    {props.currUserId === props.item.userId ? 
                    <Button 
                      style = {styles.backIcon}
                      onPress={() => {
                        // console.log(props.item.userId)
                        // console.log(props.currUserId)
                        console.log(props.id)
                        deleteReview(props.id)
                        // await deleteDoc(doc(db, "reviews", props.id));
                        }
                      }
                    >
                      <Ionicons name="trash-bin" size={12} color={argonTheme.COLORS.PRIMARY} style={{marginTop: "1.3%"}}/>
                    </Button>
                    : <View/>}
                    {/* user rating data value */}
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
  }
});

export default ReviewPreviewCard;