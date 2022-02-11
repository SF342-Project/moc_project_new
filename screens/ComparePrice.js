import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import useFetch from '../components/useFetch'

export default function ComparePrice({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const productURL = "http://10.0.2.2:4000/products/keyword/"+value;

  const {data} = useFetch(productURL);


  const [items, setItems] = useState([
    {label: 'เนื้อหมู', value: 'สุกร'},
    {label: 'เนื้อไก่', value: 'ไก่'},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/left-arrow.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
          <Text style={styles.welcome}>เปรียบเทียบราคาสินค้า</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <DropDownPicker
            placeholder="เลือกสินค้า"
            open={open}
            value={value}
            items={items}
            loading={loading}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={true}
            style={styles.Dropdown}
            dropDownContainerStyle={styles.DropdownContainer}
            ActivityIndicatorComponent={({color, size}) => (
              <ActivityIndicator color={color} size={size} />
            )}
            activityIndicatorColor="red"
            activityIndicatorSize={30}
            placeholderStyle={{
              color: 'grey',
              fontFamily: 'Prompt-Regular',
            }}
            listParentLabelStyle={styles.DropdownLable}
          />
        </View>
      </View>

      <View style={styles.Content}>
        <Text style={styles.HeaderContent}>รายการสินค้า</Text>
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                return (
                  <View >
                    <Text>{item.name}</Text>
                  </View>
                );
                
              }}
        
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {},
  HeaderContent: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#000',
  },
  profile: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  Dropdown: {
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%',
    fontFamily: 'Prompt-Regular',
  },

  DropdownContainer: {
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%',
  },

  DropdownLable: {
    fontFamily: 'Prompt-Regular',
  },

  Image: {
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,
    width: 30,
    height: 30,
  },

  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },

  Button: {
    alignItems: 'center',
    marginHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    width: 180,
    height: 200,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  ButtonText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
  },

  Text: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    padding: 15,
    fontFamily: 'Prompt-Bold',
  },

  container: {
    flex: 1,
  },

  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  logoutText: {
    padding: 10,
    fontSize: 24,
    color: '#F0FFFF',
  },
});
