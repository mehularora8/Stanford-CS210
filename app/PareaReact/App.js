import React, {useState} from "react";
import { Image } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from '@use-expo/font';
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";

import { initializeApp } from 'firebase/app';

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

/* Firebase Setup */
const firebaseConfig = {
  apiKey: 'AIzaSyApwcLq6zs_TCUavgap-G8MFjq6QtpH8nc',
  authDomain: 'cs210-parea.firebaseapp.com',
  databaseURL: 'https://cs210-parea-default-rtdb.firebaseio.com/',
  projectId: 'cs210-parea',
  storageBucket: 'cs210-parea.appspot.com',
  messagingSenderId: '1093038960119',
  appId: 'app-1-1093038960119-ios-f5df5c908428a2750292f2',
};

initializeApp(firebaseConfig);

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default props => {
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    'ArgonExtra': require('./assets/font/argon.ttf'),
    'Open Sans': require('./assets/font/OpenSans-Regular.ttf')
  });

  function _loadResourcesAsync() {
    return Promise.all([...cacheImages(assetImages)]);
  }

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

 function _handleFinishLoading() {
    setLoading(true);
  };

  if(!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if(fontsLoaded) {
    return (
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  } else {
    return null
  }
}