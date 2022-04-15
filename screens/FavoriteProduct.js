import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../redux/users/UserSlice';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import AppLoader from './AppLoader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';

export default function FavoriteProduct({navigation}) {
  const user = useSelector(getUsers);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchData = () => {
    axios
      .post('http://10.0.2.2:4000/products/multiIds', {
        id: user[0].product_lists,
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Get Fail: ', err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, isFocused]);

  return (
    <>
      <View>
        <View style={styles.profile}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-thin-left"
                size={30}
                style={styles.Image}
                color={'#fff'}></Entypo>
            </TouchableOpacity>
            <Text style={styles.welcome}>รายการโปรดสินค้า</Text>
          </View>
        </View>
        <FlatList
          data={data}
          initialNumToRender={7}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ComparePrice', {
                    name: item.name,
                    id: item.id,
                  })
                }>
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
      {loading || !isFocused ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: '#2752e6',
    margin: 10,
    padding: 15,
  },
  Headnotes: {
    fontSize: 18,
    fontFamily: 'Prompt-Bold',
    textAlign: 'left',
    color: '#fff',
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
  Image: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginBottom: 15,

    marginLeft: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  profile: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
});
