import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
// import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Splash extends React.Component {
  render() {
    const { navigation } = this.props;
    const user = null;

    // // Set an initializing state whilst Firebase connects
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();

    // // Handle user state changes
    // function onAuthStateChanged(user) {
    //   setUser(user);
    //   if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //   return subscriber; // unsubscribe on unmount
    // }, []);

    // if (initializing) return null;

    if (!user) {
      return (
        <Block flex style={styles.container}>
          <StatusBar hidden />
          <Block flex center>
          <ImageBackground
              source={Images.Login}
              style={{ height, width, zIndex: 1 }}
            />
          </Block>
          <Block center>
            <Image source={Images.LogoLogin} style={styles.logo} />
          </Block>
          <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                  <Block center>
                    <Button
                      style={styles.button}
                      color={argonTheme.COLORS.SECONDARY}
                      onPress={() => navigation.navigate("Login")}
                      textStyle={{ color: argonTheme.COLORS.BLACK }}
                    >
                      Login
                    </Button>
                </Block>
                <Block center>
                    <Button
                      style={styles.button}
                      color={argonTheme.COLORS.SECONDARY}
                      onPress={() => navigation.navigate("Register")}
                      textStyle={{ color: argonTheme.COLORS.BLACK }}
                    >
                      Register
                    </Button>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      );
    }
  
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Login}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoLogin} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={60}>
                    Welcome {user}
                  </Text>
                </Block>
                {/* <Block>
                  <Text color="white" size={60}>
                    System
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    Fully coded React Native components.
                  </Text>
                </Block> */}
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Enter Parea Portal
                </Button>
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
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
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
    marginTop: 20
  }
});

export default Splash;
