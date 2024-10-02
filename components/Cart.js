import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from './slice/cartSlice'; 

export default function Cart() {
 const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); 
 
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.original}</Text>
      <Button title="Remove from Cart" onPress={() => handleRemoveFromCart(item)} /> 
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderCartItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
