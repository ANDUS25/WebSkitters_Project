import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { auth } from '../config/Config';
import Product from './Product';

const {height, width} = Dimensions.get('window');

const Home = () => {
  const [imageUris, setImageUris] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const selectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
    })
      .then(images => {
        const uris = images.map(image => image.path);
        setImageUris(uris);
      })
      .catch(error => {
        console.log('Error selecting images: ', error);
      });
  };

  const uploadProduct = async () => {
    if (!imageUris.length || !productName || !productDescription) {
      ToastAndroid.show(
        'Please select images and fill all fields',
        ToastAndroid.SHORT,
      );
      return;
    }

    try {
      const imageBlobs = await Promise.all(
        imageUris.map(uri => convertToBlob(uri)),
      );
      const productImages = await Promise.all(
        imageBlobs.map((blob, index) => uploadImage(blob, `image_${index}`)),
      );

      const productData = {
        name: productName,
        description: productDescription,
        images: productImages,
      };
      console.log('Product data to be uploaded:', productData);
      AsyncStorage.setItem('Product', JSON.stringify(productData));
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const convertToBlob = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (blob, imageName) => {
    try {
      const imageRef = storage().ref().child(`images/${imageName}`);
      await imageRef.put(blob);
      const downloadURL = await imageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
      return null;
    }
  };

  return (
    <>
      <View style={styles.main}>
        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={text => setProductName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Description"
          value={productDescription}
          onChangeText={text => setProductDescription(text)}
          style={styles.input}
          multiline
        />
        <TouchableOpacity
          onPress={selectImages}
          style={{width: 250, padding: 5, margin: 'auto'}}>
          <Text style={styles.mainButton}>Select Images</Text>
        </TouchableOpacity>
        {imageUris.map((uri, index) => (
          <Image
            key={index}
            source={{uri}}
            style={{width: 200, height: 200, marginBottom: 10}}
          />
        ))}
        <TouchableOpacity
          onPress={uploadProduct}
          style={styles.mainButtonParent}>
          <Text style={styles.mainButton}>Upload Product</Text>
        </TouchableOpacity>

        <Product />
      </View>
      <TouchableOpacity
        style={{width, backgroundColor: '#646363', padding: 15}}
        onPress={() => signOut(auth)}>
        <Text style={{textAlign: 'center', color: '#fff'}}>LogOut</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e0d6d6',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainButtonParent: {
    width: width * 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputDiv: {
    width: width - 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 25,
    marginHorizontal: 'auto',
  },
  mainButton: {
    padding: 20,
    paddingHorizontal: 60,
    backgroundColor: 'red',
    fontSize: 18,
    borderRadius: 20,
    color: '#f6ecec',
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default Home;
