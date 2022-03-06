import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Galio components
import { Block, Text, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch } from "../components";

const { width } = Dimensions.get("screen");

class AddReview extends React.Component {

	renderInput = () => {
		return (
			<Block style={styles.inputContainer}>
				<Input rounded style = {styles.reviewBox}/>
			</Block>
		);
		
	}

	render() {
		return (
			<Block style={styles.reviewContainer}>
				<Text h3 bold center>
					Add a Review
				</Text>
				<Text style={styles.inputCaption}>
					Tell us about your experience
				</Text>
				{this.renderInput()}
				<Block right>
					<Button right>Next</Button>
				</Block>
				
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	inputCaption: {
		color: 'gray',
		textAlign: 'center'
	},
	inputContainer: {
		height: '40%', 
		marginTop: '10%',
		marginBottom: '10%'
	},
	reviewContainer:{
		height: '100%',
		width: '80%',
		margin: '10%',
		padding: '2.5%'
	},
	reviewBox: {
		height: '100%',
		width: '100%'
	}
});

export default AddReview;