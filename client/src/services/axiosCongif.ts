import axios, { AxiosError } from 'axios';

function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    return 'Axios is canceled';
  }
  const { response }: AxiosError = error;
  const { status, data }: any = response;
  return { status, data };
}

export const cancelTokenSource = axios.CancelToken.source();
const httpInstance = axios.create({
  timeout: 5000,
  baseURL: '/api/v1',
});

Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line no-param-reassign
  config.cancelToken = cancelTokenSource.token;
  return config;
});

httpInstance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
  ,
);

export default httpInstance;
