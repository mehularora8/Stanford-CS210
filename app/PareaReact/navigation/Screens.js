import * as React from "react";
import ReactDOM from 'react-dom';
import { Easing, Animated, Dimensions, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/elements';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 



import { Block } from "galio-framework";

// screens
import Home from "../screens/Explore";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/ResourceFull";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Groups";
import Articles from "../screens/Articles";
import ResourceFull from "../screens/ResourceFull";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

//images for icons
import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
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
        name="Pro"
        component={Pro}
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
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
          presentation: "card",
          headerMode: "screen",
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
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
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title=""  // Profile
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          presentation: "card",
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
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
        name="Explore"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="" // Explore
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
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
        name="ResourceFull"
        component={ResourceFull}
        option={{
          headerTransparent: true,
          presentation: "card",
          headerShown: false,
        }}
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
        }}/>
      <Tab.Screen 
        name="Sav" 
        component={Register} 
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
          headerShown: false, // true to show 
        }}/>
      <Tab.Screen 
        name="Gro" 
        component={ElementsStack}
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