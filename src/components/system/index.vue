<template>
  <div class="layout_out">
    <Layout />
    <div class="main" :class="getListActive?'big': 'small'">
      <div class="system_content">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="系统号池管理" name="first" class="system_code">
            <el-col :span="5"  class="top">
              <el-input
                placeholder="搜索号码"
                v-model="input1"
                clearable
                v-on:blur="codeSearch"
                @keyup.enter.native="codeSearch"
                size="medium"
                max="300"
                class="ipt"
              >
              </el-input>
            </el-col>
            <el-button type="primary" plain class="add" @click="changeSystemCodeFormVisible">新增号池</el-button>
            <upload-contact text="上传号池" @contact-upload-success="uploadContact" />
            <AddSystemCode  @reload="getSystemCodeList" />
            <syetemCodeTable :codeTableData="codeTableData" @reload="getSystemCodeList"/>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="codeListCount"
                @current-change="handleCodeCurrentChange"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="系统参数配置" name="second" class="system_config">
            <el-col :span="5"  class="top">
              <el-input
                placeholder="搜索参数名"
                v-model="input2"
                clearable
                v-on:blur="configSearch"
                @keyup.enter.native="configSearch"
                size="medium"
                max="300"
                class="ipt"
              >
              </el-input>
            </el-col>
            <el-col :span="5"  class="top2">
              <el-input
                placeholder="搜索参数说明"
                v-model="input3"
                clearable
                v-on:blur="configSearch"
                @keyup.enter.native="configSearch"
                size="medium"
                max="300"
                class="ipt"
              >
              </el-input>
            </el-col>
            <el-button type="primary" plain class="add" @click="changeSystemConfigFormVisible">新增参数</el-button>
            <el-button type="primary" plain class="Overloading" @click="Overloading">重载到内存</el-button>
            <AddSystemConfig  @reload="getSystemConfigList" />
            <SystemConfigTable :configTableData="configTableData" @reload="getSystemConfigList"/>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="configListCount"
                @current-change="handleConfigCurrentChange"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script >
'use strict';
import Layout from '../widget/layout';
import store from '@/store/';
import AddSystemCode from './add_system_code';
import SyetemCodeTable from './system_code_table';
import AddSystemConfig from './add_system_config';
import SystemConfigTable from './system_config_table';
import UploadContact from '../widget/upload-contact';
import { mapMutations, mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  data () {
    return {
      activeName: 'first',
      input1: '',
      input2: '',
      input3: '',
      codeListCount: 0,
      codeTableData: [],
      codePageNum: 1,
      configListCount: 0,
      configTableData: [],
      configPageNum: 1
    };
  },
  methods: {
    ...mapMutations('system', ['changeSystemCodeFormVisible', 'changeSystemConfigFormVisible']),
    handleCodeCurrentChange (val) {
      this.codePageNum = val;
      this.getSystemCodeList();
    },
    handleConfigCurrentChange (val) {
      this.configPageNum = val;
      this.getSystemConfigList();
    },
    getSystemCodeList (tel) {
      ubase.request({
        url: url.getPhonePool,
        data: {
          page: this.codePageNum || 1,
          mainPhone: tel || ''
        }
      }, (data) => {
        this.codeListCount = data.count || 0;
        this.codeTableData = data.result || [];
        this.codeTableData.forEach(item => {
          if (item.state === '已用') {
            item.status = 'danger';
          } else if (item.state === '预留') {
            item.status = 'warning';
          } else if (item.state === '未用') {
            item.status = 'success';
          }
        });
      });
    },
    getSystemConfigList (name, memo) {
      ubase.request({
        url: url.getConfig,
        data: {
          page: this.configPageNum || 1,
          name: name,
          memo: memo
        }
      }, (data) => {
        this.configListCount = data.count || 0;
        this.configTableData = data.result || [];
        this.configTableData.forEach(item => {
          item.status = (+item.state === 1) ? '启用' : '禁用';
        });
      });
    },
    uploadContact () {
      // 上传成功后直接刷新页面
      this.getSystemCodeList();
    },
    codeSearch () { // 号池搜索
      this.getSystemCodeList(this.input1.trim());
    },
    configSearch () { // 参数配置搜索
      this.getSystemConfigList(this.input2.trim(), this.input3.trim());
    },
    Overloading () {
      ubase.request({
        url: url.overLoad,
        data: {}
      }, (data) => {
        this.$notify({
          title: '成功',
          message: '重载到内存成功',
          type: 'success'
        });
      }, (e) => {
        this.$notify.error({
          title: '错误',
          message: '重载到内存失败'
        });
      });
    }
  },
  created () {
    this.getSystemCodeList();
    this.getSystemConfigList();
  },
  components: {
    Layout,
    AddSystemCode,
    SyetemCodeTable,
    UploadContact,
    SystemConfigTable,
    AddSystemConfig
  },
  computed: {
    ...mapState({
      getListActive: () => store.state.root.listActiveState
    })
  },

  store
};

</script>

<style  scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
 .main_slider();
  .system_content{
    background-color: @white;
    padding: 15px;
    min-height: 500px;
    .system_code{
      padding:30px 20px;
      .top{
         margin-left: 100px;
      }
      .add{
        position: absolute;
        right: 100px;
        top: 30px;
      }
      .upload{
        position: absolute;
        right: 230px;
        top: 30px;
      }
      .table{
        transform: translateY(20px);
      }
      .block{
        float: right;
        margin-top: 40px;
      }

    }
    .system_config{
      padding:30px 20px;
      .top{
        margin-left: 100px;
      }
      .top2{
        margin-left: 40px;
      }
      .add{
        position: absolute;
        right: 100px;
        top: 30px;
      }
      .Overloading{
        position: absolute;
        right: 230px;
        top: 30px;
      }
      .table{
        transform: translateY(20px);
      }
      .block{
        float: right;
        margin-top: 40px;
      }

    }
  }
</style>
