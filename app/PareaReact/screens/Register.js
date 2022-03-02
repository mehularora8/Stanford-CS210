import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

// import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        {/* <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        > */}
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.2} middle>
                  <Text color="#FC3901" size={16}>
                    Add a Resource
                  </Text>
                </Block>

                <Block flex={0.1} middle>
                  <Text 
                    color={argonTheme.COLORS.BLACK}
                    size={12}
                  >
                    Don’t see what you’re looking for? To suggest a new resource listing, fill out the information below!
                  </Text>
                </Block>

                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="Name of establishment/organization/person"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="Resource Type"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="map-big"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="Address"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="map-big"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="(Optional) Link to Website"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="world-2"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="(Optional) Phone Number"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="map-big"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                      <Input
                        borderless
                        placeholder="Tags"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            // name="map-big"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Submit
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    height: height,
    backgroundColor: "#FFE3E7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  boldText: {
    fontWeight: 'bold'
  }
});

export default Register;
