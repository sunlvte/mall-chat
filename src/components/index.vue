<template>
  <div class="indexhtml" >
    <Heade :title="1"/>
    <div class="swiper_zone">
      <div class="block">
        <el-carousel arrow="never" :height="height">
          <el-carousel-item v-for="item in imgAry" :key="item">
            <div class="item-img">
              <img :src="item" alt="">
              <div class="imgCon">
                <h2>小水总机</h2>
                <p>依托云技术、融合智能技术来服务各大企业客户，为企业提供功能齐全、高效稳定的云总机呼入呼出场景</p>
                <p>解决方案，助力企业快速提升客户满意度及运营效率</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="home">
      <div class="home1">
        <div class="home_list">
          <div class="home_list_item">
            <div>
              <img src="../assets/image/indexcard1.png" alt="">
            </div>
            <p>运营商级交换平台</p>
            <p>安全、稳定、智能</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/indexcard2.png" alt="">
            </div>
            <p>企业组织机构和</p>
            <p>通讯导入、导出</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/indexcard3.png" alt="">
            </div>
            <p>集语音、短信和IM</p>
            <p>于一身</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/indexcard4.png" alt="">
            </div>
            <p>电话会议、视频</p>
            <p>留言箱、漏话提醒</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/indexcard5.png" alt="">
            </div>
            <p>无须额外设备、即</p>
            <p>开即通、节约成本</p>
          </div>
        </div>
      </div>

      <div class="jizhi">
        <h2>极致通信</h2>
        <div class="content">
          <p class="p1">点对点视频</p>
          <p class="p2">语音留言箱</p>
          <p class="p3">外线呼入/呼出</p>
          <p class="p4">通话记录</p>
          <p class="p5">电话会议</p>
          <p class="p6">即时消息</p>
          <p class="p7">自助IVR导航</p>
          <p class="p8">挂机语音</p>
          <p class="p9">漏话提醒</p>
          <p class="p10">集团公告</p>
          <p class="p11">呼叫转移</p>
          <img src="../assets/image/index1jizhi.png" alt="">
          <div class="center">
            <img src="../assets/image/index2jizhi.png" alt="">
            <!--<div class="dot"></div>-->
            <div class="pulse1"></div>
            <div class="pulse2"></div>
            <div class="pulse3"></div>
          </div>
        </div>
      </div>
      <div class="home2">
        <div class="tel_zone">
          <div class="tel">
            <p>统一对外联络号码为</p>
            <h3>95号码、固话或400号码</h3>
            <p>企业形象高大上</p>
          </div>
          <img src="../assets/image/indextel.png" alt="">
        </div>
      </div>
      <h1 class="buyitem">购买套餐</h1>
      <div class="combo_zone">
        <div class="item">
          <h3>套餐一</h3>
          <h2><span>¥</span>2880</h2>
          <p class="dot">包含10个分机、15000分钟通话时长、</p>
          <p>1000条短信</p>
          <p class="dot">
            1个会议室、2G留言存储空间
          </p>
          <p class="dot">
           IM免费、分机免费、企业公告免费
          </p>
          <div class="button pngfix open_cckf_chatwin_cls">立即支付</div>
        </div>
        <div class="item">
          <h3>套餐二</h3>
          <h2><span>¥</span>4880</h2>
          <p class="dot">包含20个分机、26000分钟通话时长、</p>
          <p>4000条短信</p>
          <p class="dot">
            3个会议室、6G留言存储空间
          </p>
          <p class="dot">
            IM免费、分机免费、企业公告免费
          </p>
          <div class="button pngfix open_cckf_chatwin_cls">立即支付</div>
        </div>
        <div class="item">
          <h3>套餐三</h3>
          <h2><span>¥</span>8880</h2>
          <p class="dot">包含40个分机、48000分钟通话时长、</p>
          <p>10000条短信</p>
          <p class="dot">
            5个会议室、10G留言存储空间
          </p>
          <p class="dot">
            IM免费、分机免费、企业公告免费
          </p>
          <div class="button pngfix open_cckf_chatwin_cls">立即支付</div>
        </div>
      </div>
    </div>
    <!--底部-->
    <Botto/>
  </div>
</template>

<script>
'use strict';

import Heade from './widget/heade';
import Botto from './widget/botto';
import {Carousel, CarouselItem} from 'element-ui';
import Img1 from '../assets/image/carousel1.png';


const imgAry = [Img1];

export default {
  name: 'Index',

  data () {
    return {
      imgAry,
      height: document.documentElement.clientWidth * 990 / 1920 + 'px'
    };
  },
  components: {
    Heade,
    Botto,
    ElCarousel: Carousel,
    ElCarouselItem: CarouselItem
  }
};
</script>

