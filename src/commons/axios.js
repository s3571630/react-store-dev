import _axios from 'axios';

const axios = baseURL =>{
    const instance = _axios.create({
        baseURL: baseURL || 'http://localhost:3004',
        timeout: 1000,
      });

     // 攔截請求以 加入正確jwt格式
    instance.interceptors.request.use(
      config => {
        const jwToken = global.auth.getToken();
        config.headers['Authorization'] = 'Bearer ' + jwToken
        // Do something before request is sent
        return config;
    },
      error => {
        // Do something with request error
        return Promise.reject(error);
    });
    return instance;
}




export {axios};
export default axios();
