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
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    marginRight: 12,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#666666',
    fontWeight: '500',
  },
});
