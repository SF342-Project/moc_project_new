import React from 'react';
import { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { AuthContext } from '../navigation/AuthProviders';
const Home = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.welcome}> หน้าแรก</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.Text}>ราคาสินค้า</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 10, height: 60, width: 80, backgroundColor: "#2752E6", flex: 0.3 }} />
          <View style={{ margin: 10, height: 60, width: 80, backgroundColor: "#2752E6", flex: 0.3 }} />
          <View style={{ margin: 10, height: 60, width: 80, backgroundColor: "#2752E6", flex: 0.3 }} />
        </View>
        <Text style={styles.Text}>บริการด้านการค้าภายในประเทศ</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('MapTongfah')}>
            <Image style={{ width: '78%', height: '50%', marginTop: 10, }} source={{ uri: 'https://play-lh.googleusercontent.com/WInYydpgoP1-qeoHZ4Ia9ybqU8sq_Mgn8XT0nJWNcuSxNBWb8xgauSFbzB55P1z7sA' }} />
            <Text style={styles.ButtonText}>
              สถานที่ร้านธงฟ้า
            </Text>
            <Image style={{ width: '55%', height: '12%', }} source={{ uri: 'https://inwfile.com/s-fg/pdz6i9.png' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ComparePrice')}>
            {/* <Image style={{ width: '55%', height: '50%', marginTop: 10, }} source={require('Price.png')} /> */}
            <Text style={styles.ButtonText}>
              เปรียบเทียบราคาสินค้า
            </Text>
            <Image style={{ width: '55%', height: '12%', }} source={{ uri: 'https://inwfile.com/s-fg/pdz6i9.png' }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  profile: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
  },

  Button: {
    alignItems: "center",
    marginHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    width: 180,
    height: 200,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  ButtonText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10
  },

  Text: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    padding: 15,
    fontFamily: "Prompt-Bold"
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
export default Home;


