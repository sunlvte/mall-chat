<template>
  <div class="producthtml" v-cloak>
    <Heade :title="2"/>
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
        <h2>产品优势</h2>
        <div class="home_list">
          <div class="home_list_item">
            <div>
              <img src="../assets/image/product1.png" alt="">
            </div>
            <h2>专业</h2>
            <p>十几年专业通讯</p>
            <p>团队精心打造</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/product2.png" alt="">
            </div>
            <h2>优质</h2>
            <p>电信级语音平</p>
            <p>台稳定优质</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/product3.png" alt="">
            </div>
            <h2>垂直</h2>
            <p>专注企业通讯</p>
            <p>极致沟通</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/product4.png" alt="">
            </div>
            <h2>快速</h2>
            <p>即开即用</p>
            <p>按需付款</p>
          </div>
          <div class="home_list_item">
            <div>
              <img src="../assets/image/product5.png" alt="">
            </div>
            <h2>省钱</h2>
            <p>降低通信成本</p>
            <p>助力企业成长</p>
          </div>
        </div>
      </div>

      <div class="home2">
        <h1>产品功能</h1>
        <img src="../assets/image/product6.png" alt="">
      </div>
      <h2 class="combo_zone_h2">高级应用</h2>
      <div class="combo_zone">
        <div class="item">
          <img src="../assets/image/productcard1.png" alt="">
          <h4>智能转接</h4>
          <div class="bottom">
            <p>分机不在线</p>
            <p>自动转手机</p>
          </div>
        </div>
        <div class="item">
          <img src="../assets/image/productcard2.png" alt="">
          <h4>分机跟随</h4>
          <div class="bottom">
            <p>自动跟随最后</p>
            <p>一次通话</p>
          </div>
        </div>
        <div class="item">
          <img src="../assets/image/productcard3.png" alt="">
          <h4>语音留言</h4>
          <div class="bottom">
            <p>不方便接听电话</p>
            <p>时可以留言</p>
          </div>
        </div>
        <div class="item">
          <img src="../assets/image/productcard4.png" alt="">
          <h4>漏话提醒</h4>
          <div class="bottom">
            <p>记录每一次</p>
            <p>电话记录</p>
          </div>
        </div>
      </div>
      <div class="home3">
        <h2>使用场景</h2>
        <div class="centnt">
              <i></i>
          <div class="left">
            <div class="top card">
              <h4>业务总机</h4>
              <p>企业无需购买程控交换机，电话机，也不需要复杂布线</p>
              <p>不需硬件投入，即可享受丰富的集团总机业务</p>
            </div>
            <div class="bottom card">
              <h4>移动办公</h4>
              <p>无论在公司还是出差中，随时随地地接听/拨打电话</p>
            </div>
          </div>
          <div class="right">
            <div class="top card">
              <h4>沟通交流</h4>
              <p>索引本机通讯录和企业通讯录，在手机端即可完成电话、</p>
              <p>视频、及时消息、多方会议等沟通场景</p>
            </div>
            <div class="bottom card">
              <h4>智能交互</h4>
              <p>小水机器人，代替人工客服，提升工作效率，降低人工</p>
              <p>成本</p>
            </div>
          </div>
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
import Img1 from '../assets/image/carousel1.png';
import {Carousel, CarouselItem} from 'element-ui';


const imgAry = [Img1];

export default {
  name: 'Index',
  created () {

  },
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
  @media screen and (max-width:1440px){.producthtml{font-size:10px}}
  @media screen and (min-width:1441px) and (max-width:1680px){.producthtml{font-size:11px}}
  @media screen and (min-width:1681px) {.producthtml{font-size:14px}}


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
      height: 480px;
      &>h2{
        font-size: 3.5em;
        font-weight: 400;
        margin-top: 60px;
        font-family:@fontPFLight;
        .center
      }
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
              margin: 20px auto 20px;
              height: 75px;
            }
          }
          h2{
            font-weight:400;
            position: relative;
            margin-bottom: 20px;
            font-size:20px;
            color: #313131;
            .center;
            &:before{
              content: '';
              display: block;
              width: 16px;
              height: 1px;
              background-color: @333;
              position: absolute;
              bottom: -5px;
              left: 50%;
              margin-left: -8px;
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
        /*.home_list_item:hover{
          //box-shadow:0px 0px 2px 3px #eaeaea;
          box-shadow: 0 0 1px 1px @deepBlue;
          //box-shadow: 0 0 3px 4px rgba(0,0,0,0.15);
          background-color: #f7f9ff;

          //transform: ;
          p{
            color: #0060ff;
          }
        }*/

      }
    }
    .home2{
      width: 100%;
      margin-top:-100px;
      h1{
        font-size: 3.5em;
        transform: translateY(120px);
        font-weight: 400;
        font-family:@fontPFLight;
        .center
      }
      img{
        width: 100% ;
      }
    }
    .combo_zone_h2{
      font-size: 3.5em;
      font-weight: 400;
      margin-top: 60px;
      font-family:@fontPFLight;
      .center
    }
    .combo_zone {
      width: 1200px;
      display: flex;
      margin: 60px auto 110px;
      justify-content: space-between;
      .item{
        width: 250px;
        transition: all .5s ease;
        color:@white;
        background-color: RGb(73, 120, 254);
        font-family:@fontPFLight;
        img{
          display: block;
          margin: 70px auto 30px;
          width: 98px;
          height: 98px;
        }
        h4{
          font-weight: 400;
          font-size: 24px;
          margin-bottom: 30px;
          .center
        }
        .bottom{
          height: 119px;
          background-color: RGB(36, 77, 252);
          padding:30px 0 26px;
          p{
            font-family:@fontPFLight;
            font-size: 18px;
            .center
          }
          p:last-child{
            margin-top: 10px;
          }
        }

      }
      .item:hover{
        //box-shadow:0px 0px 2px 3px #eaeaea;
        // box-shadow: 0 0 3px 4px rgba(0,0,0,0.15);
        transform: scale(1.2);
      }

    }
    .home3{
      background-color: #f7f9ff;
      padding-bottom:100px;
      &>h2{
        font-size: 3.5em;
        font-weight: 400;
        margin-top: 60px;
        padding: 60px 0 40px;
        font-family:@fontPFLight;
        .center
      }
      .centnt{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        position: relative;
        i{
          display: block;
          width: 100%;
          height: 1px;
          position: absolute;
          background-color: #eaecf2;
          top: 210px;
          z-index: 100;
        }
        .card{
          padding: 10px;
          height: 211px;
          position: relative;
        }


        .card:hover{
          background-color: #fff;
          outline:10px solid #f7f9ff;
          outline-offset:-10px;
          h4{
            color: @deepBlue;
          }

        }
        .left{
          border-right: 1px solid #eaecf2;
        }
        .left, .right{
          flex: 1;
          .top{
            border-bottom:1px solid #eaecf2;
          }
        }

        h4{
          font-family:"PingFangSC-Regular";
          font-size: 32px;
          font-weight: 400;
          margin: 30px 0 25px;
          padding-left: 50px;
          color: #282828;
        }
        p{
          font-family:@fontPFLight;
          font-size: 18px;
          padding-left: 50px;
          color: @gray;
          line-height:32px;
        }
        p:last-child{
          margin-bottom: 30px;
        }
      }
    }
  }


</style>
