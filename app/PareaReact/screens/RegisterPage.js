import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";

import { Input } from "../components";
import argonTheme from "../constants/Theme";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";


function registerUser(nav, email, password, first, last, setError) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)  // and first and last name? 
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("Cool, user created: ")
      console.log(user)
      nav.goBack()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage)
    });
}


const RegisterPage = (props) => {

  const { navigation } = props;

  const [email, changeEmail] = React.useState("");
  const [pass, changePassword] = React.useState("");
  const [firstname, changeFirst] = React.useState("");
  const [lastname, changeLast] = React.useState("");
  const [err, setError] = React.useState(null);

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Grad}
            style={{ height, width, zIndex: 0 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block >
              <Block style={styles.title}>
                <Text size={23}>
                  Don't have an account? Create one here!
                </Text>
              </Block>

              {/* Some form here */}
              <Block width={width * 0.8}>
                    <Input
                        borderless
                        placeholder="First name"
                        onChangeText={firstname => changeFirst(firstname)}
                        value={firstname}
                    />
                </Block>
                <Block width={width * 0.8}>
                    <Input
                        borderless
                        placeholder="Last name"
                        onChangeText={lastname => changeLast(lastname)}
                        value={lastname}
                    />
                </Block>
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
                  onPress={() => registerUser(navigation, email, pass, firstname, lastname, setError)}
                  textStyle={{ color: "#999999", fontFamily: 'Open Sans' }}
                >
                  Register
                </Button>
              
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

export default RegisterPage;
