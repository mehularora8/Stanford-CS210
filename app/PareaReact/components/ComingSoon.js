import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

// import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("screen");


class ComingSoon extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
        <Block flex center>
            <ImageBackground
            source={Images.ComingSoonSaved}
            style={{ height, width, zIndex: 1 }}
        />
        </Block>
    );
  }
}



export default ComingSoon;
