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
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { Button, Icon } from "../components";
import { Images, argonTheme } from "../constants";
import AddResourceSuccess from "./AddResourceSuccess";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { putObject } from "../firebase_utils";
import uuid from 'react-native-uuid';
import Geocoder from 'react-native-geocoding';

import { GeoPoint } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const { width, height } = Dimensions.get("screen");

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
Geocoder.init('AIzaSyBNaeGJLPKGMEUjOH6cJoVZ6avcjtJXSHI');


class AddResource extends React.Component {

  state = {
    address: '',
    name: '',
    type: '',
    website: '',
    phone: '',
    tags: '',
    predictions: [],
    error: '',
    next: false,
    open: false,
    value: null, 
    items: [{id: 1, label: "Activity", value: "Activity"}, {id: 2, label: "Education", value: "Education"}, {id: 3, label: "Employment Support", value: "Employment Support"}, {id: 34, label: "Healthcare", value: "Healthcare"}, {id: 4, label: 'Therapy', value: 'Therapy'}, {id: 5, label: "Occupational Therapy", value: "Occupational Therapy"}, {id: 6, label: "Physical Therapy"}, {id: 7, label: 'Restaurant', value: 'Restaurant'}, {id: 8, label: "Support", value: "Support"}, {id: 9, label: "Speech and Language Therapy", value: "Speech and Language Therapy"}]
  }

  getResourceDefaultImg = (resourceType) => {
    if (resourceType.match(/education/i)) {
      return "Education"
    } else if (resourceType.match(/health/i)) {
      return "Healthcare"
    } else if (resourceType.match(/therapy/i)) {
      return "Therapy"
    } else if (resourceType.match(/restaurant/i)) {
      return "Restaurant"
    } else {
      return "Other"
    }
  }

  setOpen = (open) => {
    this.setState({open: !this.state.open
    });
  }

  setValue = (callback) => {
    this.setState(state => ({
      value: callback(state.value),
      type: callback(state.value)
    }));
  }

  setItems = (callback) => {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  checkValid = () => {
    return !(this.state.address == '' || this.state.name == '' || this.state.type == '')
  }

  submitForReview = () => {
    let valid = !(this.state.address == '' || this.state.name == '' || this.state.type == '') 
    if (!valid) return valid

    //Clean and create tags array for storage
    let tagsArr = []
    let tagsStr = this.state.tags 
    tagsStr = tagsStr.replaceAll(/#/g, '')
    if (tagsStr.match(/,/i)) {
      tagsArr = tagsStr.split(',')
    }
    
    // GEOCODING
    return (
      Geocoder.from(this.state.address)
      .then(json => {
        var location = json.results[0].geometry.location;

        const newId = uuid.v4();
        const resource = {
          Address: this.state.address,
          Name: this.state.name,
          City: '',
          Contact: this.state.phone,
          Images: {"url": Images.DefaultImages[this.getResourceDefaultImg(this.state.type)]},
          Type: this.state.type,
          Tags: tagsArr,
          Website: this.state.website,
          Ratings: {'Overall': 0, 'reviewCount': 0},
          Location: new GeoPoint(parseFloat(location.lat), parseFloat(location.lng)),
          resourceId: newId,
          addedByUser: getAuth().currentUser.displayName,
          adminCheck: false,
        }

      putObject("resources/", newId, resource)
      return true;
		}))
  }
  
  render() {
    const { navigation } = this.props;
    const { open, value, items } = this.state;

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
        
                  <Block style = {styles.scroll} center>
                    { !this.state.next ?
                    <Block>
                      <Block width={width * 0.9} style={{ marginBottom: 0 }}>
                        <Input
                          borderless
                          placeholder={this.state.name != '' ? this.state.name : "Name of establishment/organization/person"}
                          placeholderTextColor={this.state.name != '' ? "black": "#999"}
                          color="black"
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
                      <Block width={width * 0.9} style={{ marginBottom: 10, zIndex: 10 }}>
                        {/* <Input
                          borderless
                          placeholder={this.state.type != '' ? this.state.type : "Resource Type"}
                          placeholderTextColor={this.state.type != '' ? "black": "#999"}
                          color="black"
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
                        /> */}
                            <DropDownPicker
                              open={open}
                              value={value}
                              items={items}
                              setOpen={this.setOpen}
                              setValue={this.setValue}
                              setItems={this.setItems}
                              style={{borderColor: 'transparent'}}
                              dropDownContainerStyle={{
                                borderColor: "transparent"
                              }}
                              placeholderStyle={{
                                color: "#999",
                              }}
      
                            />
                      </Block>
                      <Block height={180} width={width * 0.9}> 
                        <GooglePlacesAutocomplete
                          placeholder={this.state.address != '' ? this.state.address : "Address"}
                          color={this.state.address != '' ? "black": "#999"}
                          height={100} 
                          width={width * 0.9}
                          minLength={4}
                          autoFocus={true}
                          listViewDisplayed="auto"
                          style={{
                            listView:{
                              position: 'absolute',
                              backgroundColor: '#FFF',
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
                      <Text style={{color: "red"}}> {this.state.error} </Text>
                      </Block>
                      :
                      <Block/>
                      }
                      {!this.state.next? <Button onPress={() => {
                        if (this.checkValid()) {
                          this.setState({next: true})
                          this.setState({"error": ""})
                        } else {
                          this.setState({"error": "Please fill all required fields (name, type, & address)!"})
                        }
                      }} color="primary" style={styles.createButton}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Next
                          </Text>
                        </Button> : <Block><Block width={width * 0.9} style={{ marginBottom: 0 }}>
                        <Input
                          borderless
                          placeholder={this.state.website != '' ? this.state.website : "(Optional) Link to Website"}
                          placeholderTextColor={this.state.website != '' ? "black": "#999"}
                          color="black"
                          onChangeText = {(value) => {
                            this.setState({"website": value});
                          }}
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
                          placeholder={this.state.phone != '' ? this.state.phone : "(Optional) Phone Number"}
                          placeholderTextColor={this.state.phone != '' ? "black": "#999"}
                          color="black"
                          onChangeText = {(value) => {
                            this.setState({"phone": value});
                          }}
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
                          placeholder={this.state.tags != '' ? this.state.tags: "(Optional) Tags, separate by commas"}
                          placeholderTextColor={this.state.tags != '' ? "black": "#999"}
                          onChangeText = {(value) => {
                            this.setState({"tags": value});
                          }}
                          color="black"
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
                  
                      <Block middle style={{ marginTop: 0, zIndex: 0 }} >
                      <Text style={{color: "red"}}> {this.state.error} </Text>
                        <Button onPress={() => {
                          let valid = this.submitForReview();
                          if (valid) {
                            navigation.goBack();
                            navigation.navigate(AddResourceSuccess)
                          } else {
                            this.setState({"error": "Please fill all required fields (name, type, & address)!"})
                          }
                          }} color="primary" style={styles.createButton}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Submit
                          </Text>
                        </Button>
                        <Button onPress={() => this.setState({next: false})} color="tertiary" style={styles.createButton}>
                          <Text bold size={14} color={"#999"}>
                            Back
                          </Text>
                        </Button>
                      </Block>
                      </Block>
                      }
                      
                    {/* </KeyboardAvoidingView> */}
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
