import React from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Pressable
} from "react-native";

import { Input } from "../components";
import argonTheme from "../constants/Theme";
import { Block, Button, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";


function registerUser(nav, email, password, first, last, setError) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)  // and first and last name? 
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: first + " " + last, 
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        // ...
        // console.log(auth.currentUser)
      }).catch((error) => {
        // An error occurred
        // ...
        console.log("error updating profile")
      });

      nav.goBack()
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid Email")
      } else if (errorMessage.includes("(auth/weak-password).")) {
        setError("Password should contain at least 6 characters.")
      } else {
        setError(errorMessage)
      }
    });
}

function realLogin(nav, email, password, se) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      // update state?
      // console.log("user logged in with info: ")
      // console.log(user)
      // console.log(nav.getState())
      nav.goBack()
      // nav.navigate("App");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("Error message: %s", errorMessage)
      se("Incorrect username or password")
    });
}


const RegisterPage = (props) => {

  const { navigation } = props;

  const [email, changeEmail] = React.useState("");
  const [pass, changePassword] = React.useState("");
  const [emailLogin, changeEmailLogin] = React.useState("");
  const [passLogin, changePasswordLogin] = React.useState("");
  const [firstname, changeFirst] = React.useState("");
  const [lastname, changeLast] = React.useState("");
  const [err, setError] = React.useState(null);

    return (
      <Block center style={styles.container}>
        <Block flex top>
        
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} color="white" style={{marginLeft: 15, marginTop: 15}} />
        </Pressable>
        <ImageBackground
            source={Images.Grad}
            style={{ height, width }}
          />
        </Block>
        
        <Block flex style={styles.login}>
   
          <Text center>
            Have an account? Login 
          </Text>
          <Block width={width * 0.8}>
              <Input 
                  borderless
                  placeholder="Email"
                  onChangeText={emailLogin => changeEmailLogin(emailLogin)}
                  value={emailLogin}
              />
          </Block>
          <Block width={width * 0.8} style={{ marginBottom: 2 }}>
              <Input
                  borderless
                  placeholder="Password"
                  password={true}
                  value={passLogin}
                  onChangeText={passLogin => changePasswordLogin(passLogin)}
              />
          </Block>
          <Button
                style={styles.button}
                color={argonTheme.COLORS.TERTIARY}
                onPress={() => {realLogin(navigation, emailLogin, passLogin, setError)}}
                textStyle={{ color: "#999999", fontFamily: 'Open Sans' }}
            >
                Login
            </Button>
        </Block>
        <Block space="between" style={styles.padded}>
            <Block>
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

            <Button
                style={styles.button}
                color={argonTheme.COLORS.TERTIARY}
                onPress={() => registerUser(navigation, email, pass, firstname, lastname, setError)}
                textStyle={{ color: "#999999", fontFamily: 'Open Sans' }}
            >
              Register
            </Button>

            {err != null ? 
                 <Text center color="rgba(252, 57, 1, 0.7)" size={17}>{err}</Text>: <></>
            }
              
              <Block style={styles.subTitle}>
                  {/* <Text color="rgba(252, 57, 1, 0.7)" size={13}>
                    Designed for Caregivers of Individuals with ASD
                  </Text> */}
                </Block>
          </Block>
        </Block>
      </Block>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: argonTheme.COLORS.PRIMARY
    

  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE + 190,
  },
  login: {
    bottom: 160,
    position: "relative",
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

    marginBottom: -120,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: -0.41,
  }
});

export default RegisterPage;
