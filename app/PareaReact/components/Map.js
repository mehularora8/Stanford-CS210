import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Image } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Images from "../constants/Images";



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
                        latitude: 37.77634752089827,
                        longitude: -122.44181123023144,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                <Marker
                        coordinate={{
                            latitude: 37.77634752089827, 
                            longitude: -122.44181123023144,
                        }}
                        title="You are here!"
                        image={require("../assets/imgs/locationIcon2.png")}
                        // pinColor={"coral"}
                    > 
                 
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
});

export default Map;