<style scoped lang="less">
  @import (reference) '../assets/css/common/variable.less';
  @import (reference) '../assets/css/common/public.less';
  // 顶部导航栏
  @media screen and (max-width:1440px){.indexhtml{font-size:10px}}
  @media screen and (min-width:1441px) and (max-width:1680px){.indexhtml{font-size:11px}}
  @media screen and (min-width:1681px) {.indexhtml{font-size:14px}}
  @keyframes warn1 {
    0% {
      transform: scale(0.7);
      opacity: 1;
    }
    25% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
    75% {
      transform: scale(1.35);
      opacity: 1;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  @keyframes warn2 {
    0% {
      transform: scale(0.7);
      opacity: 1;
    }
    25% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
    75% {
      transform: scale(1.35);
      opacity: 1;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  @keyframes warn3 {
    0% {
      transform: scale(.7);
      opacity: 1;
    }
    25% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
    75% {
      transform: scale(1.35);
      opacity: 1;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
  // 轮播图
  .swiper_zone {
    .block {
    }
    .el-carousel__item{
      background-repeat: no-repeat;
      width: 100%;
      .item-img {
        width: 100%;
        position: relative;
        img{
          width: 100%;
        }
        .imgCon{
          position: absolute;
          top:15em;
          left:50%;
          margin-left: -600px;
          width: 1200px;
          text-align: center;
          color: @white;
          h2{
            font-size: 6em;
            text-align: center;
            letter-spacing:3px
          }
          p{
            font-size: 1.8em;
            text-align: center;
            font-family: @fontPFLight;
          }
          p:nth-child(2){
            margin: 40px 0 10px 0;
          }
        }
      }
    }
  }

  // home主页
  .home {
    display: block;
    .home1{
      background-color: #f7f9ff;
      height: 360px;
      .home_list {
        width: 1200px;
        padding: 60px 0px 100px;
        margin: 0 auto;
        height: 300px;
        display: flex;
        justify-content: space-around;
        .home_list_item {
          width: 200px;
          height: 250px;
          transition: all .5s ease-in-out;
          &>div{
            img{
              display: block;
              margin: 20px auto 40px;
              height: 75px;
            }
          }
          p{
            font-family:@fontPFLight;
            font-size:16px;
            color: #929292;
            text-align: center;
            transition: all 1s ease;
            letter-spacing: 4px;
          }
          p:last-child{
            margin-top:5px;
            margin-bottom:30px;
          }
        }
        .home_list_item:hover{
          //box-shadow:0px 0px 2px 3px #eaeaea;
          box-shadow: 0 0 1px 1px @deepBlue;
          //box-shadow: 0 0 3px 4px rgba(0,0,0,0.15);
          background-color: @white;
          //transform: ;
          p{
            color: #0060ff;
          }
        }

      }
    }
    .jizhi {
      width: 1200px;
      margin:0 auto 100px;
      background-color: @white;
      h2{
        margin:58px 0 50px;
        text-align: center;
        font-size:3.5em;
        font-weight:400;
        font-family: @fontPFLight;
      }
      .content{
        width: 813px;
        height: 722px;
        margin: 0 auto;
        position: relative;
        &>p{
          font-size:16px;
          color: @gray;
          font-family: @fontPFLight;
          position: absolute;
        }
        .p1{
          left: -18px;
          top:98px
        }
        .p2{
          left: -82px;
          top:221px
        }
        .p3{
          left: -122px;
          top:349px
        }
        .p4{
          left: -65px;
          top:472px
        }
        .p5{
          left: -60px;
          top:580px;
          color: @indexBlue;
          font-size: 26px;
          font-family:"PingFangSC-Regular";
        }
        .p6{
          left: 80px;
          top:652px;
          color: @indexPurple;
          font-size: 26px;
          font-family:"PingFangSC-Regular";
        }
        .p7{
          right:-26px;
          top:97px;
        }
        .p8{
          right:-63px;
          top:220px;
        }
        .p9{
          right:-85px;
          top:350px;
        }
        .p10{
          right:-70px;
          top:470px;
        }
        .p11{
          right:-10px;
          top:590px;
        }
        .center{
          width: 581px;
          height: 461px;
          position: absolute;
          top:50%;
          left:50%;
          margin-left:-275px;
          margin-top:-280px;
          z-index: 10;
          img{
            position: relative;
            z-index: 20;
          }
          /* 产生动画（向外扩散变大）的圆圈  */
          .pulse1 {
            position: absolute;
            width: 200px;
            height: 200px;
            /*left: 70px;*/
            /*top: 85px;*/
            left: 170px;
            top: 175px;
            border: 100px solid #cfeafb;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            z-index: 4;
            opacity: 0;
            -webkit-animation: warn1 3s ease-out;
            -moz-animation: warn1 3s ease-out;
            animation: warn1 3s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
          }
          .pulse2 {
            position: absolute;
            width: 320px;
            height: 320px;
            /*left: 10px;*/
            /*top: 20px;*/
            left: 110px;
            top: 115px;
            border: 100px solid #e8f5fd;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            z-index: 3;
            opacity: 0;
            -webkit-animation: warn2 3s ease-out;
            -moz-animation: warn2 3s ease-out;
            animation: warn2 3s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
          }
          .pulse3{
            position: absolute;
            width: 460px;
            height: 460px;
            /*left: -55px;*/
            /*top: -50px;*/
            left: 40px;
            top: 45px;
            border: 100px solid #f3fafe;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            z-index: 2;
            opacity: 0;
            -webkit-animation: warn3 3s ease-out;
            -moz-animation: warn3 3s ease-out;
            animation: warn3 3s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
          }
        }
      }
    }
    .home2{
      background-color: #f7f9ff;
      height: 470px;
      .tel_zone {
        width: 1200px;
        padding: 60px 0px 100px;
        margin: 0 auto;
        height: 300px;
        display: flex;
        justify-content: space-around;
        .tel {
          margin-top: 80px;
          letter-spacing:2px;
          p{
            font-size:24px;
            color: @gray;
            font-family:@fontPFLight;
          }
          h3{
            font-family:"PingFangSC-Regular";
           // font-family:@fontPFLight;
            font-weight:400;
            font-size: 42px;
            margin:20px 0;
            //background-image: -webkit-gradient(linear, left center, right center, from(rgba(234, 101, 10, 1)), to(rgba(246, 199, 156, 1)));//起作用关键的样式
            background-image: -webkit-gradient(linear, left bottom, right top, from(@indexPurple), to(@indexBlue));//起作用关键的样式
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        img {
          /*width: 400px;*/
          /*height:260px;*/
          width: 562px;
          height: 376px;
          //transform: translate(-90px,70px);
          transform: translate(-30px,-5px);
        }
      }
    }
    .buyitem{
      transform: translateY(60px);
      .center;
      font-size:3.5em;
      font-weight:400;
      font-family:@fontPFLight;
    }
    .combo_zone {
      width: 1100px;
      display: flex;
      margin: 40px auto 110px;
      justify-content: space-between;
      padding-top:80px;
      .item{
        width: 320px;
        transition: all .5s ease;
        h3{
          height: 70px;
          line-height: 70px;
          font-size:22px;
          color: @white;
          font-family:@fontPFLight;
          font-weight:400;
          .center;
        }
        h2{
          color: @indexBlue;
          font-size: 60px;
          margin:25px 0 15px;
          font-family:"PingFangSC-Regular";
          font-weight:400;
          letter-spacing:2px;
          span{
            font-size:16px;
            margin-right:6px;
          }
          .center
        }
        p{
          padding:0 0px 0 40px;
          line-height: 25px;
          color: @666;
          .font14;
        }
        .dot{
          position: relative;
          &:before{
            content:'';
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: absolute;
            left: 22px;
            top:7px;
            background-color: @gray;
          }
        }
        .button{
          width: 110px;
          height: 40px;
          line-height: 40px;
          font-family:"PingFangSC-Regular";
          font-size: 16px;
          color: @white;
          margin: 50px auto 42px;
          display: block;
          border-radius: 3px;
          .center;
          .pointer;
        }
      }
      .item:hover{
        //box-shadow:0px 0px 2px 3px #eaeaea;
       // box-shadow: 0 0 3px 4px rgba(0,0,0,0.15);
        box-shadow: 0 0 3px 3px rgba(0,0,0,0.15);

      }
      &>.item:first-child{
        border: 1px solid @indexBlue;
        h3{
          background-color: @indexBlue;
        }
        .button{
          background-color: @indexBlue;
        }
      }
      &>.item:nth-child(2){
        border: 1px solid #ffa132;
        h3{
          background-color: #ffa132;
        }
        h2{
          color: #ffa132;
        }
        .button{
          background-color: #ffa132;
        }
      }
      &>.item:nth-child(3){
        border: 1px solid #86d52b;
        h3{
          background-color: #86d52b;
        }
        h2{
          color: #86d52b;
        }
        .button{
          background-color: #86d52b;
        }
      }
    }
  }

</style>
