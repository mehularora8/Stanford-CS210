import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Linking} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import call from 'react-native-phone-call';
import { FontAwesome } from '@expo/vector-icons';


//data needed: resource id, pull in phone number
class ContactCard extends React.Component {
  render() {
    const { navigation, phone} = this.props;
    let cleanedPhone = phone.replace(/[^\d.+]/g, '')
  

    return (
          <Block flex style={styles.contactPreviewCard}>
              <Text style={styles.title}> Contact</Text>
              <Button style={styles.contactButton} onPress={() => {  
                const args = {
                number: cleanedPhone, 
                prompt: true,
              };
              // Make a call
              call(args).catch(console.error);}
              }>
                <Block style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                  <FontAwesome name="phone" size={20} color="white" />
                  <View style={{marginLeft: 3, marginRight: 3}}/>
                  <Text style={{fontSize: 13, color: "white"}}>
                    {phone}
                  </Text>
                </Block>


              </Button>
          </Block>
        );
    }  
}

const styles = StyleSheet.create({
  contactPreviewCard: {
    minHeight: 150,
    borderRadius: 12,
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
  },
  contactButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "45%",
    borderRadius: 12,
    marginLeft: -1,
  },
  phoneNumber: {
      fontFamily: "Open Sans",
      fontSize: 15,
      color: "white"
  }
});

export default ContactCard;