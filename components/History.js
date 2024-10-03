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
    <View>
    <FlatList
      data={history}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        
        <View>
          <Text style={styles.item}>{item}</Text>
          <Button title="Remove" onPress={() => handleRemove(index)}  />
        </View>
       
      )}
    />
    <Button title="Clear All" onPress={handleClearAll} />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  
  
});