<template>
  <div class="left" :class="getListActive?'active':''">
    <div v-show="getListActive" class="listBtn" @click="changeActive">
      <i class="iconfont icon-zhankaianniuicon "></i>
    </div>
    <div v-show="!getListActive" class="listBtn" @click="changeActive">
      <i class="iconfont icon-liebiao2 "></i>
    </div>
    <div class="menu" :class="getListActive?'active':''" v-show="!getListActive">
      <el-tooltip v-for="(item,index) in urls" :key="index"
           :class="'item ' + (currentUrl === item.url ? 'active' : '')"
           effect="dark" :content="item.name" placement="right"

      >
        <el-button class="elBtn">
          <router-link :to="item.url" class="a">
            <i class="iconfont " :class="item.icon"></i>
           <span v-show="getListActive">{{item.name}}</span>
          </router-link>
        </el-button>
      </el-tooltip>
    </div>
    <div class="menu" :class="getListActive?'active':''" v-show="getListActive">
      <div v-for="(item,index) in urls" :key="index"
        :class="'item ' + (currentUrl === item.url ? 'active' : '')"
         v-show="+getListActive"
      >
        <router-link :to="item.url" class="a">
          <i class="iconfont" :class="item.icon"> </i>
          <span v-show="getListActive">{{item.name}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
'use strict';
import store from '@/store/';
import { mapMutations, mapGetters } from 'vuex';


const urls = [
  {url: '/message', name: '企业信息', icon: 'icon-qiyetupu'},
  {url: '/audit', name: '企业审核', icon: 'icon-shenhebohui'},
  {url: '/combo', name: '套餐管理', icon: 'icon-taocan'},
  {url: '/system', name: '系统管理', icon: 'icon-xitongshezhipx'},
  {url: '/user', name: '用户管理', icon: 'icon-yonghu'}
//  {url: '/bill/list', name: '发票列表', icon: 'icon-baobiaotongji'},
//  {url: '/bill/tickets', name: '话单查询', icon: 'icon-baobiaotongji'}
];

export default {
  name: 'Left',
  data () {
    return {
      urls,
      currentUrl: '',
      mobile: 'ddd'
    };
  },
  beforeCreate () {
  },
  created () {
    this.$data.currentUrl = this.$route.path;
  },
  computed: mapGetters('root', ['getListActive']),
  methods: mapMutations('root', ['changeActive']),
  store
};
</script>

<style scoped lang="less">
@import (reference) '../../assets/css/common/public.less';

.left {
  position: fixed;
  left: 0;
  top: 50px;
  width: 50px;
  height: calc(~'100% - 50px');
  min-height: 100%;
  overflow-y: scroll;
  z-index: 9;
  background-color: @adminhover;
  transition: width .05s ease;
  border-top:1px solid @adminhover;
  .listBtn {
    height: 30px;
    width: 100%;
    .center;
    color: @adminLightFont;
    line-height: 30px;
    .pointer;
    background-color: @adminbgLight;
    border-bottom: 1px solid @adminhover;
  }
  .listBtn:hover{
    color: @white;
  }
  .menu {
    width: 100%;
    .item {
      height: 40px;
      width: 100%;
      background-color: @adminhover;
      display: block !important;
      margin-left:0 !important;
      border: none !important;
      border-radius: 0 !important;
      color: @white !important;
      padding:0 !important;
      .a {
        height: 100%;
        width: 100%;
        line-height: 40px !important;
        .inline-block;
        color: #fff !important;
        .center;
        text-indent: 0;
        font-size: 12px;
        font-family:@fontPFLight;
        letter-spacing: 1px;

        i{
          color: @adminLightFont;
        }
        span{
          padding-left: 10px;
        }
      }

    }
    .item:hover{
      background-color: @adminbgLight;
      .a{
        i{
          color: @white;
        }
        span{
          color: @white;
        }
      }
    }
    .item.active{
      background-color:@adminaqua !important ;
      a{
        i{
          color: @white;
        }
      }
    }
  }
}
.left.active{
  width: 180px !important;
  .menu{
    .item{
      .a{
        text-align: left;
        text-indent: 30px;
      }
    }
    .item:hover{
      color: @white;
    }
  }
}
</style>
