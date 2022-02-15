import * as React from 'react';
import { useState, useContext } from 'react';
import { SafeAreaView,View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Input } from '../components/Input';
import { AuthContext } from '../navigation/AuthProviders';
import firestore from '@react-native-firebase/firestore';
const RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();


  const { register } = useContext(AuthContext);

  const usersCollectionRef = firestore().collection('users');

  const addusers = () => {
    usersCollectionRef.add({
      Name: name,
      Email: email,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.View}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/images/logo.png')} style={styles.image} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text}>กระทรวงพาณิชย์</Text>
            <Text style={styles.subtext}>Ministry of Commerce</Text>
          </View>
        </View>
      </View>
        <Text style={styles.title}>ลงทะเบียนสมาชิก</Text>
          <Text style={styles.inputText}>USERNAME</Text>
          <Input
            style={styles.input}
            labelValue={name}
            onChangeText={userName => setName(userName)}
            placeholder=""
            autoCorrect={false}
          />
          <Text style={styles.inputText}>EMAIL</Text>
          <Input
            style={styles.input}
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            placeholder=""
            keyboardType={'email-address'}
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
          <Text style={styles.inputText}>CONFIRM PASSWORD</Text>
          <Input
            style={styles.input}
            labelValue={password}
            placeholderText=""
            secureTextEntry={true}
          />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            register(email, password, name);
            addusers();
          }}>
          <Text style={styles.loginButtonText}>สมัครสมาชิก</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20
  },
  input: {
    marginVertical: 7,
    width: 260,
    fontSize: 16,
    padding: 5,
    marginBottom: 7,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 15,
    fontFamily: 'Prompt-Bold',
  },
  loginButton: {
    marginVertical: 30,
    backgroundColor: '#047FC7',
    width: 140,
    height: 40,
    borderRadius: 20,
    shadowColor: "#000000",
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
    marginTop:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 25,
    paddingTop: 15,
    fontFamily: 'Prompt-Regular',
  },
  subtext: {
    color: "#047FC7",
    paddingTop: 5,
    marginBottom: 20,
    fontFamily: 'Prompt-Regular',
  },
  image: {
    marginTop: 10,
    marginRight: 15,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  }
});
export default RegisterScreen;
