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
  }

  checkValid = () => {
    return !(this.state.address == '' || this.state.name == '' || this.state.type == '')
  }

  submitForReview = () => {
    let valid = !(this.state.address == '' || this.state.name == '' || this.state.type == '') 
    if (!valid) return valid
    
    // GEOCODING
    return (Geocoder.from(this.state.address)
    .then(json => {
			var location = json.results[0].geometry.location;

      const newId = uuid.v4();
      const resource = {
        Address: this.state.address,
        Name: this.state.name,
        City: '',
        Contact: "(650) 380-1557",
        Images: {"url": "https://i.ibb.co/8973D7n/DSCF1502.jpg"},
        Type: this.state.type,
        Tags: [],
        Ratings: [],
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
                      <Block width={width * 0.9} style={{ marginBottom: 10 }}>
                        <Input
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
                          placeholder={this.state.tags != '' ? this.state.tags: "(Optional) Tags"}
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
