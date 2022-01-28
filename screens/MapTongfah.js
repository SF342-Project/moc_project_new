import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default function MapTongfah() {
  return (

     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 13.91723,
         longitude: 100.37246,
         latitudeDelta: 0.15,
         longitudeDelta: 0.15,
       }}
     >
         <Marker
            coordinate={{
                latitude: 13.91723,
                longitude: 100.37246
            }}
            image={require('../assests/images/map_marker.png')}
         
         />
         <Marker
            coordinate={{
                latitude: 13.916459,
                longitude: 100.421607
            }}
            image={require('../assests/images/map_marker.png')}
         
         />
             
         

     </MapView>



  );
}

const styles = StyleSheet.create({

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
