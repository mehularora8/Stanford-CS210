import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';

class ReportCard extends React.Component {
  render() {
    return (
          <Block flex style={styles.contactReportCard}>
              <Text style={styles.title}> Report </Text>
              <View style={styles.buttonHolder}>
                <View style={{display: "flex", flexDirection:"row"}}>
                    <Button style={styles.seeReviewsButton}>
                    Not operating
                    </Button>
                    <Button style={styles.seeReviewsButton}>
                    Incorrect info
                    </Button>
                </View>
                <View style={{display: "flex", flexDirection:"row"}}>
                    <Button style={styles.seeReviewsButton}>
                    Missing info
                    </Button>
                    <Button style={styles.seeReviewsButton}>
                    Other
                    </Button>
                </View>
            </View>
          </Block>
        );
    }  
}

const styles = StyleSheet.create({
  contactReportCard: {
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
  seeReviewsButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "45%",
    borderRadius: 12,
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    shadowColor: "rgba(153, 153, 153, 0.6)"
  },
  buttonHolder: {
      marginLeft: -5,
  }
});

export default ReportCard;