import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Image, Text, Block } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import Images from "../constants/Images";
import { Rating } from 'react-native-ratings';



class Map extends React.Component {
    state = {
        value: 1,
    }

    render() {
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
                        latitude: 37.430050,
                        longitude: -122.173420,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                {/* User's current location, fixed */}
                <Marker
                        coordinate={{
                            latitude: 37.430050, 
                            longitude: -122.173420,
                        }}
                        title="You are here!"
                    > 
                    </Marker>
                
                {/* Resources */}
                <Marker
                    coordinate={{
                        latitude: 37.423470, 
                        longitude: -122.197740,
                    }}
                    title="Pediatric Dentistry of Palo Alto"
                    image={require("../assets/imgs/locationIcon2.png")}
                > 
                    <Callout tooltip>
                        <View >
                            <View style={styles.locPreview}>
                            <Text>Pediatric Dentistry of Palo Alto </Text>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <Text>Type</Text>
                                <Rating 
                                    type="custom"
                                    ratingColor="#fc3901"
                                    ratingBackgroundColor="#999999"
                                    fractions={1}
                                    startingValue={5}
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
                </MapView>
            </View>
        );
    }
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
        height: Dimensions.get('window').height / 2,
        zIndex: -1,
        // borderRadius: 9,
    },
    locPreview: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
        // marginBottom: -32,
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