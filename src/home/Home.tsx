import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import List from './List';
import Search from './Search';

const Home = ({navigation}) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [keyword, setKeyword] = useState<string>();
  const requests = new Set();
  const fetchData = async (
    query: string = '',
    pageIndex: number = 0,
    perPage: number = 20,
  ) => {
    const url = `https://api.pexels.com/v1/search?query=${query}&page=${pageIndex}&per_page=${perPage}`;
    try {
      if (requests.has(url)) {
        return;
      }
      requests.add(url);
      console.log(`fetch from: ${url}`);      const response = await fetch(url, {
        headers: {
          Authorization:
            '563492ad6f91700001000001414a159eaed14a5594dff71a233e1bd7',
        },
      });
      const json = await response.json();
      const photos =
        data && data.photos ? data?.photos.concat(json.photos) : json.photos;
      setData({...json, photos});
    } catch (error) {
      setError(error);
    } finally {
      requests.delete(url);
    }
  };

  const nextPage = () => {
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
      fetchData(keyword, parseInt(page, 10) || 0, 20);
    }
  };

  const onSearch = (query: string) => {
    setKeyword(query);
    setData(undefined);
  };

  useEffect(() => {
    if (keyword) {
      (async () => await fetchData(keyword, 0, 20))();
    }
  }, [keyword]);

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
