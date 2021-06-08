import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import ImageLayout from 'react-native-image-layout';

const StaggeredGridImageList = ({
  data,
  nextPage,
}: {
  data: Array<Photo>;
  nextPage: () => void;
}): JSX.Element => {
  console.log(
    'StaggeredGridImageList',
    data.map(item => item.id),
  );
  return data ? (
    <ImageLayout
      style={styles.list}
      images={data.map((photo: Photo) => ({
        uri: photo.src.medium,
      }))}
      onEndReached={nextPage}
      rerender={true}
    />
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight || 0 + 0,
    marginHorizontal: 0,
  },
});

export default StaggeredGridImageList;
