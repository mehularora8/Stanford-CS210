import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
} from "react-native";

import { Icon, Input } from "../components";
import argonTheme from "../constants/Theme";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";


function realLogin(nav, email, password, se) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // update state?
        // console.log("user logged in with info: ")
        // console.log(user)
        nav.navigate("App");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error message: %s", errorMessage)
        se("Incorrect username or password")
      });
}


const LoginPage = (props) => {

    const { navigation } = props;

    const [email, changeEmail] = React.useState("");
    const [pass, changePassword] = React.useState("");
    const [err, setError] = React.useState(null);

    return (
    <View flex style={styles.container}>
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Grad}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
                {/* <Block style={styles.title}>
      
                </Block> */}

                <Block width={width * 0.8}>
                    <Input
                        borderless
                        placeholder="Email"
                        onChangeText={email => changeEmail(email)}
                        value={email}
                    />
                </Block>
                <Block width={width * 0.8} style={{ marginBottom: 2 }}>
                    <Input
                        borderless
                        placeholder="Password"
                        password={true}
                        value={pass}
                        onChangeText={pass => changePassword(pass)}
                    />
                </Block>
            {err != null ? 
                 <Text color="rgba(252, 57, 1, 0.7)" size={13}>{err}</Text>: <></>
            }
            <Button
                style={styles.button}
                color={argonTheme.COLORS.TERTIARY}
                onPress={() => {realLogin(navigation, email, pass, setError)}}
                textStyle={{ color: "#999999", fontFamily: 'Open Sans' }}
            >
                Login
            </Button>
            
            <Block style={styles.subTitle}>
                <Text color="rgba(252, 57, 1, 0.7)" size={13}>
                Designed for Caregivers of Individuals with ASD
                </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </View>
    );
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
  },
  inputIcons: {
    marginRight: 12
  },
});

export default LoginPage;
