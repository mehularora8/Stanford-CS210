import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';


class BasicReview extends React.Component {
  render() {
    return (
          <Block style={styles.BasicReview}>
            <Text>
              Test
            </Text>
          </Block>
        );
    }  
}

const styles = StyleSheet.create({
  BasicReview: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 1,
    minHeight: 114,
    margin: "2%",
    padding: "2%"
  },
});

export default BasicReview;