import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import useFetch from '../components/useFetch';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomSheet from 'react-native-simple-bottom-sheet';

export default function MapTongfah() {
  const API_URL = 'http://10.0.2.2:9000/Shop';

  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);

  // useEffect(() => {
  //   fetch(API_URL)
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .then(json => setFilterdata(json))
  //     .catch(error => alert(error))
  // }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const fetchdata = await response.json();
    setData(fetchdata);
    setFilterdata(fetchdata);
  };

  useEffect(() => {
    getData();
  }, [API_URL]);

  const onChangeText = text => {
    setFilterdata(
      data.filter(
        i =>
          i.Contact.includes(text) ||
          i.address.includes(text) ||
          i.ShopName.includes(text),
      ),
    );
  };

  return (
    <SafeAreaProvider>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 13.91723,
          longitude: 100.37246,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {filterdata.map((marker, index) => {
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
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <BottomSheet isOpen>
        <FlatList
          data={filterdata}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.Flatstyle}>
              <Text>{item.ShopName}</Text>
              <Text>{item.address}</Text>
              <Text>{item.Contact}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>ไม่มีข้อมูล</Text>
            </View>
          )}
        />
      </BottomSheet>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  Flatstyle: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});
