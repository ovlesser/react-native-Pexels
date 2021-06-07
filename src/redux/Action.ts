export const FETCH_SUCCEED = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';
export const GET_SUCCEED = 'GET_SUCCESS';

export const fetchSucceed = (data: Data): FetchAction => ({
  type: FETCH_SUCCEED,
  payload: data,
});

export const fetchFailed = (error: Error): FetchAction => ({
  type: FETCH_FAILED,
  payload: error,
});

export const getSucceed = (data: Data): GetAction => ({
  type: GET_SUCCEED,
  payload: data,
});
