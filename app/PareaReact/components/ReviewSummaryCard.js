import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress, Divider } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import {getObjectsFromCollection, getObject, getReviews} from '../firebase_utils'

const ReviewSummaryCard = (props) => {

  const [reviewsSummaryArray, setReviewsSummaryArray] = React.useState(null);

  React.useEffect(() => {
    if (reviewsSummaryArray == null) {
      getObject('resources', props.resourceId).then((x) => { //need to pass resource id here 
        setReviewsSummaryArray(x.Ratings)
      })
    }
  })

    return (
          <Block flex style={styles.reviewSummaryCard}>
            <Text style={styles.title}>
              Reviews
            </Text>
            <Block flex style={styles.overallRatingContainer}>
              {/* <AirbnbRating 
                showRating={false}
                isDisabled={true}
                selectedColor={argonTheme.COLORS.PRIMARY}
                size={20}
                defaultRating={4.6}
                fractions={2}
                starContainerStyle={styles.starContainer}
              /> */}
              <Rating 
                type="custom"
                ratingColor="#fc3901"
                ratingBackgroundColor="#999999"
                tintColor="#f2f2f2"
                fractions={1}
                startingValue={4.5}
                style={styles.rating}
                imageSize={25}
                readonly  />
              <Text style={styles.overallRatingText}>
                {/* overall rating */}
                {reviewsSummaryArray !== null? reviewsSummaryArray.Overall : "" }  [{reviewsSummaryArray !== null ? reviewsSummaryArray.reviewCount : ""}]
              </Text>
    
            </Block>
            <Block flex>
              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}  >
                    Safety
                </Text>
                <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.97} width={200} color={argonTheme.COLORS.BLACK} height={3} />
                  <Text style={styles.subReviewNumVal}>
                      {reviewsSummaryArray !== null? reviewsSummaryArray.Safety: "" }
                  </Text>
                </View>
              </Block>

              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}>
                  Accessibility 
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.88} width={200} color={argonTheme.COLORS.BLACK} height={3} />
                  <Text style={styles.subReviewNumVal}>
                    {reviewsSummaryArray !== null? reviewsSummaryArray.Accessibility : "" }
                  </Text>
                </View>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Environment
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.93} width={200} color={argonTheme.COLORS.BLACK} height={3} />
                  <Text style={styles.subReviewNumVal}>
                    {reviewsSummaryArray !== null? reviewsSummaryArray.Environment : "" }
                  </Text>
                </View>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Communication
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.93} width={200} color={argonTheme.COLORS.BLACK} height={3} />
                  <Text style={styles.subReviewNumVal}>
                     {reviewsSummaryArray !== null? reviewsSummaryArray.Communication : "" }
                  </Text>
                </View>
                </Block>

              </Block>
          </Block>
        );
      
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