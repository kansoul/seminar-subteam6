import axios, { AxiosResponse } from "axios";
import { API_URL, AUTHENTICATE_TOKEN_KEY } from "../../configs";
import { getSavedState } from "../../utils/helper";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {},
});

function onResponse(response: AxiosResponse): AxiosResponse {
  return response.data;
}

async function onRequest(config: any) {
  const token = getSavedState(AUTHENTICATE_TOKEN_KEY);
  try {
    const authorizationToken = `Bearer ${token}`;
    config.headers.Authorization = authorizationToken;
    // eslint-disable-next-line
  } catch (e) {}

  return config;
}
apiClient.interceptors.request.use(onRequest);
apiClient.interceptors.response.use(onResponse);

export const setHeader = (authToken: any) => {
  window.localStorage.setItem(
    AUTHENTICATE_TOKEN_KEY,
    JSON.stringify(authToken)
  );
};

if (window.localStorage.getItem(AUTHENTICATE_TOKEN_KEY)) {
  const authToken = JSON.parse(
    window.localStorage.getItem(AUTHENTICATE_TOKEN_KEY) || ""
  );
  setHeader(authToken);
}

export default apiClient;
