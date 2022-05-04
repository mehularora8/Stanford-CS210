import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  View,
  Modal
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import RadioButtonRN from 'radio-buttons-react-native';
import uuid from 'react-native-uuid';
import { getObject, putObject, storeObject } from "../firebase_utils";



const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const userTypeData = [
  {
    label: 'Parea User'
   },
   {
    label: 'Caregiver'
   },
   {
    label: 'Parent'
   },
   {
    label: 'Sibling'
   },
   {
    label: 'Resource Provider'
   },
  ];



function doSignOut(nav, setUser) {
  const auth = getAuth();
  signOut(auth).then(() => {
    setUser(null)
    nav.navigate("Explore")
  }).catch((error) => {
    console.log(error)
  });
}

function getProfURI() { //get this from firebase
  return Images.ProfilePicture
}

function uploadNewProfilePic(uri, user) {
  uri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const pname = "/profile-pics/" + user.first + "-" + user.last + "/" + uuid.v4() + ".jpg"
  
  // store the actual image
  // storeObject(pname, uri);
  
  user.profileRef = pname;
  putObject('users', user.uid, user)
}



const Profile = ({navigation}) => {

    const [user, setUser] = useState(null);
    const [newProfile, setNewProfile] = useState(getProfURI());
    const [userType, setUserType] = useState("Parea User")
    const [modalVisible, setModalVisible] = useState(false);
    
    const isType = (element) =>  {
      console.log(element.label)
      console.log(userType)
      return element.label == userType;
    }


    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log(result);

      if (!result.cancelled) {
        setNewProfile(result.uri); 
        uploadNewProfilePic(result.uri, user);
      }
    };

    useEffect(() => {
      if (!user) {
        const auth = getAuth();
        onAuthStateChanged(auth, (guser) => {
          if (guser && !guser.isAnonymous) {
            getObject("users", guser.uid).then(x => {
              setUser(x);
            })
          } else {

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
            imageStyle={styles.createAcctBackground}
          >
          <Block  style={styles.drop}>
            <Text  style={{color: "white"}} size={45}>
            Join <Text style={{fontWeight: 'bold', color: 'white'}}>PAREA</Text>!
            
            </Text>
            <Text size={18} color={"white"}>
              Create an account to view your profile
            </Text>
            <Block style={{marginTop: '10%'}}>
              <Text style={styles.keyUse}>
                Save <Text style={styles.emphasize}>RESOURCES</Text>
              </Text >
              <Text style={styles.keyUse}>
                Write <Text style={styles.emphasize}>REVIEWS</Text>
              </Text>
              <Text style={styles.keyUse}>
                Ask <Text style={styles.emphasize}>QUESTIONS</Text>
            </Text>
          </Block>


            <Button
            style={styles.button}
            color={argonTheme.COLORS.TERTIARY}
            onPress={() => navigation.navigate('RegisterPage')}
            textStyle={{ color: "white", fontFamily: 'Open Sans' }}
            >
            Log In / Register 
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
              style={{ width, marginTop: '20%' }}
            >
              <Block flex style={styles.profileCard}>
                <Pressable onPress={pickImage}>
                  <Block middle style={styles.avatarContainer}>
                    <Image
                      source={{ uri: newProfile}}
                      style={styles.avatar}
                    />
                  </Block>
                </Pressable>
                <Block style={styles.info}>
                <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color={argonTheme.COLORS.PRIMARY}>
                      {user.displayName}
                    </Text>
                    <Block row style={{alignItems: 'center', marginTop: '5%'}}>
                    <Ionicons name="location-outline" size={28} color="black" />
                    <Text size={16} style={{ marginTop: 10 }} >
                      Bay Area, CA
                    </Text>
                    </Block>
                    <Block row style={{alignItems: 'center', marginTop: '5%'}}>
                    <Text size={16} style={{ marginTop: 10, fontWeight: 'bold' }} >
                      Community Status: 
                    </Text>
                    <View style={{marginLeft: 5}}/>
                    <Text size={16} style={{ marginTop: 10 }} >
                      {userType}
                    </Text>
                    <View style={{marginLeft: 5}}/>
                    <Ionicons name="pencil" size={24} color={argonTheme.COLORS.PRIMARY} style={{ marginTop: 3}} onPress={() => setModalVisible(!modalVisible)}/>
                    </Block>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.modalView}>
                      <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name="close-outline" size={30} color="black" style={{marginLeft: '75%'}} />
                      </Pressable>
                        <Text style={{fontWeight: 'bold'}}>Edit Community Status</Text>
                          <RadioButtonRN
                              data={userTypeData}
                              initial={userTypeData.findIndex(isType) + 1}
                              selectedBtn={(e) => {
                                setUserType(e.label)
                                handleChangeUserType()
                              }}
                              style={{width: 250}}
                              activeColor={argonTheme.COLORS.PRIMARY}
                              textStyle={{fontFamily: 'Open Sans'}}
                            />
                      </View>
                    </Modal>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                    <Block style={{ marginTop: 30, marginBottom: 16 }}>
                      {/* <Text>
                        Under construction!
                      </Text> */}
                    </Block>
                  </Block>
                </Block>
              </Block>
              <Block center>
              <Button
                style={styles.secondaryButton}
                onPress={() => doSignOut(navigation, setUser)}
                textStyle={{ color: "#99999", fontFamily: 'Open Sans' }}
                >
                Log Out
            </Button>
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
    marginTop: 0,
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
    height: height 
  },
  createAcctBackground: {
    width: width,
    height: height 
  },
  keyUse: {
    color: 'white',
    fontSize: 17,
    paddingTop: '2%'
  },
  emphasize: {
    fontWeight: '800',
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
  },
  button: {
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 12,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    marginTop: '15%',
    marginLeft: '7%'
  },
  secondaryButton: {
    width: width - theme.SIZES.BASE * 6,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 12,
    backgroundColor: argonTheme.COLORS.TERTIARY,
    marginTop: '15%',
    marginLeft: '7%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: '1%',
    paddingBottom: '5%',
    alignItems: "center",
    marginTop: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default Profile;
