import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout, getUsers } from '../redux/users/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import AppLoader from './AppLoader';

export default function ProfileScreen({ navigation }) {
  const user = useSelector(getUsers);
  const dispatch = useDispatch();
  const removeToken = () => {
    dispatch(authLogout())
      .unwrap()
      .then(() => navigation.goBack());
  };
  return (
    <>
    {user.length > 0? (<View>
      <View style={styles.Header}>
        <LinearGradient
          colors={['#0A214A', '#047FC7']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-thin-left"
                size={30}
                style={styles.Image}
                color={'#fff'}></Entypo>
            </TouchableOpacity>
            <Text style={styles.HeaderText}>หน้าหลัก</Text>
          </View>
          <Text style={styles.head}>{user[0].name}</Text>
        </LinearGradient>
      </View>

      <View style={styles.databox}>
        <Entypo name="user" size={27} color="#0A214A" style={{ marginRight: 25, marginLeft: 10 }} />
        <Text style={styles.data}>{user[0].name}</Text>
      </View>
      <View style={styles.databox}>
        <Entypo name="mail" size={27} color="#0A214A" style={{ marginRight: 25, marginLeft: 10 }} />
        <Text style={styles.data}>{user[0].email}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.favButton}onPress={() => navigation.navigate('FavoriteProduct')}>
          <Entypo name="shop" size={27} color="#0BA3FC" style={{ marginRight: 25, marginLeft: 10 }} />
          <Text style={styles.favText}>รายการโปรดราคาสินค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favButton} onPress={() => navigation.navigate("FavoriteShop")}>
          <Icon name="map-o" size={25} color="#0BA3FC" style={{ marginRight: 25, marginLeft: 10 }} />
          <Text style={styles.favText}>รายการโปรดร้านค้าธงฟ้า</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={removeToken}>
          <Text style={styles.logoutText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>):(<AppLoader/>)}
    </>
    
  );
}

const styles = StyleSheet.create({
  Header: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  databox: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 60,
  },
  Image: {
    marginTop: 15,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  head: {
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FFFFFF',
    marginTop: 40,
    marginBottom: 80
  },
  data: {
    textAlign: "center",
    color: "#000000",
    fontSize: 15,
  },
  favButton: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#0A214A',
    width: 300,
    height: 60,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  favText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Prompt-Bold',
    fontSize: 18,
  },
  logoutButton: {
    marginVertical: 30,
    backgroundColor: '#C73304',
    width: 170,
    height: 60,
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
  },
  HeaderText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});
