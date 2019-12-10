/*jshint esversion: 6 */
import axios from 'axios';
import AuthAPI from './AuthAPI';
import { API_ORIGIN_URL } from '../config/constants';

axios.defaults.baseURL = API_ORIGIN_URL;

export default class BaseApi extends AuthAPI {
  static get(urlPath, headers) {
    return axios({
      method: 'GET',
      url: urlPath,
      headers,
    });
  }

  static post(urlPath, data) {
    return axios({
      method: 'POST',
      url: urlPath,
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  static patch(urlPath, data) {
    return axios({
      method: 'PATCH',
      url: urlPath,
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }

    });
  }

  static delete(urlPath, data) {
    return axios({
      method: 'DELETE',
      url: urlPath,
      data,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });

  }
}
