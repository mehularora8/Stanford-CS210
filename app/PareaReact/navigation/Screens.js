import * as React from "react";
import ReactDOM from 'react-dom';
import { Easing, Animated, Dimensions, Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/elements';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

import { Block } from "galio-framework";

// screens
import Home from "../screens/Explore";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import AddResource from "../screens/AddResource";
import AddResourceSuccess from "../screens/AddResourceSuccess";
import Elements from "../screens/Groups";
import Articles from "../screens/Articles";
import ResourceFull from "../screens/ResourceFull";
import AddReview from "../screens/AddReview";
import AddReviewStars from "../screens/AddReviewStars";
import ComingSoon from "../components/ComingSoon";
import ComingSoonGroups from "../components/ComingSoonGroups";
import AllReviews from "../screens/AllReviews";


// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

//images for icons
import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function ElementsStack(props) {
  return (
    <Stack.Navigator> 
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
          presentation: "card",
          headerShown: false,
          headerMode: "screen",
        }}
      />
      <Stack.Screen
        name="ResourceFull"
        component={ResourceFull}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ scene }) => (
            <Header title="Articles" scene={scene} />  // navigation={navigation} 
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
          presentation: "card",
          headerMode: "screen",
        }}
      />
      <Stack.Screen
        name="ResourceFull"
        component={ResourceFull}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" 
                     screenOptions={{"headerShown": false, "headerTransparent": true}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ scene }) => (  // navigation
            <Header
              transparent
              white
              title=""  // Profile
              // navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="ResourceFull"
        component={ResourceFull}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator screenOptions={{"headerShown": false}}>
      <Stack.Screen
        name="ExplorePage"
        component={Home}
        options={{
          header: ({ scene }) => (  // navigation, 
            <Header
              title="" // Explore
              search
              options
              // navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="ResourceFull"
        component={ResourceFull}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
       <Stack.Screen
        name="AllReviews"
        component={AllReviews}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          // presentation: 'modal',
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="AddReviewStars"
        component={AddReviewStars}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          // presentation: 'modal',
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="AddResource"
        component={AddResource}
        options= {{presentation: 'modal'}}
        
        // option={{
        //   headerTransparent: true,
        //   presentation: "card",
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name="AddResourceSuccess"
        component={AddResourceSuccess}
        options= {{presentation: 'modal'}}
      />
      
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator screenOptions={{"headerShown": false}}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
          presentation: "card",
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="App"
        component={AppStack} 
        option={{
          headerTransparent: true,
          presentation: "card",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  const headerHeight = useHeaderHeight(3);

  return (
    <Tab.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Tab.Screen 
        name="Explore" 
        component={HomeStack} 
        options={{
          // headerTitle: (color, size) => (
          //   <Text>Explore</Text>
          // ),
          // tabBarLabelStyle: { height: 20 },
          // tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          headerShown: false, // true to show 
          // navigation: navigation,
          header: ({ navigation, scene }) => (
            <Header
              title=""
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
        }}/>
      <Tab.Screen 
        name="Sav" 
        component={ComingSoon} 
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
          headerShown: false, // true to show 
        }}/>
      <Tab.Screen 
        name="Gro" 
        component={ComingSoonGroups}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group-work" size={size} color={color} />
          ),
          headerShown: false, // true to show 
        }} />
      <Tab.Screen 
        name="Prof" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          headerShown: false, // true to show 
        }} 
      />
    </Tab.Navigator>
  );
}