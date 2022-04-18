import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import { Block, Text, theme, Button, Slider } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import { TextInput } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get("screen");


class RatingSlider extends React.Component {
  // Initialize using props otherwise assign default value
  state = {
    header:         this.props.header,
    minimumValue:   this.props.minimumValue ? this.props.minimumValue : 1,
    maximumValue:   this.props.maximumValue ? this.props.maximumValue : 5,
    startingValue:  this.props.startingValue ? this.props.startingValue : 1,
    step:           this.props.step ? this.props.step : 1,
    currentValue:   this.props.startingValue ? this.props.startingValue : 1,
  };

  handleValueChange = (value) => {
    this.props.changeHeaderValue(this.state.header, value);
  }

  // TODO: Assign thumb slider style colors etc. (TBD)
  render() {
    return (
      <Block>
        <Slider
          value={this.state.startingValue}
          minimumValue={this.state.minimumValue}
          maximumValue={this.state.maximumValue}
          step={this.state.step}
          onValueChange={(val) => this.handleValueChange(val)}
          thumbStyle = {styles.thumbStyle}
        />
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: '#dedede',
  },
  thumbStyle: {
  }
});

export default RatingSlider;