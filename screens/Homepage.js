import React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '../components/Carousel';
import {AuthContext} from '../navigation/AuthProviders';
import {
  checkUserState,
  fetchUserData,
  getUsers,
} from '../redux/users/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Home = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(getUsers);
  const dispatch = useDispatch();

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log(await AsyncStorage.getItem('token'));
    } catch (error) {}
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('Token', token);
      setIsLoggedIn(true);
      var decoded = jwtDecode(token);
      console.log(decoded._id);
      dispatch(fetchUserData(decoded._id)) 
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.token]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.welcome}> หน้าแรก</Text>
            {isLoggedIn ? (
              <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <Text style={styles.welcomeLogin}><FontAwesome name="user" size={25}></FontAwesome></Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.welcomeLogin}>เข้าสู่ระบบ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.Slider}>
            <Slider />
          </View>
          <Text style={styles.Text}>บริการด้านการค้าภายในประเทศ</Text>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('ProductLists')}>
              <Image
                style={styles.Image}
                source={{
                  uri: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
              />
              <Text style={styles.ButtonText}>เปรียบเทียบราคาสินค้า</Text>
              <Image
                style={styles.DITImage}
                source={require('../assets/images/dit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('MapTongfah')}>
              <Image
                style={styles.Image}
                source={require('../assets/images/ggmap.png')}
              />
              <Text style={styles.ButtonText}>สถานที่ร้านธงฟ้า</Text>
              <Image
                style={styles.DITImage}
                source={require('../assets/images/dit.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={removeToken}>
            <Text style={styles.logoutText}>Remove Token</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 25,
    color: '#FFFFFF',
  },
  welcomeLogin: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 20,
    marginRight: 15,
    marginBottom: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  Slider: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  Button: {
    overflow: 'hidden',
    marginHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: 350,
    height: 150,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  ButtonText: {
    color: '#2752E6',
    fontSize: 18,
    padding: 10,
    fontFamily: 'Prompt-Regular',
    marginLeft: 10,
  },
  Text: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Prompt-Bold',
  },

  container: {
    flex: 1,
  },

  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 150,
    backgroundColor: '#C73304',
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 15,
    color: '#F0FFFF',
    fontFamily: 'Prompt-Bold',
  },
  Image: {
    width: '100%',
    height: '50%',
  },
  DITImage: {
    marginLeft: 20,
    width: '20%',
    height: '10%',
  },
});
export default Home;
