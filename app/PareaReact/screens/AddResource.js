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
import { Block, Checkbox, Text, theme, Input } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Button, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import AddResourceSuccess from "./AddResourceSuccess";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { putObject } from "../firebase_utils";
import uuid from 'react-native-uuid';

import { getAuth } from "firebase/auth";


const { width, height } = Dimensions.get("screen");

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';


class AddResource extends React.Component {

  state = {
    address: '',
    name: '',
    type: '',
    predictions: [],
    error: ''
  }


  submitForReview = () => {
    let valid = !(this.state.address == '' || this.state.name == '' || this.state.type == '') 
    if (!valid) return valid

    const newId = uuid.v4();

    const resource = {
      Address: this.state.address,
      Name: this.state.name,
      City: '',
      Contact: "(650) 380-1557",
      Type: this.state.type,
      Tags: [],
      Ratings: [],
      Location: '', // geo
      resourceId: newId,
      addedByUser: getAuth().currentUser.displayName,
      adminCheck: false,
    }

    putObject("resources/", newId, resource)
    return true;
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <Block middle>
        <StatusBar hidden />
          <Block safe middle>
            <Block style={styles.registerContainer}>
              <Block>
                <Button onPress={() => navigation.goBack()} style={styles.cancel} title="X" >
                  <Feather name="x" size={28} color="black" />	
                </Button>
                <Block middle style={{marginTop:40}}>
                  <Text color="#FC3901" size={17}>
                    Add a Resource
                  </Text>
                </Block>

                <Block>
                  <Block middle>
                    <Text style={styles.text}
                      color={argonTheme.COLORS.BLACK}
                      size={13}
                    >
                      Don’t see what you’re looking for? To suggest a new resource listing, fill out the information below!
                    </Text>
                  </Block>
                  <ScrollView>
                  <Block style = {styles.scroll} center>
                      <Text> {this.state.error} </Text>
                      <Block width={width * 0.9} style={{ marginBottom: 0 }}>
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
                          onChangeText = {(value) => {
                            this.setState({"name": value}); 
                          }}
                        />
                      </Block>
                      <Block width={width * 0.9} style={{ marginBottom: 0 }}>
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
                          onChangeText = {(value) => {
                            this.setState({"type": value});
                          }}
                        />
                      </Block>
                      <Block width={width * 0.9} style={{ marginBottom: 0 }}>
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
                      <Block width={width * 0.9} style={{ marginBottom: 0 }}>
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
                      <Block width={width * 0.9} style={{ marginBottom: 8 }}>
                        <Input
                          borderless
                          placeholder="(Optional) Tags"
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
                      <Block height={250} width={width * 0.9}> 
                        <GooglePlacesAutocomplete
                          placeholder='Address'
                          height={150} 
                          width={width * 0.9}
                          minLength={4}
                          autoFocus={true}
                          listViewDisplayed="auto"
                          style={{
                            listView:{
                              position: 'absolute',
                              backgroundColor: '#FFF',
                              zIndex: 10, 
                          }
                        }}
                          onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            this.setState({"address": data.description})
                          }}
                          query={{
                            key: 'AIzaSyBNaeGJLPKGMEUjOH6cJoVZ6avcjtJXSHI',
                            language: 'en',
                          }}
                          onChangeText = {(value) => {
                            this.setState({"address": value}); 
                          }}
                        />
                      </Block>
                      <Block middle style={{ marginTop: -150, zIndex: 0 }} >
                        <Button onPress={() => {
                          let valid = this.submitForReview();
                          if (valid) {
                            navigation.goBack();
                            navigation.navigate(AddResourceSuccess)
                          }
                          else {
                            this.setState({"error": "Please fill all required fields!"})
                          }
                          }} color="primary" style={styles.createButton}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Submit
                          </Text>
                        </Button>
                      </Block>
                    {/* </KeyboardAvoidingView> */}
                  </Block>
                  </ScrollView>
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
    borderRadius: 12,
  },
  boldText: {
    fontWeight: 'bold'
  },
  scroll: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    width: width*0.9,
    fontFamily: "Open Sans"
  },
  cancel: {
		backgroundColor: 'transparent',
		color: 'black',
		alignItems: 'flex-start',
    marginTop: 50,
		width: 28,
		marginLeft: 10,
    marginBottom: -40,
	},
  goog: {
    zIndex: 999
  }
});

export default AddResource;
