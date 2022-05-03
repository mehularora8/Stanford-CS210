import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { argonTheme, Images } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { format } from "date-fns";

//Data pieces needed: 
//Person: userid, profile picture, name, persona tag, 
//Review: date, rating value, upvotes, text, comments

//TODO 
//Make read more functional
//Adjust size of card based on amount of text 

const ReviewPreviewCard = (props) => {
  console.log("IN REVIEW ")

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



    return (
          <Block flex style={styles.reviewPreviewCard}>
            <Block style={{display: "inline-block"}}>
                <Image
                      source={{ uri: Images.ProfilePicture }} //profile picture data
                      style={styles.avatar}
                />
                <View >
                  <Block style={styles.reviewHeadlineContainer}>
                    <Text style={styles.username}> 
                    {/* username data */}
                        Rosie
                    </Text>
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
                        Mother
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
  readMore: {
    color: argonTheme.COLORS.PRIMARY
  }
});

export default ReviewPreviewCard;