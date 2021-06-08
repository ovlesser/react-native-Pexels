import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import List from './List';
import {default as List} from './StaggeredGridImageLayout';
import Repository from '../repository/Repository';
import Search from './Search';

const Home = ({navigation}) => {
  const data: Data = useSelector(state => state.fetch.data);
  const error: Error = useSelector(state => state.fetch.error);

  const nextPage = async () => {
    const key = 'page';
    if (data?.next_page) {
      const page = decodeURIComponent(
        data.next_page.replace(
          new RegExp(
            '^(?:.*[&\\?]' +
              encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
              '(?:\\=([^&]*))?)?.*$',
            'i',
          ),
          '$1',
        ),
      );
      await Repository.refresh(data.photos[0].keyword, parseInt(page, 10) || 0);
      // TODO: to find a better way to get refreshed data fro database
      Repository.get();
    }
  };

  const onSearch = async (query: string) => {
    await Repository.clear();
    await Repository.refresh(query, 0);
    await Repository.get();
  };

  useEffect(() => {
    if (!data && !error) {
      (async () => {
        await Repository.get();
      })();
    }
  });

  const list =
    data && !!data.photos && data.photos.length > 0 ? (
      <List data={data.photos} nextPage={nextPage} navigation={navigation}/>
    ) : undefined;

  const icon = error ? (
    <Icon name={'cloud-off'} style={styles.icon} size={160} color={'grey'} />
  ) : undefined;

  const search = <Search onSearch={onSearch} />;

  return (
    <SafeAreaView style={styles.container}>
      {search}
      {list}
      {icon}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0 + 0,
    marginHorizontal: 0,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    top: '40%',
  },
});
export default Home;
