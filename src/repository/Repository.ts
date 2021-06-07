import {insertAll, clearAll, fetchAll} from '../database/Database';
import fetchData from '../network/FetchData';
import {FETCH_SUCCEED, FETCH_FAILED, GET_SUCCEED} from '../redux/Action';
import {store} from '../App';

export default class Repository {
  static data: Data;
  static cachedData?: Photo[];

  static get = async () => {
    Repository.cachedData = await fetchAll();
    console.log(
      'get',
      Repository.cachedData.map(item => item.id),
    );
    store.dispatch({
      type: GET_SUCCEED,
      payload: {...Repository.data, photos: Repository.cachedData},
    });
  };

  static refresh = async (query: string = '', pageIndex: number = 0) => {
    if (query === '') {
      return;
    }
    try {
      const ids = new Set(Repository.cachedData?.map(item => item.id));
      Repository.data = await fetchData(query, pageIndex);
      Repository.data?.photos.forEach(item => (item.keyword = query));
      // console.log('refresh, ids', ids);
      const newPhotos =
        Repository.data &&
        Repository.data?.photos &&
        Repository.data.photos.filter(item => !ids.has(item.id));
      if (newPhotos && newPhotos.length > 0) {
        console.log(
          'insert',
          newPhotos.map(item => item.id),
        );
        insertAll(newPhotos);
      }
      store.dispatch({
        type: FETCH_SUCCEED,
        payload: {
          ...Repository.data,
          photos: Repository.cachedData,
        },
      });
    } catch (error) {
      store.dispatch({type: FETCH_FAILED, payload: error});
    }
  };

  static clear = async () => {
    await clearAll();
  };
}
