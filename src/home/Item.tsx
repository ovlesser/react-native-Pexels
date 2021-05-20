import React from 'react';
import {StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const Item = ({
  photo,
  navigation,
}: {
  photo: Photo;
  navigation: any;
}): JSX.Element => {
  const navigate = () => navigation.navigate('Detail', {photo});

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <Image
        style={styles.item}
        resizeMode={'cover'}
        source={{uri: photo.src.medium}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'aqua',
    margin: 4,
    width: deviceWidth / 2 - 4 * 2,
    height: 200,
  },
});
export default Item;
