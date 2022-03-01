import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



export default class ResourceFull extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Resource Name
          </Text>
        </Block>
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
                  <Ionicons name="location-outline" size={24} color="#999999" />
                  <Block flex style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={styles.locationText}> Palo Alto </Text>
                     <Entypo name="dot-single" size={24} color="#999999" />  
                     <Text style={styles.locationText}>
                        3.9 mi
                     </Text>
                  </Block>
                </Block>

                <Button style={styles.addButton}>
                  ADD A REVIEW
                </Button>

              </Block>

          </Block>
          <Block style={styles.reviewSummaryCard}>
          </Block>
        </Block>
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
  },
  topInfoImg: {
    width: "40%",
    height: "25%",
    backgroundColor: "#999999",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: "1.5%"
  },
  topInfoText: {
    margin: "1.5%",
    height: "25%",
    justifyContent: "space-between",
  },
  locationInfo: {
    marginTop: "5%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  locationText: {
    color: "#999999",
    fontSize: 13,
    fontFamily: "Open Sans",
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
});
