import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Product = () => {
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('Product');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setProductData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const deleteProduct = async () => {
    try {
      await AsyncStorage.removeItem('Product');
      setProductData(null);
      Alert.alert('Product Deleted', 'Product has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <>
    <StatusBar hidden />
      <View style={styles.mainContainer}>
        <View>
          {productData ? (
            <View style={styles.product}>
              <View style={{display: 'flex'}}>
                <Text>Name: {productData.name}</Text>
                <Text>Description: {productData.description}</Text>
              </View>
              {/* 
        Render images if necessary
        {productDataList.images.map((uri, imageIndex) => (
          <Image key={imageIndex} source={{ uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
        ))}
      */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}>
                <TouchableOpacity style={styles.button}>
                  <Text>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteProduct} style={styles.button}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text>No product data available</Text>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#e0d6d6',
    paddingHorizontal: 20,
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    width: 100,
    backgroundColor: '#858080',
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
  },
});

export default Product;
