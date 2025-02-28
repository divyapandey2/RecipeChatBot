import { useSelector, useDispatch } from 'react-redux';
import { removeSearch,clearHistory  } from './slice/historySlice';
import { FlatList, Button, Text, View,StyleSheet } from 'react-native';

export default function History(){
  const history = useSelector((state) => state.history.items);
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeSearch(index));
  };

  const handleClearAll = () => {
    dispatch(clearHistory());
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>
            <Button 
              title="Remove" 
              onPress={() => handleRemove(index)}
              color="#ff6b6b"
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.clearButtonContainer}>
        <Button 
          title="Clear All" 
          onPress={handleClearAll}
          color="#4a4e69"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  item: {
    fontSize: 16,
    color: '#2f2f2f',
    flex: 1,
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  clearButtonContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 10,
  },
});