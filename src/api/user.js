import HttpUtils from '@/utils/http.utils'

const urls = {
  'LOGIN': '/vue-admin-template/user/login',
  'GETINFO': '/vue-admin-template/user/info',
  'LOGOUT': '/vue-admin-template/user/logout'
}

let userSrv = {
  login: function(params) {
    return HttpUtils.post(urls.LOGIN, params)
  },
  getInfo:function(params) {
    return HttpUtils.get(urls.GETINFO, params)
  },
  logout:function(params) {
    return HttpUtils.post(urls.LOGOUT, params)
  }
}

export { userSrv }

