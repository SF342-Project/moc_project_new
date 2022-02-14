import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import ProductCard from '../components/ProductCard';
import useFetch from '../components/useFetch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AppLoader from './AppLoader';
import {include} from 'underscore';

export default function ProductLists({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const productURL = 'http://10.0.2.2:4000/products/keyword?keyword=' + value;

  const {data, loading} = useFetch(productURL);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.profile}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-thin-left"
                size={30}
                style={styles.Image}
                color={'#fff'}></Entypo>
            </TouchableOpacity>
            <Text style={styles.welcome}>เลือกรายการสินค้า</Text>
          </View>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={22}></FontAwesome>
            <TextInput
              placeholder="ค้นหาสินค้า"
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={styles.TextInput}
              onChangeText={text => setValue(text)}
            />
          </View>
        </View>

        <View style={styles.Content}>
          {/* <Text style={styles.HeaderContent}>เลือกประเภทสินค้า</Text>
        <DropDownPicker
          placeholder="เลือกสินค้า"
          open={open}
          value={value}
          items={items}
          searchable={true}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.Dropdown}
          dropDownContainerStyle={styles.DropdownContainer}
          placeholderStyle={{
            color: 'grey',
            fontFamily: 'Prompt-Regular',
          }}
          listParentLabelStyle={styles.DropdownLable}
        /> */}
          {/* <Text style={styles.HeaderContent}>รายการสินค้า</Text> */}
          <FlatList
            data={data}
            initialNumToRender={7}
            renderItem={({item}) => {
              // let date = formatDate(item.price_list[0].date);
              let path = '';
              switch (item.name) {
                case include('สุกร'):
                  path = '../assets/images/product_image/Pig.png';
                  break;

                case include('เนื้อโค'):
                  path = '../assets/images/product_image/Cow.png';
                  break;

                default:
                  break;
              }
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('ComparePrice', {
                      name: item.name,
                      id: item.id,
                    })
                  }>
                  {/* <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.65}}>
                    <Text style={styles.Headnotes}>{item.product_name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.CardPrice}>
                        {item.price_list[0].price_max}
                      </Text>
                      <Text style={styles.CardUnit}>{item.unit}</Text>
                    </View>

                    <Text style={styles.CardDate}>{date}</Text>
                  </View>
                  <View style={{flex: 0.3}}>
                    <Image
                      source={require('../assets/images/product_image/Cow.png')}
                      style={styles.CardImage}
                    />
                  </View>
                </View> */}

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.8}}>
                      <Text style={styles.Headnotes}>{item.name}</Text>
                      <Text style={styles.CardDate}>รหัสสินค้า: {item.id}</Text>
                    </View>
                    <View style={{flex: 0.2}}>
                      <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.CardImage}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
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
        </View>
      </SafeAreaView>
      {loading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  Content: {},
  searchBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    flexDirection: 'row'
  },
  TextInput: {
    fontFamily: 'Prompt-Regular',
    padding: 0,
    marginLeft: 10
  },
  Headnotes: {
    fontSize: 18,
    fontFamily: 'Prompt-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  CardUnit: {
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    top: 20,
    left: 5,
    textAlign: 'center',
    color: '#fff',
  },
  CardPrice: {
    fontFamily: 'Prompt-Bold',
    fontSize: 40,
    padding: 0,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffcc00',
  },
  CardImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  CardDate: {
    fontFamily: 'Prompt-Regular',
    fontSize: 13,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#fff',
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#2752e6',
    margin: 10,
    padding: 15,
  },
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
    width: 30,
    height: 30,
  },

  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
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
