'use strict';

/**
 * 工具类
 *
 * by jl
 */
// const store = require('store');
  import  fetch from 'vaq/fetch1'
const Popup = require('vaq/popup');
const Mask = require('vaq/mask');
const request = require('vaq/request');
const base = require('vaq/base');

// const crypto = require('crypto'); // 加密文件比较大

const util = {
  /**
   * md5加密
   * @param {string|number} str
   * @return md5
   *
  MD5(str) {
    str = String(str);

    const md5sum = crypto.createHash('md5');

    return md5sum.update(str).digest('hex');
  },
  */
  /*
  * fetch请求
  * @param url String
  * @param data obj
  * @param type string  default post
  * @param method string default fetch
   */
  fetch (options) {
    console.log(options)
    options.url = '/api/ipcapi/1.0' + options.url;
    options.method = options.method || 'fetch';
    options.data = options.data || {};
    options.type = options.type?options.type.toUpperCase(): 'POST';
    if (options.requestConfig) {
      return fetch.apply(this, arguments)
    }
    const formData = options.data || {};
    if (options.type.toUpperCase() === 'POST') {
      if (formData.isUpload === true) {
        options.data = formData.file;
      } else {
        options.data = JSON.stringify(formData);
      }
    }
    return fetch.apply(this, arguments)
  },
  /**
   * ajax 请求
   * @param {object} options
   * @param {function} done
   * @param {function} faile
   *
   * @return
   */
  request (options) {
    const formData = options.data || {};

    options.contentType = options.contentType === undefined ? 'application/json; charset=utf-8' : options.contentType;
    options.loading = options.loading === undefined ? true : options.loading;

    options.type = options.type || 'POST';

    if ((options.url || '').substr(0, 1) === '/') {
      options.url = options.url.substr(1);
    }

    // POST情况使用json，GET使用string, 上传图片不能json化
    if ((options.type || '').toUpperCase() === 'POST') {
      if (formData.isUpload === true) {
        options.data = formData.file;
      } else {
        options.data = JSON.stringify(formData);
      }
    }

    options.url = '/api/ipcapi/1.0/' + options.url;
    // options.url = '/api/1.0/' + options.url; // 本地测试

    /*
    options.xhrFields = {
      withCredentials: true
    }
    */

    return request.apply(this, arguments);
  },

  /**
  * 提示弹窗, 在一段时间内自动关闭
  *
  * @param {string} html
  * @param {object} object
  * @return {new Popup}
  */
  tip (html, obj) {
    let delayTime = 2000;

    if (obj === true) {
      html = '<div class="tip-text-success"><i class="ui icon check circle big"></i> ' + html + '</div>';
      delayTime = 1000;
    } else if (obj === false) {
      html = '<div class="tip-text-error"><i class="ui icon warning circle big"></i> ' + html + '</div>';
    }

    return new Popup($.extend({isMask: false, html: html, delayTime: delayTime, autoClose: true,css: {zIndex: 9998}}, obj));
  },

  /**
  * confirm弹窗
  *
  * @param {string} title
  * @param {function} cb
  * @return {new Popup}
  */
  confirm (title, cb) {
    return new Popup({
      html: title,
      buttons: [
        {
          name: '确定',
          cb: function (_this) {
            const res = cb ? cb(_this) : $.noop;

            return res ? res : true;
          }
        },
        {name: '取消'}
      ]
    });
  },

  /**
   *
   * @param element
   * @param opts
   */
  modal: function (element, opts) {
    const type = $(element).attr('node-type');

    if (!type) {
      throw new Error('node-type属性值为空，或不存在！');
    }

    const options = {
      observeChanges: true
    };

    const dom = $('<div class="ui modal">').modal($.extend(options, opts));

    dom.appendTo('body');

    return function (data) {
      const template = $(element).html();
      const html = base.template(template)(data || {});

      return dom.html(html);
    };
  },

  host () {
    return location.protocol + '//' + location.host;
  },

  /**
   * 页面滚动
   *
   * @param {HTMLElement} flagElement
   * @param {function} cb
   *
   * @return void
   */
  scrollDown (flagEl, cb, fine) {
    const win = $(window);
    const height = ~~win.height();
    const callback = base.throttle(cb, 1000);

    fine = fine || 50;

    let currentTop = ~~win.scrollTop();

    $(window).scroll((e) => {
      const top = ~~$(flagEl).position().top;
      const scrollTop = ~~win.scrollTop();

      if (currentTop >= scrollTop) {
        return;
      }

      currentTop = scrollTop;

      if (top - height - fine < scrollTop) {
        cb && callback();
      }
    });
  },

  /**
   * 统一检查
   *
   * @param {Object} formData 需要检查的数据
   * @param {Object} rule 检查规则
   * @example
   * rule = {key: {validate: Function, msg: '错误'}}
   *
   * @throw new Error
   * @return void
   */
  validate (formData, rule) {
    formData = formData || {};

    $.each(rule, (key, item) => {
      const result = item.validate(formData[key]);

      if (typeof result === 'boolean') {
        if (!result) {
          throw new Error(item.msg);
        }
        return;
      }

      throw new Error(result);
    });
  }
};

module.exports = util;
