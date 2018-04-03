<template>
  <div class="layout_out">
    <Layout />
    <div class="main" :class="getListActive?'big': 'small'">
      <div class="audit_content">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="企业信息审核" name="first" class="audit_list" >
            <div v-show="auditStatus">
              <el-col :span="5"  class="top">
                <el-input
                  placeholder="搜索企业"
                  v-model="input10"
                  clearable
                  size="medium"
                  max="300"
                  class="ipt"
                  disabled
                >
                </el-input>
              </el-col>
              <AuditTable :tableData="tableData" @auditChange="auditChange"/>
              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  :total="auditListCount"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
              </div>
            </div>
            <div v-show="!+auditStatus" class="audit_c">
              <AuditContent :form="contentForm" @reload="backToTable"></AuditContent>
            </div>
            <div class="return" v-show="!+auditStatus" @click="backToList">
              <el-button plain type="primary"><i class="el-icon-sort"></i> 返回审核列表</el-button>
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
import AuditTable from './audit_table';
import AuditContent from './audit_content';
import { mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');

export default {
  data () {
    return {
      activeName: 'first',
      input10: '',
      auditListCount: 0,
      tableData: [],
      auditStatus: 1,
      contentForm: {}
    };
  },
  methods: {
    handleCurrentChange (val) {
      this.getAuditTableList(val);
    },
    auditChange (obj) {
      this.auditStatus = 0;
      this.contentForm = obj;
    },
    getAuditTableList (val) {
      ubase.request({
        url: url.getAuditTable,
        data: {
          page: val || 1,
          state: 1
        }
      }, (data) => {
        this.auditListCount = data.count || 0;
        this.tableData = data.result || [];
        // state 0:未审核 1：已提交 2：审核通过 3：已支付
        this.tableData.forEach(item => {
          item.status = (+item.state === 1) ? '未审核' : '已审核';
        });
      });
    },
    backToList () {
      this.auditStatus = 1;
    },
    backToTable () {
      this.auditStatus = 1;
      this.getAuditTableList();
    }
  },
  created () {
    this.getAuditTableList();
  },
  components: {
    Layout,
    AuditTable,
    AuditContent
  },
  computed: {
    ...mapState('root', {
      getListActive: () => store.state.root.listActiveState
    })
  },

  store
};

</script>

<style  scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
 .main_slider();
  .audit_content{
    background-color: @white;
    padding: 15px;
    min-height: 500px;
    position: relative;
    .audit_list{
      width: 100%;
      padding:30px 20px;
      .top{
         margin-left: 100px;
      }
      .add{
        position: absolute;
        right: 100px;
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
    .audit_c{
      width: 800px;
      margin: 0 auto;

    }
    .return{
      display: block;
      position: absolute;
      top: 5px;
      left: 20px;
      .pointer;
    }
    .return:hover{
      color: @adminaqua;
    }
  }
</style>
