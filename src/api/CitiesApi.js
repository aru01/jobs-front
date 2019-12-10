import BaseApi from './BaseApi';

export default class CitiesApi extends BaseApi {
  static getAllCities() {
    return this.get('/cities');
  }
}