import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getUsers} from '../redux/users/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const user = useSelector(getUsers);
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log(await AsyncStorage.getItem('token'));
      navigation.navigate('Home');
      
    } catch (error) {}
  };
  return (
    <View>
      <Text>Hi {user[0].email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={removeToken}>
        <Text style={styles.logoutText}>Remove Token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
