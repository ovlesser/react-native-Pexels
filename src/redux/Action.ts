export const FETCH_SUCCEED = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';

export const fetchSucceed = (data: Data): FetchAction => ({
  type: FETCH_SUCCEED,
  payload: data,
});

export const fetchFailed = (error: Error): FetchAction => ({
  type: FETCH_FAILED,
  payload: error,
});
