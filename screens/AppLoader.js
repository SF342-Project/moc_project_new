import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';

export default function AppLoader() {
  return (
    <View style={[ StyleSheet.absoluteFill, styles.container ]}>
      <LottieView source={require('../assets/images/loader.json')} autoPlay loop/>
    </View>
  );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 1
    }
})
