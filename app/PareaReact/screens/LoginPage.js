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
import { Ionicons } from '@expo/vector-icons';
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

function getBgColorLogin(email, pass) {
  return (email && pass) ? argonTheme.COLORS.PRIMARY : argonTheme.COLORS.TERTIARY;
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
        <Block flex >
      
        <ImageBackground
            source={Images.Grad}
            style={{ height, width, zIndex: 0 }}
          >
            <Ionicons name="md-chevron-back" size={24} style={styles.backIcon} color="black" onPress={() =>{  props.navigation.goBack()}}/>
          </ImageBackground>
          
        </Block>
        <Block flex style={styles.padded}>
        <Text center style={{color: "white", fontWeight: 'bold', marginTop: '-30%'}} size={45}>
            PAREA
          </Text>
          <Text center style={{fontFamily: "Open Sans", marginTop: '10%', paddingBottom: '2%'}}>
                  Log in with your account information!
          </Text>
            <Block style={{ zIndex: 2 }}>
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
                color={ getBgColorLogin(email, pass) }
                onPress={() => {realLogin(navigation, email, pass, setError)}}
                textStyle={{ color: (email && pass) ? "white" : "#999999", fontFamily: 'Open Sans' }}
            >
                Login
            </Button>
            
          </Block>
        </Block>
      </Block>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  padded: {
    marginTop: "-55%",
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
  backIcon: {
    marginTop: '10%',
    marginBottom: '2%',
    marginLeft: '2%'
  }
});

export default LoginPage;
