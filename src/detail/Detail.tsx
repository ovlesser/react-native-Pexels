import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, Dimensions, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const deviceWidth = Dimensions.get('window').width;
const Detail = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element => {
  const {photo}: {photo: Photo} = route.params;

  styles.image = {
    ...styles.image,
    height: (styles.image.width * photo.height) / photo.width,
  };

  useEffect(() => navigation.setOptions({title: photo.id}));

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{uri: photo.src.medium}}
      />
      <Text style={styles.text}>{photo.photographer}</Text>
      <Text style={styles.text}>{photo.photographer_url}</Text>
      <Text style={styles.text}>{`${photo.width} * ${photo.height}`}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0 + 0,
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  image: {
    backgroundColor: 'transparent',
    margin: 24,
    width: deviceWidth * 0.8,
    height: 200,
  },
  text: {
    backgroundColor: 'transparent',
    margin: 8,
    width: deviceWidth * 0.8,
  },
});
export default Detail;
