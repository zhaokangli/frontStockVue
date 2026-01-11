import { request } from '../utils/request'

export function getTitles(parmas) {
  const queryString = new URLSearchParams(parmas).toString();
  return request({
    url: `/ques/getTitles?${queryString}`,
    method: 'get'
  })
}
export function submitAnswer(parmas) {
  //提交答案
  return request({
    url: '/ques/submitAnswer',
    method: 'post',
    data: parmas
  })
}


export function getSubmitCountByPageId(parmas) {
  //获取提交人数
  const queryString = new URLSearchParams(parmas).toString();
  return request({
    url: `/ques/getSubmitCountByPageId?${queryString}`,
    method: 'get'
  })
}


export function getResultCard(parmas) {
  //下方测试类型小卡片内容
  const queryString = new URLSearchParams(parmas).toString();
  return request({
    url: `/ques/getResultCard?${queryString}`,
    method: 'get'
  })
}

//获取报告结果  
export function getResult(parmas) {
  //获取报告结果
  const queryString = new URLSearchParams(parmas).toString();
  return request({
    url: `/ques/getResult?${queryString}`,
    method: 'get'
  })
}

export function quesGetQrCode(parmas) {
  //获取支付宝付款码
  return request({
    url: '/ques/getQrCode',
    method: 'post',
    data: parmas
  })
}

export function quesCallback(parmas) {
  //提供支付宝 回调函数
  return request({
    url: '/ques/callback',
    method: 'post',
    data: parmas
  })
}



export function getResultStatus(parmas) {
  //获取报告支付结果
  return request({
    url: '/ques/getResultStatus',
    method: 'post',
    data: parmas
  })
}



export function getAlipayLink(parmas) {
  //支付宝移动端跳转链接
  return request({
    url: '/ques/getAlipayLink',
    method: 'post',
    data: parmas
  })
}


export function getWxPayQrCode(parmas) {
  //获取微信付款码
  return request({
    url: 'ques/getWxPayQrCode',
    method: 'post',
    data: parmas
  })
}