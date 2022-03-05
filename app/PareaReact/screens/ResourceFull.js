import React, {Component} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import  ReviewSummaryCard from '../components/ReviewSummaryCard.js';
import ReviewPreviewCard from '../components/ReviewPreviewCard';
import ContactCard from '../components/ContactCard';
import { Divider } from 'react-native-elements';
import ReportCard from '../components/ReportCard';
import QandA from '../components/QandA';


export default class ResourceFull extends React.Component {
  
  render() {
    
    const { navigation } = this.props;
    let name = this.props.route.params.name
    let tags = this.props.route.params.tags //note this must be taken out of route params and pulled from central data store

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {name}
          </Text>
        </Block>
        <ScrollView>

          <Block flex>
            <Block flex style={styles.topInfoCard}>
                <Block style={styles.topInfoImg}>
                  <Text>
                    IMG
                  </Text>
                </Block>
                <Block flex style={styles.topInfoText}>
                  <Block>
                    <Text>
                      Type
                    </Text>
                  </Block>
                  <Block flex style={styles.locationInfo}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Block flex style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={styles.locationText}> Palo Alto </Text>
                      <Entypo name="dot-single" size={24} color="black" />  
                      <Text style={styles.locationText}>
                          3.9 mi
                      </Text>
                    </Block>
                  </Block>
                  <Block flex style={styles.tagsHolder}>
                    {tags.map((x) => (
                      <Text size={10} key={x} style={styles.labels}>
                        {x}
                      </Text>
                    ))}
                  </Block>

                  <Button style={styles.addButton}>
                    ADD A REVIEW
                  </Button>
                </Block> 
                {/* end of topInfoText */}
            </Block>
            {/* end of topInfoCard */}
        
            <ReviewSummaryCard/>
            <ReviewPreviewCard/>
            <ReviewPreviewCard/>
            <Button style={styles.seeReviewsButton}>
                    See all reviews
            </Button>
            <Divider style={styles.divider}/>
            <QandA />
            <Divider style={styles.divider} />
            <ContactCard />
            <Divider style={styles.divider}/>
            <ReportCard />
      
          </Block>
          </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.TERTIARY,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  titleContainer: {
    paddingTop: "12%",
    paddingBottom: "2%",
    alignItems: 'center',
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  titleText: {
    color: "white",
    fontSize: 17,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  topInfoCard: {
    flexDirection: "row",
  },
  addButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "95%",
    borderRadius: 12,
    marginLeft: "-1%"
  },
  topInfoImg: {
    width: "40%",
    height: 145,
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: "1.5%"
  },
  topInfoText: {
    margin: "1.5%",
    height: 150,
    justifyContent: "space-between",
  },
  locationInfo: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  locationText: {
    fontSize: 13,
    fontFamily: "Open Sans",
  },
  tagsHolder: {
    flexDirection: "row",
  },
  labels: {
    backgroundColor: "rgba(196, 196, 196, 0.5)",
    borderRadius: 12,
    margin: 3,
    padding: 5,
    overflow: 'hidden',
    opacity: 0.6,
    height: "80%",
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  divider: {
    marginTop: 15,
    marginBottom: 5,
  },
  seeReviewsButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "95%",
    borderRadius: 12,
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    shadowColor: "rgba(153, 153, 153, 0.6)"
  },
});
