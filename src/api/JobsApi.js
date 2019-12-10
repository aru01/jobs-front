import BaseApi from './BaseApi';

export default class JobsApi extends BaseApi {
  static getAllJobs() {
    return this.get('/jobs');
  }
  static getOneJob(slug) {
    return this.get(`/jobs/${slug}`);
  }
}
