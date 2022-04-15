import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Homepage';
import TongfahLocation from '../screens/TongfahLocation';
import LoginScreen from '../screens/LoginScreen';

import ProductLists from '../screens/ProductLists';
import MapTongfah from '../screens/MapTongfah';
import ComparePrice from '../screens/ComparePrice';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteShop from '../screens/FavoriteShop';
import FavoriteProduct from '../screens/FavoriteProduct';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TongfahScreen"
        component={TongfahLocation}
        options={{
          title: 'สถานที่ร้านธงฟ้า',
          headerStyle: {
            backgroundColor: '#091D42',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name="RegisterScreen"
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ProductLists"
        component={ProductLists}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="MapTongfah"
        component={MapTongfah}
        options={{header: () => null}}
      />
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ComparePrice"
        component={ComparePrice}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FavoriteShop"
        component={FavoriteShop}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="FavoriteProduct"
        component={FavoriteProduct}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
