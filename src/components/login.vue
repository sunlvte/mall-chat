<template>
  <div class="login" >
    login
  </div>
</template>

<script>
'use strict';



export default {
  name: 'Login',
  data () {
    return {

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

  },
  directives: {

  }
};

</script>

<style scoped lang="less">





</style>
