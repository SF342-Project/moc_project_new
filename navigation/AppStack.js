import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import Home from "../screens/Homepage";
import TongfahLocation from "../screens/TongfahLocation";

import ComparePrice from "../screens/ComparePrice";
import MapTongfah from "../screens/MapTongfah";

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
      name="ComparePrice"
      component={ComparePrice}
      options={{header: () => null}}
      />
      <Stack.Screen
      name="MapTongfah"
      component={MapTongfah}
      options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}

export default AppStack;