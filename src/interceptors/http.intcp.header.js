/**
 * @Description: 设置http请求headers 请求url添加随机参数
 * @Author: 侯湃
 * @Date: 2020/6/11
 */

let req = {};

/**
 * 请求头添加token
 * */
const setToken = () => {
  try {
    if(window.localStorage.getItem("serviceToken")) {
      req.headers["x-auth-token"] = `${window.localStorage.getItem("serviceToken")}`;
    }
    req.headers["X-Requested-With"] = "XMLHttpRequest";
  } catch (e) {
    console.log("setToken error", e);
  }
};

/**
 * 设置http请求headers
 * */
const setHeaders = () => {
  setToken();
};

/**
 * 给请求的url添加随机参数，避免在ie下本地缓存的问题
 * */
const setRandomParams = () => {
  try {
    let str = "?r=";
    if (req.url.indexOf("&") > -1) {
      str = "&r=";
    }
    str += new Date().getTime();
    req.url += str;
  } catch (e) {
    console.log("setRandomParams error", e);
  }
};

export default {
  setHeader: request => {
    req = request || {};
    setHeaders();
    if (request.method === "get") {
      setRandomParams();
    }
  }
};
