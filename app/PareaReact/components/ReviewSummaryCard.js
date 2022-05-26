import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress, Divider } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import {getObjectsFromCollection, getObject, getReviews} from '../firebase_utils'

//TO DO: Make read more a pressable opacity that extends the size of the card 

const ReviewSummaryCard = (props) => {

  const [reviewsSummaryArray, setSummary] = useState(null);

  useEffect(() => {
    if (!reviewsSummaryArray ) {
      getObject('resources', props.resourceId).then((x) => { 
        if (x) {
          setSummary(x.Ratings || {"Overall": 0})
        } else {
          setSummary({"Overall": 0})
        }
      })
    } 
  else if (reviewsSummaryArray.Overall != props.overallRating) { //review was deleted, refresh
    getObject('resources', props.resourceId).then((x) => { 
      if (x) {
        setSummary(x.Ratings || {"Overall": 0})
      } else {
        setSummary({"Overall": 0})
      }
    })
  }

  })  

  return (
    { 
        ...reviewsSummaryArray ? (
      <Block flex style={styles.reviewSummaryCard}>
        <Text style={styles.title}>
          Reviews
        </Text>
        <Block flex style={styles.overallRatingContainer}>
          <Rating 
            type="custom"
            ratingColor="#fc3901"
            ratingBackgroundColor="#999999"
            tintColor="#f2f2f2"
            fractions={1}
            startingValue={ reviewsSummaryArray.Overall || 0 }
            style={styles.rating}
            imageSize={25}
            readonly
          />
          <Text style={styles.overallRatingText}>
            {/* overall rating */}
            {reviewsSummaryArray.Overall ? reviewsSummaryArray.Overall.toFixed(1) : ""} 
            &nbsp;
            –
              {reviewsSummaryArray.reviewCount ? "  " + reviewsSummaryArray.reviewCount + " reviews" : "  0 reviews"}
          </Text>
        </Block>

        <Block flex>
          <Block style={styles.subReviewContainer}>
            <Text style={styles.subReviewText}  >
                Safety
            </Text>
            <View style={styles.subReviewBarContainer}>
              <ProgressBar 
                progress={reviewsSummaryArray.Safety ? reviewsSummaryArray.Safety / 5 : 0} 
                width={200} 
                color={argonTheme.COLORS.BLACK} 
                height={3}
              />
              <Text style={styles.subReviewNumVal}>
                  {reviewsSummaryArray.Safety ? reviewsSummaryArray.Safety.toFixed(1) : ""}
              </Text>
            </View>
          </Block>
        </Block>

          <Block style={styles.subReviewContainer}>
            <Text style={styles.subReviewText}>
              Inclusion
            </Text>
            <View style={styles.subReviewBarContainer}>
              <ProgressBar 
                progress={reviewsSummaryArray.Accessibility ? reviewsSummaryArray.Accessibility / 5 : 0} 
                width={200} 
                color={argonTheme.COLORS.BLACK} 
                height={3} 
              />
              <Text style={styles.subReviewNumVal}>
                {reviewsSummaryArray.Accessibility? reviewsSummaryArray.Accessibility.toFixed(1) : ""}
              </Text>
            </View>
          </Block>
          <Block style={styles.subReviewContainer}>
            <Text style={styles.subReviewText}>
              Noise Level 
            </Text>
            <View style={styles.subReviewBarContainer}>
              <ProgressBar 
                progress={reviewsSummaryArray.Environment ? reviewsSummaryArray.Environment / 5 : 0} 
                width={200} 
                color={argonTheme.COLORS.BLACK} 
                height={3} 
              />
              <Text style={styles.subReviewNumVal}>
                {reviewsSummaryArray.Environment ? reviewsSummaryArray.Environment.toFixed(1) : ""}
              </Text>
            </View>
          </Block>
          <Block style={styles.subReviewContainer}>
            <Text style={styles.subReviewText}>
            Communication
            </Text>
            <View style={styles.subReviewBarContainer}>
              <ProgressBar 
                progress={reviewsSummaryArray.Communication ? reviewsSummaryArray.Communication / 5 : 0} 
                width={200} 
                color={argonTheme.COLORS.BLACK} 
                height={3} 
              />
              <Text style={styles.subReviewNumVal}>
                  {reviewsSummaryArray.Communication ? reviewsSummaryArray.Communication.toFixed(1) : ""}
              </Text>
            </View>
          </Block>
        </Block>
    ) : (<Block flex style={styles.reviewSummaryCard} />)
  });
}

const styles = StyleSheet.create({
  reviewSummaryCard: {
    minHeight: 114,
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
    marginBottom: 5,
  },
  overallRatingText: {
    fontSize: 15,
    marginLeft: 5,
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
  rating: {
    

  }
});

export default ReviewSummaryCard;