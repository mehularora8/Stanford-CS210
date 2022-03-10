import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");


class AddResourceSuccess extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
            <Block style={styles.registerContainer}>  
                <Button onPress={() => navigation.goBack()} style={styles.cancel} title="X" >
                    <Feather name="x" size={28} color="black" />	
                </Button>
               
                <Block style={{marginTop: '50%'}}>
                    <Block  style={{alignItems: 'center', marginBottom: 25, fontWeight: "bold"}}>
                        <Text color="black" size={28}>
                            Resource Added!
                        </Text>
                    </Block>

                    <Block  style={styles.checkStyle}>
                        <Image source={Images.Check}/>
                    </Block>

                    <Block style={{alignItems: 'center', marginTop: 20}}>
                        <Text color="black" size={14} textAlign='center'>
                            Your resource is being reviewed by our community moderators and will be up on the map soon!
                        </Text>
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
  checkStyle: {
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 25,
    borderRadius: 12,
  },
  boldText: {
    fontWeight: 'bold'
  },
  scroll: {
    marginVertical: 0,
    
  },
  text: {
    textAlign: 'center',
    width: width*0.9
  },
  cancel: {
		backgroundColor: 'transparent',
		color: 'black',
		alignItems: 'flex-start',
    marginTop: 50,
		width: 28,
		marginLeft: 10,
    marginBottom: -40,
	}
});

export default AddResourceSuccess;
