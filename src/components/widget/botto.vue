<template>
  <div class="bottom">
    <div class="bottom_content">
      <div class="content_left">
        <div class="top">
          <a href="http://www.kyong.net/Index/Index/about">关于我们</a>
          <router-link to="/service">
            服务条款
          </router-link>
          <a href="http://www.kyong.net/Index/Index/about#about-cm">联系我们</a>
        </div>
        <div class="address">
          <p>北京总部地址：北京市朝阳区大望京商务区浦项中心B座7C-7D</p>
          <p class="indentp">北京市朝阳区建外大街93号万达广场3号楼1506</p>
          <p>上海子公司地址：上海市浦东新区纳贤路800号1幢2楼</p>
          <p>深圳子公司地址：广东省深圳市南山区软件产业基地5E栋802D</p>
          <p>四川分公司地址：成都市武侯区一环路西一段瑞金广场1栋16b</p>
        </div>
      </div>
      <div class="content_right">
        <div class="pic">
          <span>
            <img src="../../assets/image/android.png" alt="" >
            <p class="android">Android</p>
          </span>
          <span class="firstimg">
            <img src="../../assets/image/ios.png" alt="" >
            <p class="ios">IOS</p>
          </span>
        </div>
      </div>
    </div>
    <div class="copyright">Copyright © 2011-2016 北京烽火万家科技有限公司 All Rights Reserved 京ICP备14032726号-3</div>
  </div>
</template>
<script>
'use strict';

export default {
  name: 'botto',
  components: {}
};
</script>

<style scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
  @import (reference) '../../assets/css/common/variable.less';
  // 底部
  .bottom {
    display: block;
    width: 100%;
    background-color: #20262f;
    padding-bottom: 50px;
    .bottom_content {
      width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .content_left {
        .top{
            margin:70px 0 40px;
          a {
            width: 30%;
            color: @white;
            font-size: 13px;
            margin:0 40px 0 0;
            font-family:@fontPFLight;
          }
        }
        .address{
          //margin-top: 10px;
          p{
            color: @white;
            font-size: 12px;
            font-family:"PingFangSC-Regular";
            margin-bottom: 10px;
          }
          .indentp{
            text-indent: 84px;
          }
        }
      }
      .content_right{
        width: 500px;
        margin-top: 90px;
        .pic{
          display: flex;
          justify-content: space-around;
          //margin-right: 100px;
          .firstimg{
            transform: translateX(-35px);

           }
          span{
            img{
              width: 140px;
            }
            p{
              color: @white;
              font-size: 14px;
              margin-top: 5px;
              font-family:"PingFangSC-Regular";
              .center
            }
          }
        }
      }
    }
    .copyright{
      text-align: center;
      color: @white;
      margin-top: 40px;
      font-size: 13px;
    }
  }
</style>
