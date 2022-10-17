import axios, { AxiosError } from 'axios';

function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    return 'Axios is canceled';
  }
  const { response } = error;
  switch (response?.status) {
    case 400:
      return {
        message: `${response.status}: Bad request`,
        description: response?.statusText ?? 'Unexpected error',
      };
    case 500:
      return {
        message: `${response.status}: Internal server busy`,
        description: response?.statusText ?? 'Unexpected error',
      };
    default:
      return {
        message: `Error Code: ${response?.status ?? response?.status}`,
        description: response?.statusText ?? 'Unexpected error',
      };
  }
}

const httpInstance = axios.create({
  timeout: 5000,
  baseURL: 'https://localhost.com',
});

httpInstance.defaults.headers.common.isLoading = true;
httpInstance.defaults.headers.common.successAlert = false;
httpInstance.defaults.headers.common.errorAlert = true;
Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use((config) => config);

httpInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default httpInstance;
