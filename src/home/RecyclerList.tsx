import React from 'react';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  Dimension,
} from 'recyclerlistview';
import {StyleSheet, StatusBar, Dimensions} from 'react-native';
import Item from './Item';

const getWindowWidth = () =>
  Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;
const RecyclerList = ({
  data,
  nextPage,
  navigation,
}: {
  data: Array<Photo>;
  nextPage: () => void;
  navigation: any;
}): JSX.Element => {
  console.log(
    'RecyclerList',
    data.map(item => item.id),
  );
  const renderItem = (type: string | number, data: any) => (
    <Item photo={data} navigation={navigation} />
  );
  const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  }).cloneWithRows(data);
  const layoutProvider = new LayoutProvider(
    index => {
      return JSON.stringify({
        width: data[index].width,
        height: data[index].height,
      });
    },
    (type: string | number, dim: Dimension) => {
      switch (type) {
        case 'VSEL':
          dim.width = getWindowWidth() / 2;
          dim.height = 150;
          break;
        default:
          if (typeof type === 'string') {
            const {width, height} = JSON.parse(type);
            dim.width = getWindowWidth() / 2;
            // dim.height = (dim.width * height) / width;
            dim.height = 250;
          }
      }
    },
  );
  return (
    <RecyclerListView
      style={styles.container}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={renderItem}
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

export default RecyclerList;
