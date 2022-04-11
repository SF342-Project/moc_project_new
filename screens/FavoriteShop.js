import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getShopFavorite, getUsers} from '../redux/users/UserSlice';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import AppLoader from './AppLoader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavoriteShop() {
  const user = useSelector(getUsers);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    console.log('Shop: ',user[0].shop_lists);
    axios
      .post('http://10.0.2.2:4000/favorites/getShop', {
        ord: user[0].shop_lists,
      })
      .then(response => {
        console.log("res: ",response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Get fail', err);
      });
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#ebebeb',
          marginTop: 15,
          marginBottom: 20,
        }}
      />
    );
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
      <>
    <View>
      <Text>FavoriteShop</Text>
      <FlatList 
      data={data}
      ItemSeparatorComponent={FlatListItemSeparator}
      initialNumToRender={3}
      renderItem={({item, index}) => (
        <View>
          <TouchableOpacity
            style={{
              borderColor: '#fff',
              marginBottom: 10,
              borderRadius: 10,
              padding: 20,
            }}
            >
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.9}}>
                <Text style={styles.FlatListHead}>{item.ShopName}</Text>
                <Text style={styles.fontReg}>{item.address}</Text>
                <Text style={styles.fontReg}>{item.Contact}</Text>
              </View>
              <View style={{flex: 0.1}}>
                <TouchableOpacity
                  >
                  <Icon
                    name="bookmark"
                    size={30}
                    color={
                     '#2752E6'
                    }
                    style={{alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.fontReg}>ไม่มีข้อมูล</Text>
        </View>
      )}
      />
    </View>
    {loading ? <AppLoader/> : null }
    </>
  );
}

const styles = StyleSheet.create({

    fontReg: {
        fontFamily: 'Prompt-Regular',
      },
      FlatListHead: {
        fontSize: 17,
        fontFamily: 'Prompt-Bold',
      },


});