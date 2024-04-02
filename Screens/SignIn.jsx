import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../config/Config';

const {height, width} = Dimensions.get('window');

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);

  const Navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      if (userName && userEmail && userPassword) {
        await createUserWithEmailAndPassword(auth, userEmail, userPassword);

        ToastAndroid.show('User Register Successfully', ToastAndroid.SHORT);

        setTimeout(() => {
          Navigation.navigate('Home');
        }, 3000);
      } else {
        if (
          userName.length == 0 ||
          userEmail.length == 0 ||
          userPassword.length == 0
        ) {
          ToastAndroid.show(
            'Please fill all data correctly',
            ToastAndroid.SHORT,
          );
        }
      }
    } catch (error) {
      AuthErrorHandler(error);
    }
  };

  const AuthErrorHandler = error => {
    if (error.message == 'Firebase: Error (auth/email-already-in-use)') {
      ToastAndroid.show('This Email is already used.', ToastAndroid.SHORT);
    } else if (error.message == 'Firebase: Error (auth/invalid-email)') {
      ToastAndroid.show('This Email is not valid.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.inputDiv}>
        <TextInput
          placeholder="Enter Name"
          value={userName}
          onChangeText={e => setUserName(e)}
        />
      </View>
      <View style={styles.inputDiv}>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={userEmail}
          onChangeText={e => setUserEmail(e)}
        />
      </View>
      <View style={styles.inputDiv}>
        <TextInput
          placeholder="Enter Password"
          value={userPassword}
          onChangeText={e => setUserPassword(e)}
          secureTextEntry={togglePassword}
          multiline={false}
        />
      </View>

      <TouchableOpacity onPress={handleSignIn}>
        <Text className="text-2xl">SignIn</Text>
      </TouchableOpacity>
      <Text>
        Already Have an Account{' '}
        <TouchableOpacity
          onPress={() => Navigation.navigate('LogIn')}
          style={styles.mainButtonParent}>
          <Text>LogIn Here</Text>
        </TouchableOpacity>
        
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e0d6d6',
  },
  inputDiv: {
    width: width - 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 25,
    marginHorizontal: 'auto',
  },
  mainButtonParent: {
    width: width / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: width * 0.25,
  },
});

export default SignIn;
