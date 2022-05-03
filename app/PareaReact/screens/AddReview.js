import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, StatusBar, View } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const { width } = Dimensions.get("screen");

class AddReview extends React.Component {
	
	state = {
		resourceId: this.props.route.params.resourceId,
		reviewText: '',
		reviewDate: new Date(),
	}

	renderInput = () => {
		return (
			<Block style={styles.inputContainer}>
				<TextInput
                        style={{padding: 15}}
						multiline
                        numberOfLines={4}
						onChangeText={(newText) => this.setState({reviewText: newText})}
                        value={this.reviewText}
                        placeholder="Please describe.
                        "
            	/>
			</Block>
		);
		
	}

	handleNextButton = ()  => {
		console.log("handlenext", this.props)
		const { navigation } = this.props;
		const review = {
			resourceId: this.state.resourceId ? this.state.resourceId : 'mxhbRimhbDk6nxbf6wxc',
			reviewText: this.state.reviewText,
			reviewDate: this.state.reviewDate,
			username: this.props.route.params.username
		}
		console.log("Review from Add Review:", review);
		navigation.navigate('AddReviewStars', {review, name: this.props.route.params.name});
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
				<Text h4 bold center>
					Add a Review
				</Text>
				<Text style={styles.inputCaption}>
					Tell us about your experience
				</Text>
				{this.renderInput()}
				<Block>
					<Button style={styles.nextButton} onPress={ this.handleNextButton }>
						Next
					</Button>
				</Block>
				
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
	inputCaption: {
		color: 'gray',
		textAlign: 'center'
	},
	inputContainer: {
		height: '40%', 
		marginTop: '10%',
		marginBottom: '10%',
		backgroundColor: 'white',
		borderRadius: 12
	},
	reviewContainer:{
		height: '100%',
		width: '80%',
		margin: '10%',
		padding: '2.5%',
	},
	reviewBox: {
		height: '100%',
		width: '100%',
	},
	nextButton: {
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

export default AddReview;