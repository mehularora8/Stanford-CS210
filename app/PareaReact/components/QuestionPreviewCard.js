import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Pressable, View} from 'react-native';
import { Block, Text, theme} from 'galio-framework';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { argonTheme, Images } from '../constants';
import { LinearProgress, Divider } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { format } from "date-fns";

//Data pieces needed: 
//Person: userid, profile picture, name, persona tag, 
//Review: date, rating value, upvotes, text, comments

//TODO 
//Make read more functional
//Adjust size of card based on amount of text 

const QuestionPreviewCard = (props) => {
    // console.log("IN REVIEW ")
  
    let ratingsObj = null
    let date = null
    let formattedDate = null
    // let longReview = false
    // if (props.text !== undefined) {
    //   if (props.text.length > 150) {
    //     longReview = true;
    //   }
    // }
    let tempUpvotes = 0
    if (props.item !== undefined) {
      if (props.item.date != undefined) {
        date = props.item.date.toDate()
        formattedDate = format(date, "MMM yyyy");
      }
      if (props.item.upvotes != undefined) {
          tempUpvotes = props.item.upvotes
      }
    }
    const [upvotes, setUpvotes] = React.useState(tempUpvotes)
    const [alreadyVoted, setAlreadyVoted] = React.useState(false)
    const [replies, setReplies] = React.useState(null)

  
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
                      <Text style={styles.identityTag}>
                        {/* rating date */}
                        {formattedDate !== null ? formattedDate : ""}
                      </Text>
                    </Block>
                    <View style={styles.reviewSubHeadlineContainer}>
                      <Text style={styles.identityTag}>
                        {/* user identity tag data */}
                          Mother
                      </Text>
                    </View>
                  </View>
                </Block>
             <Text style={styles.reviewText}>
               {/* review text data */}
               {props.text}
               {/* { longReview ? 
                 <Text style={styles.readMore}>...Read more</Text> : ""
               } */}
             </Text>
             <Block style={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", padding: '2%'}}>
            <Pressable onPress={() => { 
                if (!alreadyVoted) {
                    setUpvotes(upvotes + 1)
                    setAlreadyVoted(true)
                    //need to send these to firebase 
                } else {
                    setUpvotes(upvotes - 1)
                    setAlreadyVoted(false)
                }}}>
                 <Text style={{color: argonTheme.COLORS.PRIMARY, fontSize: 17, fontWeight: '700'}}>
                     + {upvotes > 0 ? upvotes : ""}
                </Text>
            </Pressable>
             <Pressable>
                <Text style={{color: argonTheme.COLORS.PRIMARY, fontSize: 13, fontWeight: '700'}}>Reply</Text>
            </Pressable>
             </Block>
             { replies !== null ? 
             <Block>
               <Divider />
                <Block style={{padding: '4%'}}>
                  <Block style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 13, fontWeight: '500'}}> 
                        {/* username data */}
                            Parea User
                        </Text>
                        <Text style={{fontSize: 13, fontWeight: '200'}}>
                          {/* rating date */}
                          {formattedDate !== null ? formattedDate : ""}
                        </Text>
                      </Block>
                  <Text style={{fontFamily: "Open Sans"}}>
                    This is a reply to your question 
                  </Text>
                  <Block style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
                    <View/>
                    <Pressable>
                      <Text style={{color: "#9999", fontSize: 13, fontWeight: '700'}}>See All Replies</Text>
                  </Pressable>
                  </Block>
                </Block>
             </Block>
             :
             <Block>
               {/* there are no replies */}
             </Block>
              }
     
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
      marginTop: 5
    }, 
    readMore: {
      color: argonTheme.COLORS.PRIMARY
    }
  });
  
  export default QuestionPreviewCard;