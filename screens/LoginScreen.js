import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import {Input} from '../components/Input';
import {AuthContext} from '../navigation/AuthProviders';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import MocApi from '../redux/api/MocApi';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {authlogin, getUsers} from '../redux/users/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login} = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    dispatch(authlogin({email: email, password: password})).unwrap()
    .then(async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.navigate('Home');
        } else {
          console.log('error');
        }
      } catch (error) {console.log(error)}
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.View}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
        <Text style={styles.text}>กระทรวงพาณิชย์</Text>
        <Text style={styles.subtext}>Ministry of Commerce</Text>
        <Text style={styles.title}>เข้าสู่ระบบ</Text>
        <Text style={styles.inputText}>EMAIL</Text>
        <Input
          style={styles.input}
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputText}>PASSWORD</Text>
        <Input
          style={styles.input}
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText=""
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text
          style={{
            color: '#0BA3FC',
            fontFamily: 'Prompt-Bold',
            fontSize: 15,
          }}
          onPress={() => navigation.navigate('RegisterScreen')}>
          สมัครสมาชิก
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Prompt-Bold',
    alignSelf: 'flex-start',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Prompt-Bold',
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    marginVertical: 7,
    width: 260,
    fontSize: 16,
    padding: 5,
    marginBottom: 7,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 15,
  },
  loginButton: {
    marginVertical: 30,
    backgroundColor: '#047FC7',
    width: 125,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Prompt-Bold',
    fontSize: 18,
    marginTop: 6,
  },

  container: {
    flex: 1,
    backgroundColor: '#091D42',
    alignItems: 'center',
  },
  View: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 25,
    paddingTop: 15,
    fontFamily: 'Prompt-Regular',
  },
  subtext: {
    color: '#047FC7',
    paddingTop: 5,
    marginBottom: 20,
    fontFamily: 'Prompt-Regular',
  },
  image: {
    marginTop: 50,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
