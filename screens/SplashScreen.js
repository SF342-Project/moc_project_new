import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SplashScreen({navigation}) {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.View}>
      <Image source={require('../assets/images/logo.png')} style={styles.image}/>
        <Text style={styles.text}>กระทรวงพาณิชย์</Text>
        <Text style={styles.subtext}>Ministry of Commerce</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091D42',
    alignItems: 'center',
    justifyContent: 'center',

  },
  View: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
      color: "#fff",
      fontSize: 25,
      paddingTop: 15,
      fontFamily: 'Prompt-Bold',

  },
  subtext: {
    color: "#047FC7",
    paddingTop: 5,
    fontFamily: 'Prompt-Bold',
},
image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
}
});
