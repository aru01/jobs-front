import BaseApi from './BaseApi';

export default class TypesApi extends BaseApi {
  static getAllTypes() {
    return this.get('/job-types');
  }
}
