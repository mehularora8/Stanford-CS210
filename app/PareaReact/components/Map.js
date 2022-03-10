import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Image, Text, Block } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import {Images} from "../constants/Images";
import articles from '../constants/articles';
import { Rating } from 'react-native-ratings';

const Map = (props) => {
    // state = {
    //     value: 1,
    // }
    console.log(props.navigation)
    const navigation = props.navigation

    

  
        // const mapRef = useRef(null);
        // const [location, setLocation] = useState(null)

        return (
            <View styles={styles.container}>
                <MapView
                    // ref={mapRef}
                    style={styles.map}
                    mapType={"mutedStandard"}
                    showsPointsOfInterest={true}
                    initialRegion={{
                        latitude: 37.441840128888735,
                        longitude: -122.13979504998588,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.15,
                    }}
                >
                {/* User's current location, fixed */}
                <Marker
                        coordinate={{
                            latitude: 37.42676160389133, 
                            longitude: -122.17060759659671,
                        }}
                        title="You are here!"
                    > 
                    </Marker>
                
                {/* Resources temporarily mapped from articles js file, rather than firebase */}
                {
                    articles.map((x, i) => (
                    <Marker
                    key={"result" + i}
                    coordinate={{
                        latitude: x.latitude, 
                        longitude: x.longitude,
                    }}
                    title={x.title}
                    image={require("../assets/imgs/locationIcon2.png")}
                    onCalloutPress={e => navigation.navigate('ResourceFull', {name: x.title, tags: x.labels})}
                > 
                    <Callout tooltip>
                        <View >
                            <View style={styles.locPreview}>
                            <Text style={styles.resourceTitle}>{x.title} </Text>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <Text style={styles.resourceType}>{x.type}</Text>
                                <Rating 
                                    type="custom"
                                    ratingColor="#fc3901"
                                    ratingBackgroundColor="#999999"
                                    fractions={1}
                                    startingValue={x.stars}
                                    imageSize={15}
                                    readonly  
                                    />

                            </View>
                            </View>
                            {/* <View style={styles.arrowBorder}/>
                            <View style={styles.arrow}/> */}
                        </View>
                    </Callout>
                </Marker>
        
                    ))
                }
                
                </MapView>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,  // -33
        height: Dimensions.get('window').height / 1.8,
        zIndex: -1,
        // borderRadius: 9,
    },
    locPreview: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
        width: 225,
        // marginBottom: -32,
    },
    resourceTitle: {
        fontWeight: '500'

    },
    resourceType: {
        fontWeight: '300',
        color: 'gray',
        fontSize: 13,
    },
    // arrow: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'transparent',
    //     borderTopColor: 'white',
    //     borderWidth: 16,
    //     alignSelf: 'center',
    //     marginTop: 0,
    // },
    // arrowBorder: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'transparent',
    //     borderTopColor: '#007a87',
    //     borderWidth: 16,
    //     alignSelf: 'center',
    //     marginTop: -0.5
    // }
});

export default Map;