interface FetchAction {
  type: string;
  payload: Data | Error | undefined;
}
