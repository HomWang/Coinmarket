import {axios} from '@/plugins/request';
import qs from 'qs';

const Home = {

  //获取首页行情
  recommendNotice: function(){
    return axios.get('/web_common/recommendNotice');
  },

  //获取首页行情
  indexmarket: function(params){
    const postData = qs.stringify(params);
    return axios.post('/web_common/real/indexmarket', postData);
  },

  //获取风险提示列表
  getRiskHintsList: function(params){
    const postData = qs.stringify(params);
    return axios.post('/web_course/getRiskHintsList', postData);
  },

  //获取风险提示详情
  getRiskHintsDetail: function(params){
    return axios.get(`/web_course/getRiskHintsDetail?id=${params.id}`);
  },

  //获取首页公告列表
  noticeListByMonth: function(){
    return axios.get(`/web_common/noticeListByMonth`);
  },

  //获取公告列表
  noticeList: function(params){
    return axios.get(`/web_common/noticeList?id=${params.id}&currentPage=${params.currentPage}`);
  },

  //获取公告详情
  noticeDetail: function(params){
    return axios.get(`/web_common/noticeDetail?id=${params.id}`);
  },

  //获取关于我们列表
  getContentList: function(){
    return axios.post('/web_course/getContentList');
  },

  //获取关于我们详情
  getContentDetail: function(params){
    const postData = qs.stringify(params);
    return axios.post('/web_course/getContentDetail', postData);
  },

  //获取新手教程
  getCourseList: function(){
    return axios.post('/web_course/getCourseList');
  },

}

export {Home};
