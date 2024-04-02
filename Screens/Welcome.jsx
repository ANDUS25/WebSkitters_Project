import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const WelcomeScreen = () => {
  const Navigation = useNavigation();

  const handleLogIn = () => {
    Navigation.navigate('SignIn');
  };
  return (
    <View style={style.main}>
      <StatusBar hidden />
      <TouchableOpacity style={style.mainButtonParent} onPress={handleLogIn}>
        <Text style={style.mainButton}>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e0d6d6',
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
  mainButton: {
    padding: 20,
    paddingHorizontal: 60,
    backgroundColor: 'red',
    fontSize: 18,
    borderRadius: 20,
    color: '#f6ecec',
  },
});

export default WelcomeScreen;
