import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../redux/users/UserSlice';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import AppLoader from './AppLoader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavoriteProduct() {
  const user = useSelector(getUsers);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [dispatch]);

  console.log(data);
  return (
    <View>
      <Text>FavoriteProduct</Text>
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
});
