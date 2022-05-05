import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Modal} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { TextInput } from 'react-native-gesture-handler';
import UnansweredQ from './UnansweredQ';
import uuid from 'react-native-uuid';
import { putObject, getObject } from "../firebase_utils";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

//data: questions: date, text, user, upvotes 
//answer(s): date, text, user, upvotes 
const { width, height } = Dimensions.get("screen");

const QandA = (props) => {
    const auth = getAuth();
    const [text, onChangeText] = useState(null);
    const [user, setUser] = useState(props.user)

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
    })

    console.log(user)
    const nav = props.nav

    submitQuestion = async (test) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (guser) => {
        if (!guser || guser.isAnonymous) {
          setUser(null);
          nav.navigate("RegisterPage");
          return
        }
      })
      if (!user) return;
      
      if (!props.resourceId) return;
      const question = {
        questionId: uuid.v4(),
        date: new Date(),
        question: text,
        userId: user.uid,
        username: user.first,
        userType: user.type,
        upvotes: 0
      }
      console.log(question)
  
      const collectionPath = 'resources/'  + props.resourceId + '/questions';
      console.log("Attempting to add", question);
      putObject(collectionPath, question.questionId, question);
      // console.log("ADDED");
    }

   

    return (
          <Block flex style={styles.contactPreviewCard}>
              <Text style={styles.title}> Q & A</Text>
              <View style={{display: "flex", width: '80%', flexDirection: "row", alignItems: "center"}}>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="What would you like to know?"
                />
                <Button style={styles.askButton} onPress={() => {
                        submitQuestion()
                  }}>
                    Ask
                </Button>
               
            </View>
          </Block>
        );   
}

const styles = StyleSheet.create({
  contactPreviewCard: {
    borderRadius: 12,
    margin: "2%",
    padding: "2%"
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
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
  subReviewContainer: {
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  input: {
    height: 40,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    minWidth: width*3/4,
  },
  askButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    borderRadius: 12,
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    shadowColor: "rgba(153, 153, 153, 0.6)",
    height: 40,
    width: width*1/6,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default QandA;