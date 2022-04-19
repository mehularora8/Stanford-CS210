import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, View, StatusBar } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";
import RatingSlider  from '../components/RatingSlider';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

// import firestoreDb from "../firebaseConfig";
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'


import { putObject } from "../firebase_utils";

import uuid from 'react-native-uuid';


const { width } = Dimensions.get("screen");


class AddReviewStars extends React.Component {

	// The state assumes that the resourceId is pre-packaged
	// inside the review object passed in the props.
	state =  {
		review: this.props.route.params.review,
		ratings: {
			"Safety": 1, 
			"Accessibility": 1, 
			"Environment": 1, 
			"Communication": 1,
			"Overall": 0,
		}
	}

	storeReview = async () => {

		if (!this.state.review.resourceId) return;

		const finalReview = {
			reviewId: uuid.v4(),
			reviewText: this.state.review.reviewText,
			reviewRatings: this.state.ratings
		}

		const collectionPath = 'resources/'  + this.state.review.resourceId + '/reviews';
		console.log("Attempting to add", finalReview);
		putObject(collectionPath, finalReview.reviewId, finalReview);
		console.log("ADDED");

		const { navigation } = this.props;
		navigation.navigate("ExplorePage");
		//Add toast to show review submitted 
	}

	onChangeValue = (header, value) => {
		let newRatings = this.state.ratings;
		newRatings[header] = value;
		this.setState({
			ratings: newRatings,
		})
	}


	renderSliders = () => {
		// TBD: Tapping a label on the slider should make the thumb come
		// that location on the slider
		const headers = ["Safety", "Accessibility", "Environment", "Communication"];
		const labels = ["Awful", "Poor", "Average", "Good", "Great"];

		return (
		

			<Block style={styles.slidersContainer}>
				{
					headers.map(h => (
						<Block style={styles.slider}>
							<Text bold> {h} </Text>
							<RatingSlider 
								header = {h}
								changeHeaderValue = {this.onChangeValue}
								id={h}
							/>
							<Block style = {styles.labelsContainer}>
							{
								labels.map(r =>  <Text> {r} </Text>)
							}
							</Block>
						</Block>
					))
				}
			</Block>
		
		)
	}

	render() {
		const { navigation } = this.props;
		return (
			<View>
				<StatusBar barStyle="light-content" />
					<Block style={styles.titleContainer}>
					<Ionicons 
						name="md-chevron-back" 
						size={24} style={styles.backIcon}
						color="white" 
						onPress={() =>  navigation.goBack() }
					/>
					<Text style={styles.titleText}>
						{this.props.route.params.name}
					</Text>

					<View style={{flex: 1}}/>
					</Block>
				<Block style={styles.reviewContainer}>
					<Text h4 bold center style={{marginTop: -30}}>
						Add a Review
					</Text>

					<Text style={styles.inputCaption}>
						How would you rate your experience?
					</Text>

					<Text bold style={{ marginTop: 20, alignSelf: 'flex-start', marginBottom: -20}}>
						Overall
					</Text>

					<Rating 
		                type="custom"
		                ratingColor="#fc3901"
		                ratingBackgroundColor="#999999"
		                tintColor="#f2f2f2"
		                startingValue={0}
		                style={{marginTop: 20, alignSelf: 'flex-start', marginBottom: -10}}
		                imageSize={45}
						onFinishRating={(rating) => this.onChangeValue("Overall", rating)}
	                />

					{this.renderSliders()}
					<Button style={styles.subButton} onPress={ () => this.storeReview() }>Submit</Button>
				</Block>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	backIcon: {
		flex: 1,
		marginLeft: 8
	},
	slider: {
		marginBottom: '7%',
	},
	labelsContainer:{
		minHeight: '5%',
		minWidth: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	slidersContainer: {
		marginTop: '10%',
		marginBottom: '10%'
	},
	inputCaption: {
		color: 'gray',
		textAlign: 'center'
	},
	reviewContainer:{
		height: '100%',
		width: '80%',
		margin: '10%',
		padding: '2.5%',
	},
	subButton: {
		marginTop: -70,
		alignSelf: 'center',
	},
	titleContainer: {
		paddingTop: "12%",
		paddingBottom: "2%",
		alignItems: 'center',
		backgroundColor: argonTheme.COLORS.PRIMARY,
		display: 'flex',
		flexDirection: 'row',
	  },
	  titleText: {
		color: "white",
		fontSize: 17,
	  }
});

export default AddReviewStars;