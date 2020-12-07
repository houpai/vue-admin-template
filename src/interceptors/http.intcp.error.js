/**
 * @Description: axios错误码响应
 * @Author: 侯湃
 * @Date: 2020/6/11
 */
import { Notification } from 'element-ui'

let error = {};
let notif = null;

/**
 * 接口返回status处理
 * */
const handleError = () => {
  try {
    let status = error.response.status || 400;
    // console.log('error==', error.response);
    switch (status){
      case 400: error.message = '请求出错'; break;
      case 401: error.message = '未授权，请重新登录'; break;
      case 403: error.message = '拒绝访问'; break;
      case 404: error.message = '找不到服务'; break;
      case 500: error.message = '服务器错误'; break;
      case 502: error.message = '网络错误'; break;
      case 503: error.message = '服务不可用'; break;
      case 504: error.message = '网络超时'; break;
      default: error.message = '网络超时';
    }
    if (notif){
      notif.close();
    }
    notif = Notification.error({
      title:'',
      message: error.message,
      offset:50
    })
  }catch (e) {
    console.log('handleError error', e);
  }
};

export default {
  doError: err => {
    error = err || {};
    handleError();
  }
}
