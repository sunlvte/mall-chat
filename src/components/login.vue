<template>
  <div class="login" >
    <Heade />
    <img src="../assets/image/carouselbg.png" alt="" >
    <div class="line"></div>
    <div class="ui form segment">
      <h1 class="ui header">小水总机管理端</h1>
      <div class=" telfiled">
      <div class=" phone">
        <i class="iconfont icon-yingyongpeizhi"></i>
        <input type="number" placeholder="手机号" maxlength="11"  v-model="phoneNum">
      </div>
      <div class=" field ma">
        <div class="ui  send" @click="sendCode" v-if="+status === 0">发送验证码</div>
        <div class="ui send  disabled"  v-if="+status === 1">{{secondValue}} 秒</div>
      </div>
    </div>
      <div class="validateC">
        <i class="iconfont icon-lock"></i>
        <input type="text"  placeholder="验证码" v-model="authCode" @blur="unblur"  v-focus="focusState">
      </div>
      <div class="field text-center submitC" >
        <span class="ui button primary submit" @click="submit">登录</span>
      </div>
    </div>
    <!--底部-->
    <Botto />
  </div>
</template>

<script>
'use strict';

import Heade from './widget/heade.vue';
import Botto from './widget/botto.vue';

const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  name: 'Login',
  data () {
    return {
      phoneNum: '', // 手机号
      authCode: '', // 验证码
      status: 0, // 0，需要发送验证码，1， 验证码跑秒
      secondValue: 0, // 秒数
      focusState: false
    };
  },
  methods: {
    validate (formData) {
      const rule = {
        phoneNum: {
          validate: function (value) {
            return /^1\d{10}$/.test(value);
          },
          msg: '手机号码格式有误！'
        },
        authCode: {
          validate: function (value) {
            return /^[0-9a-zA-z]{4,8}$/.test(value);
          },
          msg: '短信验证码有误！'
        }
      };
      ubase.validate(formData, rule);
    },
    resetSecond () {
      this.$data.secondValue = 60;
      this.$data.status = 1;

      const timer = setInterval(() => {
        let secondValue = this.$data.secondValue;

        secondValue--;

        if (secondValue <= 0) {
          secondValue = 0;
        }

        this.$data.secondValue = secondValue;

        if (secondValue <= 0) {
          clearInterval(timer);
          this.$data.status = 0;
        }
      }, 1000);
    },
    sendCode () {
      const phone = this.$data.phoneNum;

      if (!phone) {
        ubase.tip('请输入正确的手机号', false);
        return;
      }
      ubase.request({
        url: url.sendCaptcha,
        data: {
          mobile: phone
        }
      }, (data) => {
        this.resetSecond();
        this.focusclick();
      });
    },
    submit () {
      try {
        this.validate(this.$data);
      } catch (e) {
        return ubase.tip(e.message, false);
      }
      const phone = this.$data.phoneNum;
      const authCode = this.$data.authCode;
      ubase.request({
        url: url.login,
        data: {
          mobile: phone,
          authCode
        }
      }, (data) => {
        const result = (data || {}).systemUser || {};
        this.$cookies.set('token', result.token || '', {expires: 7});
        this.$cookies.set('user', result.mobile, {expires: 7});
        setTimeout(() => {
          this.$router.push('/message');
        }, 50);
      });
    },
    focusclick () {
      this.focusState = true;
    },
    unblur () {
      this.focusState = false;
    }
  },
  components: {
    Heade,
    Botto
  },
  directives: {
    focus: {
      update: function (el, {value}) {
        if (value) {
          el.focus();
        }
      }
    }
  }
};

</script>

<style scoped lang="less">
@import (reference) '../assets/css/common/public.less';

@media screen and (max-width:1440px){.login{font-size:10px}}
@media screen and (min-width:1441px) and (max-width:1680px){.login{font-size:11px}}
@media screen and (min-width:1681px) {.login{font-size:14px}}


.login {
  width: 100%;
  position: relative;
  &>img{
    width: 100%;
    height: 100%;
    max-width: 1920px;
    position: absolute;
    left: 50%;
    margin-left:-50%;
    z-index: -1;
  }
  .line{
    height: 12em;
    width: 100%;
  }
  .ui.form.segment {
    font-size: inherit;
    width: 58em;
    height: 44em;
    margin: 0 auto 5em;
    /*transform: translateY(15em);*/
    .header{
      margin:2em auto 2em;
      font-family:"PingFangSC-Regular";
      font-weight: 400;
      font-size: 2.6em;
      .center
    }
    .telfiled{
      width: 45em;
      height: 5em;
      margin: 0 auto;
      position: relative;
      .phone{
        width: 100%;
        height: 100%;
        position: relative;
        .icon-yingyongpeizhi{
          position: absolute;
          left: .5em;
          display: block;
          height: 2.5em;
          line-height:2.5em;
          font-size: 2em;
          color: @deepBlue;
        }
        input{
          display: block;
          width: 100%;
          height: 100%;
          font-size: 1.6em;
          text-indent: 1.2em;
          border: 1px solid @deepBlue;
          //border: 1px solid @lightGray;
        }
      }
      .ma{
        height: 100%;
        width:15em;
        border: 1px solid @deepBlue;
        //border: 1px solid @lightGray;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 3px;
        z-index: 3;
        background-color: #fff;
        .send{
          line-height: 3em;
          font-size: 1.6em;
          .center;
          .pointer;
          color: @deepBlue;
          text-overflow: ellipsis;
          white-space:nowrap;
          font-family: @fontPFLight;
        }
      }
    }
    .validateC{
      width: 45em;
      height: 5em;
      margin: 4em auto;
      position: relative;
      .icon-lock{
        position: absolute;
        left: .5em;
        display: block;
        height: 2.5em;
        line-height:2.5em;
        font-size: 2em;
        color: @lightGray;
      }
      input{
        width: 100%;
        height: 100%;
        font-size: 1.6em;
        text-indent: 1.2em;
      }
      input:focus{
        border-color: @deepBlue;
      }
    }
    .submitC {
      width: 45em;
      margin: 4em auto;
      .submit{
        width: 100%;
        height: 100%;
        font-size: 1.8em;
        background-color: @deepBlue;
      }
      .toregister{
        display: block;
        font-size: 1.6em;
        margin-top: 2em;
        color: @deepBlue;
        .center;
      }
    }
  }
}
</style>
