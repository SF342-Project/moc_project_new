import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function MapTongfah() {
  return (

     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 13.91723,
         longitude: 100.37246,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>

  );
}

const styles = StyleSheet.create({

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
