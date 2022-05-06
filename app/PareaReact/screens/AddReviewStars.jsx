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
import { putObject, getObjectsFromCollection, getObject, getReviews } from '../firebase_utils'

import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import uuid from 'react-native-uuid';


const { width } = Dimensions.get("screen");


class AddReviewStars extends React.Component {

	// The state assumes that the resourceId is pre-packaged
	// inside the review object passed in the props.

	weightedAverage = (avg, total, newRating) => {
		return (avg * total + newRating) / (total + 1)
	}

	state =  {
		review: this.props.route.params.review,
		username: this.props.route.params.username,
		ratings: {
			"Safety": 1, 
			"Accessibility": 1, 
			"Environment": 1, 
			"Communication": 1,
			"Overall": 0,
		},
		reviewSummary: []
	}

	componentDidMount = () => {
		if (!this.state.review.resourceId) {
			console.log("Resource ID not found. Aborting.")
		};
		getObject('resources', this.state.review.resourceId).then((x) => { //need to pass resource id here 
			this.setState({ reviewSummary: x.Ratings })
		})
	}

	storeReview = async () => {

		if (!this.state.review.resourceId) return;

		const finalReview = {
			reviewId: uuid.v4(),
			reviewText: this.state.review.reviewText,
			reviewRatings: this.state.ratings,
			date: this.state.review.reviewDate,
			username: this.state.review.username,
			userProfileRef: this.state.review.userProfileRef,
			usertag: this.state.review.usertag,
			userId: this.state.review.userId
		}

		const collectionPath = 'resources/'  + this.state.review.resourceId + '/reviews';
		putObject(collectionPath, finalReview.reviewId, finalReview);

		const { navigation } = this.props;
		navigation.navigate("ExplorePage");
		// TBD: Add toast to show review submitted

		// Update review metadata -- weighted averages
		let accessibility = this.state.reviewSummary.Accessibility ? this.state.reviewSummary.Accessibility : 0;
		let communication = this.state.reviewSummary.Communication ? this.state.reviewSummary.Communication : 0;
		let environment = this.state.reviewSummary.Environment ? this.state.reviewSummary.Environment : 0;
		let safety = this.state.reviewSummary.Safety ? this.state.reviewSummary.Safety : 0;
		let overall = this.state.reviewSummary.Overall ? this.state.reviewSummary.Overall : 0;
		let count = this.state.reviewSummary.reviewCount ? this.state.reviewSummary.reviewCount : 0;

		let updatedRatingsSummary = {
			"Accessibility" : this.weightedAverage(accessibility, count, this.state.ratings["Accessibility"]),
			"Communication" : this.weightedAverage(communication, count, this.state.ratings["Communication"]),
			"Environment" : this.weightedAverage(environment, count, this.state.ratings["Environment"]),
			"Safety" : this.weightedAverage(safety, count, this.state.ratings["Safety"]),
			"Overall" : this.weightedAverage(overall, count, this.state.ratings["Overall"]),
			"reviewCount" : count + 1
		}

		console.log(updatedRatingsSummary);

		getObject('resources', this.state.review.resourceId).then((x) => { //need to pass resource id here 
			x.Ratings = updatedRatingsSummary;
			putObject('resources', this.state.review.resourceId, x);
		})

		
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
		const headers = ["Safety", "Inclusion", "Noise Level", "Communication"];
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