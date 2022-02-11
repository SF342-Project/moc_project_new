import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function ComparePrice({navigation}) {
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
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    height: 80,
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  Image: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    width: 30, 
    height: 30
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
