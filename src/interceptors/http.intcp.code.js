/**
 * @Description: axios拦截器
 * @Author: 侯湃
 * @Date: 2020/6/11
 */
import store from "../store/index";
import {loginSrv} from "../views/Login/login.service";
import {Message} from "element-ui";

let res = {};

/**
 * 对接口返回的code进行统一处理
 * */
const handleCode = () => {
  try {
    let code = res.data.code;
    // console.log('axios response', res);
    if (code == "00006" || code == "10009") {
      Message("登录已过期,请重新登录");
      location.href = location.origin + "/yhz_zzbl_pc/#/login";
    } else if (code == "10008") {
      loginSrv.getServerToken().then(response => {
        if (response.success) {
          try {
            let imServerToken = {...response.data};
            window.localStorage.setItem("serverToken", response.data.jwtToken || "");
            store.commit("loginData/saveImServerToken", imServerToken);
            window.localStorage.setItem("online", "true");
          } catch (e) {
            console.log(e);
          }
        } else {
          Message.error(response.message || "操作失败");
        }
      }).catch(error => {
        console.log(error);
      });
    }
  } catch (e) {
    console.log("handleCode error", e);
  }
};

export default {
  docode: response => {
    res = response || {};
    handleCode();
  }
};
