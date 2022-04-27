import React, {Component} from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Modal, Pressable, View} from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { AirbnbRating } from 'react-native-ratings';
import { argonTheme } from '../constants';
import { LinearProgress } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { style } from 'dom-helpers';
import Theme from '../constants/Theme';
import uuid from 'react-native-uuid';
import { putObject } from "../firebase_utils";


const ReportCard = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false);

    submitReport = async (reportType) => {
      if (!props.resourceId) return;
      const report = {
        reportId: uuid.v4(),
        reportType: reportType,
        date: new Date()
      }
  
      const collectionPath = 'resources/'  + props.resourceId + '/reports';
      console.log("Attempting to add", report);
      putObject(collectionPath, report.reportId, report);
      console.log("ADDED");
    }

    return (
          <Block flex style={styles.contactReportCard}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Did <Text style={styles.resourceName}>{props.resourceName}</Text> permanently closed?</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}} >
                    <View style={{flex: 1}}/>
                      <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>Cancel</Text>
                          </Pressable>
                        <View style={{flex: 1}}/>
                        <Pressable
                          style={[styles.button, styles.buttonReport]}
                          onPress={() => {
                              submitReport("closed")
                              setModalVisible(!modalVisible)
                          }}
                        >
                          <Text style={styles.textStyle}>Yes, submit report.</Text>
                        </Pressable>
                        <View style={{flex: 1}}/>
                    </View>
                  </View>
                </View>
              </Modal>
              <Text style={styles.title}> Report </Text>
              <View style={styles.buttonHolder}>
                <View style={{display: "flex", flexDirection:"row"}}>
                    <Button style={styles.seeReviewsButton}  onPress={() => setModalVisible(true)}>
                    Not operating
                    </Button>
                    <Button style={styles.seeReviewsButton}>
                    Incorrect info
                    </Button>
                </View>
                <View style={{display: "flex", flexDirection:"row"}}>
                    <Button style={styles.seeReviewsButton}>
                    Missing info
                    </Button>
                    <Button style={styles.seeReviewsButton}>
                    Other
                    </Button>
                </View>
            </View>
          </Block>
        );
      
}

const styles = StyleSheet.create({
  contactReportCard: {
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
  seeReviewsButton: {
    fontFamily: "Open Sans",
    fontSize: 15,
    width: "45%",
    borderRadius: 12,
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    shadowColor: "rgba(153, 153, 153, 0.6)"
  },
  buttonHolder: {
      marginLeft: -5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(153, 153, 153, 0.6)",
    paddingLeft: '8%',
    paddingRight: '8%'
  },
  buttonReport: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  resourceName: {
    fontWeight: "600"
  }
});

export default ReportCard;