import axios from "axios";
import Intcp from "./http.intcp";
import qs from "qs";


//添加拦截器
Intcp.interceptors();

function axiosPost(url, params, config) {
  let promise = new Promise((resolve, reject) => {
    axios.post(url, params, config).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
  return promise;
}

function axiosPostToQs(url, params) {
  let promise = new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
  return promise;
}

function axiosGet(url, params) {
  let promise = new Promise((resolve, reject) => {
    axios.get(url, {params}).then(response => {
      response.data = response.data || {};
      resolve(response.data);

    }).catch(err => {
      reject(err);
    });
  });
  return promise;
}

function axiosDelete(url, params) {
  let promise = new Promise((resolve, reject) => {
    axios.delete(url, params).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
  return promise;
}

function axiosPut(url, params) {
  let promise = new Promise((resolve, reject) => {
    axios.put(url, params).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    });
  });
  return promise;
}

export default {
  post: axiosPost,
  postToQs: axiosPostToQs,
  get: axiosGet,
  delete: axiosDelete,
  put: axiosPut
};
