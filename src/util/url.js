'use strict';

/**
 * url
 */
const url = {
  //登录
  sendCaptcha: '/api/sysUserSendCaptcha',
  login : '/api/sysUserLogin',

  //user 页
  getUserByPage: '/api/getSysUserByPage',
  editUser: '/api/editSysUserByMobile',
  addUser: '/api/addSysUser',

  //combo
  getComboByPage: '/api/getSysComboByPage',
  editCombo: '/api/editSysCombo',
  addCombo: '/api/addSysCombo',

  //system
  getPhonePool: '/api/getPhonePoolByMainPhone',
  editSystemCode: '/api/editPhonePoolByMainPhone',
  addSystemCode: '/api/addPhonePoolByMainPhone',
  upload: '/api/importPhonePool',

  getConfig:'/api/getSysParamByCondition',
  editConfig: '/api/editSysParamByName',
  addConfig: '/api/addSysParam',
  overLoad: '/api/setSysParameterList',

  // audit
  getAuditTable: '/api/getEntInfoByCondition',
  getEntInfoDetail : '/api/getEntInfoDetail', //	获取企业基本信息
  getEntApDetail : '/api/getEntAptitudeDetail', //	获取企业资质信息
  auditAgreee : '/api/entInfoAuditSuccess', // 审核通过
  auditDisagreee : '/api/entInfoAuditFail', // 审核不通过 退回

  //msg
  getEntInfoMoney: '/api/getEntInfoMoney',//获取费率等信息
  editEntInfoMoney: '/api/editEntInfoMoney', //编辑content
  getEntComboByCondition: '/api/getEntComboByCondition', //msg combo list
  getEntOrderByCondition: '/api/getEntOrderByCondition', //msg order list
  getInvoiceByCondition: '/api/getInvoiceByCondition', //msg invoice list
  postInvoice: '/api/postInvoice', //邮寄
  getCallLogByCondition: '/api/getCallLogByCondition',//邮寄
  getEntAdminByCondition: '/api/getEntAdminByCondition', //管理员列表
  editEntAdminById: '/api/editEntAdminById',
  ss: '/api/editEntAdminById' //ivr获取
}

module.exports = url;
