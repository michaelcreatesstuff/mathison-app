import axios from 'axios';
import apiConfig from '../config/apiConfig.json';

const { connection = {}, datasources = {} } = apiConfig;
const { scheme = 'http', hostname = 'localhost:5000', defaultHeaders = {} } = connection;

const api = axios.create({
  baseURL: `${scheme}://${hostname}`,
  headers: defaultHeaders,
});

async function axiosTransformer(datasource, body = null, routeParams = '') {
  const { method, uri, headers } = datasource;
  switch (method) {
    case 'GET':
      return await api.get(uri + routeParams, { ...defaultHeaders, headers });
    case 'POST':
      return await api.post(uri + routeParams, body, { ...defaultHeaders, headers });
    case 'DELETE':
      return await api.delete(uri + routeParams, { ...defaultHeaders, headers });
    default:
      console.error(`Invalid method type ${method}`);
  }
}

const readCategory = (category) => axiosTransformer(datasources?.[category]);
const getBookmarks = () => axiosTransformer(datasources?.getBookmarks);
const createBookmark = (body) => axiosTransformer(datasources?.createBookmark, body);
const deleteBookmark = (id) => axiosTransformer(datasources?.deleteBookmark, null, `/${id}`);

const apis = {
  readCategory,
  getBookmarks,
  createBookmark,
  deleteBookmark,
};

export default apis;
