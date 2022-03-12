import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProviders';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const [mode, setMode] = useState(false);

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  // if (initializing) return null;
  return (
    <NavigationContainer>
      {<AppStack />}
    </NavigationContainer>
  );
}
