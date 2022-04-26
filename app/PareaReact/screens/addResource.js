import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View,
  FlatList
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import AddResourceSuccess from "./AddResourceSuccess";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


// import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("screen");

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export type PredictionType = {
  description: string,
  place_id: string,
  reference: string,
  matched_substrings: any[],
  tructured_formatting: Object,
  terms: Object[],
  types: string[],
}


class AddResource extends React.Component {

  state = {
    address: '',
    predictions: []
  }


  submitForReview = () => {

  }
  
  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        <StatusBar hidden />
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Button onPress={() => navigation.goBack()} style={styles.cancel} title="X" >
                  <Feather name="x" size={28} color="black" />	
                </Button>
                <Block flex middle style={{marginTop:20}}>
                  <Text color="#FC3901" size={17}>
                    Add a Resource
                  </Text>
                </Block>

                <Block>
                  <Block flex middle>
                    <Text style={styles.text}
                      color={argonTheme.COLORS.BLACK}
                      size={12}
                    >
                      Don’t see what you’re looking for? To suggest a new resource listing, fill out the information below!
                    </Text>
                  </Block>

                  <Block style = {styles.scroll} flex center>
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
                        <GooglePlacesAutocomplete
                          placeholder='Address'
                          onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log("Autocomplete is being called")
                            console.log("DATA:", data);
                          }}
                          query={{
                            key: 'AIzaSyD5FIODfpTMIyy_fS2Jyj6oCYpNloq8jS0',
                            language: 'en',
                          }}
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
                        <Button onPress={() => {
                          navigation.goBack()
                          this.submitForReview()
                          navigation.navigate(AddResourceSuccess)
                          }} color="primary" style={styles.createButton}>
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
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 12,
  },
  boldText: {
    fontWeight: 'bold'
  },
  scroll: {
    marginVertical: -300,
    
  },
  text: {
    textAlign: 'center',
    width: width*0.9
  },
  cancel: {
		backgroundColor: 'transparent',
		color: 'black',
		alignItems: 'flex-start',
    marginTop: 50,
		width: 28,
		marginLeft: 10,
    marginBottom: -40,
	}
});

export default AddResource;
