import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;


const Profile = ({navigation}) => {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (user == null) {
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user && !user.isAnonymous) {
              setUser(user.uid)
            } else {
              console.log("anon user hit profile page")
            }
          })
        }
    })

    return (
      {... user === null ? 
        <Block flex style={styles.profile}>
          <ImageBackground
            source={Images.ProfGradient}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
          <Block style={styles.drop}>
            <Text bold size={28} color={argonTheme.COLORS.PRIMARY}>
              Need an account? 
              Register here 
            </Text>
            <Button onPress={() => navigation.navigate('RegisterPage')}>
              Register
            </Button>
          </Block>
          </ImageBackground>
        </Block> : 
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfGradient}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color={argonTheme.COLORS.PRIMARY}>
                      Jessica J
                    </Text>
                    <Block row style={{alignItems: 'center'}}>
                    <Ionicons name="location-outline" size={28} color="black" />
                    <Text size={16} style={{ marginTop: 10 }} >
                      San Francisco, USA
                    </Text>
                    </Block>
                  </Block>
                  {/* <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    {/* <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    >
                      CONNECT
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      MESSAGE
                    </Button> */}
                  {/* </Block>  */}
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="black"
                        style={{ marginBottom: 4 }}
                      >
                        4
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Groups</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="black"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        10
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Events</Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="black"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        89
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Comments</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                    <Block style={{ marginTop: 30, marginBottom: 16 }}>
                      <Text>
                        Under construction!
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
      }
    );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  drop: {
    paddingVertical: 200,
    paddingLeft: 20,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
