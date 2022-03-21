import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { getUsers } from '../redux/users/UserSlice';


export default function ProfileScreen() {
  const user = useSelector(getUsers);
  return (
    <View>
      <Text>Hi {user[0].email}</Text>
    </View>
  )
}