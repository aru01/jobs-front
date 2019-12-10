import BaseApi from './BaseApi';

export default class UsersApi extends BaseApi {

  static applyForm(data) {
    return this.post('/apply', data);
  }
}
