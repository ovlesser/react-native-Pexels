import {combineReducers} from 'redux';
import {FETCH_FAILED, FETCH_SUCCEED, GET_SUCCEED} from '../redux/Action';

const INITIAL_STATE: ReducerStateType = {
  data: undefined,
  error: undefined,
};

const isData = (object: any): object is Data => object;

const fetchReducer = (
  state = INITIAL_STATE,
  action: FetchAction,
): ReducerStateType => {
  switch (action.type) {
    case GET_SUCCEED:
      if (isData(action.payload)) {
        // const ids: Set<number> = new Set(
        //   state.data?.photos.map(item => item.id),
        // );
        // const newPhotos: Photo[] = action.payload?.photos?.filter(
        //   (item: Photo) => !ids.has(item.id),
        // );
        state = {
          ...state,
          data: {
            ...action.payload,
            photos: action.payload?.photos,
          },
        };
      }
      break;
    case FETCH_SUCCEED:
      if (isData(action.payload)) {
        state = {
          ...state,
          data: {
            ...action.payload,
            photos: state.data?.photos,
          },
          error: undefined,
        };
      }
      break;
    case FETCH_FAILED:
      if (action.payload instanceof Error) {
        state = {
          ...state,
          data: undefined,
          error: action.payload,
        };
      };
      break;
  }
  return state;
};

export default combineReducers({
  fetch: fetchReducer,
});
