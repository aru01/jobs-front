import BaseApi from './BaseApi';

export default class TeamsApi extends BaseApi {
  static getAllTeams() {
    return this.get('/teams');
  }
}