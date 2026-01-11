// src/utils/request.js
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 如果你使用ElementPlus作为UI库，可以用于显示消息提示

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中获取API的基础URL
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    timeout: 5000, // 请求超时时间
    //相应数据转换
    transformResponse: [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如，添加请求头
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 处理请求错误
        console.log(error); // 打印错误信息
        // error.data.msg = '服务器异常，请联系管理员！'
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // 根据后端返回的状态码进行处理
        if (res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 3 * 1000
            });
            // return Promise.reject(new Error(res.msg || 'Error'));
            return Promise.reject( console.log('Error' + res.msg) );
        } else {
            return res;
        }
    },
    error => {
        console.log('err' + error); // 打印错误信息
        return Promise.reject(error);
    }
);


export { service as request }