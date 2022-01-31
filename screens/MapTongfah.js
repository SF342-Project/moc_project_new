import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import useFetch from '../components/useFetch';
import {FlatList} from 'react-native-gesture-handler';

export default function MapTongfah() {
  const API_URL = 'http://10.0.2.2:9000/Shop';

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => alert(error))
      .finally(setLoading(false));
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 13.91723,
        longitude: 100.37246,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}>
      {data.map((marker, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Latitude,
              longitude: marker.Longitude,
            }}
            image={require('../assests/images/map_marker.png')}
          />
        );
      })}
      <Marker
        coordinate={{
          latitude: 13.916459,
          longitude: 100.421607,
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
