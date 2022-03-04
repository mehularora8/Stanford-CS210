import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';

class ReviewSummaryCard extends React.Component {
  render() {
    return (
          <Block flex style={styles.reviewSummaryCard}>
            <Text style={styles.title}>
              Reviews
            </Text>
            <Block flex style={styles.overallRatingContainer}>
              <AirbnbRating 
                showRating={false}
                isDisabled={true}
                selectedColor={argonTheme.COLORS.PRIMARY}
                size={20}
                defaultRating={4}
                starContainerStyle={styles.starContainer}
              />
              <Text style={styles.overallRatingText}>
                {/* overall rating */}
                4.5  [27]
              </Text>
    
            </Block>
            <Block flex>
              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}  >
                    Safety
                </Text>
                <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.97} width={200} color={argonTheme.COLORS.BLACK} height={4} />
                  <Text style={styles.subReviewNumVal}>
                      4.9
                  </Text>
                </View>
              </Block>

              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}>
                  Accessibility 
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.88} width={200} color={argonTheme.COLORS.BLACK} height={4} />
                  <Text style={styles.subReviewNumVal}>
                      4.7
                  </Text>
                </View>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Environment
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.93} width={200} color={argonTheme.COLORS.BLACK} height={4} />
                  <Text style={styles.subReviewNumVal}>
                      4.8
                  </Text>
                </View>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Communication
                  </Text>
                  <View style={styles.subReviewBarContainer}>
                  <ProgressBar progress={0.93} width={200} color={argonTheme.COLORS.BLACK} height={4} />
                  <Text style={styles.subReviewNumVal}>
                      4.8
                  </Text>
                </View>
                </Block>

              </Block>
          </Block>
        );
    }  
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
  }
});

export default ReviewSummaryCard;