import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import useFetch from '../components/useFetch';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomSheet from 'react-native-simple-bottom-sheet';
import AppLoader from './AppLoader';

export default function MapTongfah() {
  const API_URL = 'http://10.0.2.2:9000/Shop';

  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch(API_URL);
    const fetchdata = await response.json();
    setData(fetchdata);
    setFilterdata(fetchdata);
    setLoading(false);
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

  const intitialMapState = {
    region: {
      latitude: 13.91723,
      longitude: 100.37246,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
  };

  const onPressButton = (item) => {
    _map.current.animateToRegion({
      latitude: item.Latitude,
      longitude: item.Longitude,
      latitudeDelta: state.region.latitudeDelta,
      longitudeDelta: state.region.longitudeDelta
    })

  }

  const [state, setState] = useState(intitialMapState);
  const _map = React.useRef(null);

  return (
    <>
      <SafeAreaProvider>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={state.region}>
          {filterdata.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.Latitude,
                  longitude: marker.Longitude,
                }}
                image={require('../assets/images/map_marker.png')}
                title={marker.ShopName}
                description={marker.address}
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
              <TouchableOpacity style={styles.Flatstyle} onPress={() => onPressButton(item)}>
                <Text style={styles.Text}>{item.ShopName}</Text>
                <Text style={styles.Text}>{item.address}</Text>
                <Text style={styles.Text}>{item.Contact}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.Text}>ไม่มีข้อมูล</Text>
              </View>
            )}
          />
        </BottomSheet>
      </SafeAreaProvider>
      {loading ? <AppLoader /> : null}
    </>
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
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },

  Text: {
    fontFamily: 'Prompt-Regular',
  },
});
