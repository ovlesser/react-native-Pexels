import React from 'react';
import {StyleSheet, FlatList, StatusBar} from 'react-native';
import Item from './Item';
const List = ({
  data,
  nextPage,
  navigation,
}: {
  data: Array<Photo>;
  nextPage: () => void;
  navigation: any;
}): JSX.Element => {
  const renderItem = ({item}: {item: Photo}) => (
    <Item photo={item} navigation={navigation} />
  );
  return (
    <FlatList
      style={styles.container}
      data={data}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={(item: Photo) => item.id.toString()}
      onEndReached={nextPage}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    paddingTop: StatusBar.currentHeight || 0 + 0,
    marginHorizontal: 0,
  },
});
export default List;
