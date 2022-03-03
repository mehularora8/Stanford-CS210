import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';

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
                4.0   
              </Text>
    
            </Block>
            <Block flex>
              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}>
                    Safety
                </Text>
              </Block>

              <Block style={styles.subReviewContainer}>
                <Text style={styles.subReviewText}>
                  Accessibility 
                  </Text>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Environment
                  </Text>
                </Block>

                <Block style={styles.subReviewContainer}>
                  <Text style={styles.subReviewText}>
                  Communication
                  </Text>
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
    marginBottom: 8,
  }, 
  overallRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  overallRatingText: {
    fontSize: 15,
    paddingBottom: 5,
    fontFamily: "Open Sans",
  },
  subReviewContainer: {
    marginBottom: 6,
  },
  subReviewText: {
    fontFamily: "Open Sans",
    fontSize: 13,
  },
  starContainer: {
    display: 'flex',
    alignSelf: "flex-start",
    marginBottom: 8,
  }
});

export default ReviewSummaryCard;