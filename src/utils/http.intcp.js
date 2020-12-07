/**
 * @Description: http请求拦截器、http响应拦截器
 * @Author: 侯湃
 * @Date: 2020/6/11
 */
import axios from "axios";
import Intcp from "../interceptors";

axios.defaults.timeout = 30000; // 异步请求超时时间30s
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

function _interceptors() {
  //http请求拦截器
  axios.interceptors.request.use(req => {
    Intcp.ReqHeader.setHeader(req);
    return req;
  }, error => Promise.reject(error));

  // http响应拦截器
  axios.interceptors.response.use(res => {
    Intcp.ResCode.docode(res);
    return res;
  }, error => {
    Intcp.ResError.doError(error);
    return Promise.reject(error);
  });
}

export default {
  interceptors: _interceptors
};
