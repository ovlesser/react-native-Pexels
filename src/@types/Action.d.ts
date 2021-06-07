interface FetchAction {
  type: string;
  payload: Data | Error | undefined;
}

interface GetAction {
  type: string;
  payload: Data | Error | undefined;
}
