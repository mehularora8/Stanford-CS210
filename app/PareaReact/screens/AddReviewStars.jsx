import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";
import RatingSlider  from '../components/RatingSlider';

import { getDatabase, ref, onValue, set } from 'firebase/database';
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
			"Communication": 1
		}
	}

	storeReview = () => {

		const db = getDatabase();
	  
		if (!review['id']) {
		  review['id'] = uuid.v4();
		}
	  
		const reference = ref(db, 'reviews/' + review['id']);
		
		set(reference, {
		  "title": review['title'],
		});
		return true
	}

	onChangeValue = (header, value) => {
		let newRatings = this.state.ratings;
		newRatings[header] = value;
		this.setState({
			ratings: newRatings,
		})
	}

	renderSliders = () => {
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
		return (
			<Block style={styles.reviewContainer}>
				<Text h3 bold center>
					Add a Review
				</Text>
				<Text style={styles.inputCaption}>
					How would you rate your experience?
				</Text>

				{this.renderSliders()}
				
				<Block>
					<Button style={styles.subButton} onPress={this.storeReview}>Submit</Button>
				</Block>
				
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	slider: {
		marginTop: '7%',
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
		marginVertical: -20,
		alignSelf: 'center',
	}
});

export default AddReviewStars;