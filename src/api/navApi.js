import request from './request'

export default class navApi {
  static getNavInfoByUrl(params) {
    return request({
      url: '/nav/getNavInfoByUrl',
      params
    })
  }
}