<template>
  <div class="header">
    <div class="header_left">
      <div class="logo">
        <img src="../../assets/image/logo.png" alt="">
      </div>
      <div class="index text">
        <router-link to="/" :class="title===1?'active':''" class="a">
         主页
      </router-link>
      </div>
      <div class="text right">
        <router-link to="/product" :class="title===2?'active':''" class="a">
          产品
        </router-link>
      </div>
    </div>
    <div class="header_right">
      <router-link to="/login" class="tologin">
        登录
      </router-link>
    </div>
  </div>
</template>

<script>
'use strict';

export default {
  name: 'Heade',
  components: {
  },
  props: {
    title: Number
  }
};
</script>

<style scoped lang="less">
  @import (reference) '../../assets/css/common/variable.less';
  @import (reference) '../../assets/css/common/public.less';
    @media screen and (min-width:1441px) {
      .header{
      margin-top:10PX;
      }
    }
  .header {
    width:1200px;
    height: 100px;
    position: absolute;
    z-index: 10;
    left:50%;
    margin-left:-550px;
    display: flex;
    padding-top:10px;
    .header_left,.header_right {
      height: 100%;
      font-size: 1em;
      color: @white;
      a{
        color: @white;
      }
    }
    .header_left {
      width: 60%;
      font-size: 18px;
      line-height:100px;
      vertical-align: middle;
      .text{
        line-height: 100px;
        display: inline-block;
        transform: translateY(-20px);
        margin-right:75px;
        a{
          font-family:@fontPFLight;
        }
        a.active{
          color: @deepBlue;
        }
      }
      .right{
        margin-right:30px;
      }
      .text:hover a{
        color: @deepBlue;
        transition: all 0.5s ease;
      }
      .logo {
        margin-right:300px;
        display: inline-block;
        img {
          transform: translateY(-5px);
          width: 150px;
          display: inline-block;
        }
      }
    }
    .header_right{
      .toregister{
        display: inline-block;
        width: 140px;
        height: 48px;
        color: @textColor;
        text-align: center;
        font-size: 16px;
        line-height:46px;
        background-color: @white;
        border-radius: 3px;
        font-family: @fontPFLight;
        border: 2px solid @white;
        transition: all 1s ease;
        letter-spacing:6px;
        .pointer;
      }
      .toregister:hover{
        color: @white;
        background-color: @deepBlue;
        border: 2px solid @deepBlue;
      }
      .tologin{
        display: inline-block;
        width: 140px;
        height: 48px;
        color: @white;
        text-align: center;
        font-size: 16px;
        line-height:46px;
        background-color: transparent;
        border-radius: 3px;
        font-family: @fontPFLight;
        border: 2px solid @white;
        transition: all 1s ease;
        .pointer;
        margin-right:1.5em;
        letter-spacing:6px;
      }
      .tologin:hover{
        color: @deepBlue;
        background-color: @white;
       // border: 2px solid @white;
      }
    }
  }
</style>
