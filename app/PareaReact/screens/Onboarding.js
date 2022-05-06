import React from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";


function anonLogin(nav) {
  const auth = getAuth();
  signInAnonymously(auth)
  .then(() => {
    // console.log('User signed in anonymously');
    nav.navigate("App");
  })
}


class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.SplashOnboard}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        {/* <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block> */}
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
      
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.PRIMARY}
                  onPress={() => anonLogin(navigation)}
                  textStyle={{ color: argonTheme.COLORS.WHITE, fontFamily: 'Open Sans' }}
                >
                  Continue as Guest
                </Button>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.TERTIARY}
                  onPress={() => {navigation.navigate("LoginPage")
            
                }}
                  textStyle={{ color: "#999999", fontFamily: 'Open Sans' }}
                >
                  Log In
                </Button>
                <Block>
                  <Text 
                    color={argonTheme.COLORS.PRIMARY}
                    onPress={() => navigation.navigate("RegisterPage")}
                    style={{padding: 8 }}
                    textStyle={{ color: "#999999", fontFamily: 'Open Sans'}}
                  >
                    Create an account
                  </Text>
                </Block>
              </Block>
              <Block style={styles.subTitle}>
                  <Text color="rgba(252, 57, 1, 0.7)" size={13}>
                    Designed for Caregivers of Individuals with ASD
                  </Text>
                </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 12,
    
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {

    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 20,
    /* or 154% */

    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.41,
  }
});

export default Onboarding;
