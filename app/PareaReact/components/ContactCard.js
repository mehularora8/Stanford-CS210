import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';

//data needed: resource id, pull in phone number
class ContactCard extends React.Component {
  render() {
    return (
          <Block flex style={styles.contactPreviewCard}>
              <Text style={styles.title}> Contact</Text>
              <Button style={styles.contactButton}>
                  <Text style={styles.phoneNumber}>
                  (650) 321-6448
                  </Text>

              </Button>
          </Block>
        );
    }  
}

const styles = StyleSheet.create({
  contactPreviewCard: {
    minHeight: 150,
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
  contactButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "45%",
    borderRadius: 12,
    marginLeft: -1,
  },
  phoneNumber: {
      fontFamily: "Open Sans",
      fontSize: 15,
      color: "white"
  }
});

export default ContactCard;