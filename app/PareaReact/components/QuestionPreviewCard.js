import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Pressable, View, Modal} from 'react-native';
import { Block, Text, theme} from 'galio-framework';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { argonTheme, Images } from '../constants';
import { LinearProgress, Divider } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { format } from "date-fns";
import { putObject, getObject, getObjectsFromCollection } from "../firebase_utils";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { TextInput } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
//Data pieces needed: 
//Person: userid, profile picture, name, persona tag, 
//Review: date, rating value, upvotes, text, comments


//edits the question in firebase to inc/dec upvotes by one
function handleUpvote (increment) {
  //path to question 

  //new question object 

  //putObject 
}

async function submitReply(props, user, text) {
  if (!props.resourceId) return;
  const reply = {
    replyId: uuid.v4(),
    date: new Date(),
    replyText: text,
    userId: user.uid,
    username: user.first,
  }
  const collectionPath = 'resources/' + props.resourceId + '/questions/' + props.questionData.questionId + '/replies';
  console.log("attempting to add", reply)
  putObject(collectionPath, reply.replyId, reply)
}



const QuestionPreviewCard = (props) => {
    // console.log("IN REVIEW ")
    const [user, setUser] = useState(props.user)
    const auth = getAuth()
  
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
          tempUpvotes = props.questionData.upvotes
      }
    }
    const [upvotes, setUpvotes] = React.useState(tempUpvotes)
    const [alreadyVoted, setAlreadyVoted] = React.useState(false)
    const [replies, setReplies] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [text, onChangeText] = React.useState(null);

    useEffect(() => {
      if (!user) {
        onAuthStateChanged(auth,(guser) => {
          if (!user && guser && !guser.isAnonymous) {
            const uid = guser.uid
            getObject("users", uid).then(x => {
              // console.log("just set the user from:", user, "to", x)
              setUser(x);
            })
          }
        });
      }
      if (replies == null) {
        const collectionPath = 'resources/' + props.resourceId + '/questions/' + props.questionData.questionId + '/replies';
        getObjectsFromCollection(collectionPath).then((x) => {
          setReplies(x)
        })
      }
    })



    // submitReply = async () => {
    //   if (!props.resourceId) return;
    //   const reply = {
    //     replyId: uuid.v4(),
    //     date: new Date(),
    //     replyText: text,
    //     userId: user.uid,
    //     username: user.first,
    //   }
    //   const collectionPath = 'resources/' + props.resourceId + '/questions/' + props.questionData.questionId + '/replies';
    //   console.log("attempting to add", reply)
    //   putObject(collectionPath, reply.replyId, reply)
    // }
  
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
                    <Text style={styles.modalText}>Answer <Text style={{fontWeight: '600'}}>{props.questionData.username}</Text>'s question: 
                    <Text style={{fontWeight: '600', color: 'black'}}> {props.questionData.question}</Text>
                    </Text>
                    <TextInput
                        style={{marginBottom: '3%', borderColor: 'gray', borderStyle: 'solid', borderWidth: 2, borderRadius: 12, padding: '5%', width: 250}}
                        onChangeText={onChangeText}
                        multiline
                        numberOfLines={4}
                        value={text}
                        placeholder="What would you like to reply?"
                        />
                    <View style={{display: 'flex', flexDirection: 'row'}} >
                        <View style={{flex: 1}}/>
                          <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                              >
                                <Text style={styles.textStyle}>Cancel</Text>
                              </Pressable>
                            <View style={{flex: 1}}/>
                            <Pressable
                              style={[styles.button, styles.buttonReport]}
                              onPress={() => {
                                  submitReply(props, user, text)
                                  setModalVisible(!modalVisible)
                              }}
                            >
                              <Text style={styles.textStyle}>Submit Answer</Text>
                            </Pressable>
                            <View style={{flex: 1}}/>
                        </View>
                      </View>
                    </View>
              </Modal>
              <Block style={{display: "inline-block"}}>
                  <Image
                        source={{ uri: Images.ProfilePicture }} //profile picture data
                        style={styles.avatar}
                  />
                  <View >
                    <Block style={styles.reviewHeadlineContainer}>
                      <Text style={styles.username}> 
                      {/* username data -- Anonymous if there's no username */}
                          {props.questionData.username ? props.questionData.username : "Anonymous"}
                      </Text>
                      <Text style={styles.identityTag}>
                        {/* rating date */}
                        {formattedDate !== null ? formattedDate : ""}
                      </Text>
                    </Block>
                    <View style={styles.reviewSubHeadlineContainer}>
                      <Text style={styles.identityTag}>
                        {/* user identity tag data */}
                          {props.questionData.userType}
                      </Text>
                    </View>
                  </View>
                </Block>
             <Text style={styles.reviewText}>
               {/* review text data */}
               {props.questionData.question}
               {/* { longReview ? 
                 <Text style={styles.readMore}>...Read more</Text> : ""
               } */}
             </Text>
             <Block style={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", padding: '2%'}}>
            <Pressable onPress={() => { 
                if (!alreadyVoted) {
                    setUpvotes(upvotes + 1)
                    setAlreadyVoted(true)
                    handleUpvote(true)
                } else {
                    setUpvotes(upvotes - 1)
                    setAlreadyVoted(false)
                    handleUpvote(false)
                }}}>
                 <Text style={{color: argonTheme.COLORS.PRIMARY, fontSize: 17, fontWeight: '700'}}>
                     + {upvotes > 0 ? upvotes : ""}
                </Text>
            </Pressable>
             <Pressable onPress={() => {
                const auth = getAuth();
                onAuthStateChanged(auth, (guser) => {
                  if (!guser || guser.isAnonymous) {
                    setUser(null);
                    props.navigation.navigate("RegisterPage");
                    return
                  }
                })
                if (!user) return;
               setModalVisible(true)}
            }>
                <Text style={{color: argonTheme.COLORS.PRIMARY, fontSize: 13, fontWeight: '700'}}>Reply</Text>
            </Pressable>
             </Block>
             { replies !== null ? 
             <Block>
               {replies.map((x, i) => (
                <Block key={"question" + i}>
               <Divider />
                <Block style={{padding: '4%'}} key={i}>
                  <Block style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 13, fontWeight: '500'}}> 
                        {/* username data */}
                            {x.data.username}
                        </Text>
                        <Text style={{fontSize: 13, fontWeight: '200'}}>
                          {/* rating date */}
                          {formattedDate !== null ? formattedDate : ""}
                        </Text>
                      </Block>
                  <Text style={{fontFamily: "Open Sans"}}>
                    {x.data.replyText}
                  </Text>
                  </Block>
                </Block>
                ))}
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
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
    
  });
  
  export default QuestionPreviewCard;