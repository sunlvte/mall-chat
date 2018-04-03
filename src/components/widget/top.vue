<template>
  <div class="top">
    <!--<router-link to="/"  class="toindex" >-->
      <!--<i class="iconfont icon-shuidian window"></i>-->
    <!--</router-link>-->
    <a   class="toindex" >
      <i class="iconfont icon-shuidian window"></i>
    </a>
    <div class="topsip" @click="reloadwindow">
      小水总机管理端
    </div>
    <span class="user-name" v-show="mobile">{{mobile}}</span>
    <span>
      <a href="javascript:;" @click="loginOut" class="loginout">退出</a>
    </span>
    <i class="iconfont icon-shuidian logo"></i>
  </div>
</template>

<script>
'use strict';


export default {
  name: 'Top',
  data () {
    return {
      mobile: ''
    };
  },
  created () {
    this.$data.mobile =  this.$cookies.get('user');
  },
  computed: {
    userName () {
      // return (this.$data.username || '').replace(/^(\d{3})\d+(\d{4})$/, '$1***$2');
      return (this.$data.username || '');
    }
  },
  methods: {
    loginOut () {
      this.$cookies.remove('token');
      this.$cookies.remove('username');
      this.$cookies.remove('user');
      window.location.reload();
    },
    reloadwindow () {
      window.location.reload();
    }
  }
};
</script>

<style scoped lang="less">
@import (reference) '../../assets/css/common/public.less';
@keyframes warn1 {
  0% {
    transform: scale(.7);
  }
  100% {
    transform: scale(1.5);
  }
}
.top {
  font-size: 14px;
  text-align: right;
  .fixed;
  z-index:100;
  background-color: @adminhover;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  width: 100%;
  //font-family:@fontPFLight;
  color: @white;
  .toindex{
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    background-color: @adminbgLight;
    color: @white;
    i{
      display: inline-block;
      -webkit-animation: warn1 3s ease-out;
      -moz-animation: warn1 3s ease-out;
      animation: warn1 3s ease-out;
      animation-direction:alternate;
      -webkit-animation-direction:alternate;
      -moz-animation-direction:alternate;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      font-size: 20px;
    }
  }
  .toindex:hover{
    background-color: @adminbg;
  }
  .topsip{
    position: absolute;
    left: 51px;
    top: 0;
    width: 120px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    .pointer;
    font-family:@fontPFLight;
    //font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei";
    font-weight: 100;
    background-color:  @adminbgLight;
  }
  .topsip:hover{
    background-color: @adminbg;
  }
  .user-name{
    font-family:@fontPFLight;
    margin-right: 30px;
  }


  >span {
    padding-right: 1px;
    .loginout{
      display: inline-block;
      color: @white;
      width: 50px;
      height: 48px;
      .center;
      line-height: 50px;
      font-family: @fontPFLight;
    }
    .loginout:hover{
      background-color: @adminbgLight;
    }
  }
  .logo{
    width: 50px;
    height: 50px;
    display: inline-block;
    .center;
  }

}
</style>
