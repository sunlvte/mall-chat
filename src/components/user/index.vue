<template>
  <div class="layout_out">
    <Layout />
    <div class="main" :class="getListActive?'big': 'small'">
      <div class="user_content">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="系统用户管理" name="first" class="winUser">
            <el-col :span="5"  class="top">
              <el-input
                placeholder=""
                v-model="input10"
                clearable
                size="medium"
                max="300"
                class="ipt"
                disabled
              >
              </el-input>
            </el-col>
            <el-button type="primary" plain class="add" @click="changeWinUserFormVisible">新增系统用户</el-button>
            <AddUser  @reload="getWinUserList" />
            <WinUserTable :tableData="tableData" @reload="getWinUserList"/>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="winListCount"
                @current-change="handleCurrentChange"
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
import AddUser from './adduser';
import WinUserTable from './winuser_table';
import { mapMutations, mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  data () {
    return {
      activeName: 'first',
      input10: '',
      winListCount: 0,
      tableData: []
    };
  },
  methods: {
    ...mapMutations('user', ['changeWinUserFormVisible']),
    handleCurrentChange (val) {
      this.getWinUserList(val);
    },
    getWinUserList (val) {
      ubase.request({
        url: url.getUserByPage,
        data: {
          page: val || 1
        }
      }, (data) => {
        this.winListCount = data.count || 0;
        this.tableData = data.result || [];
        this.tableData.forEach(item => {
          item.status = (+item.state === 1) ? '启用' : '禁用';
        });
      });
    }
  },
  created () {
    this.getWinUserList();
  },
  components: {
    Layout,
    AddUser,
    WinUserTable
  },
  computed: {
    ...mapState({
      getListActive: () => store.state.root.listActiveState,
      winUserFormVisible: () => store.state.user.winUserFormVisible
    })
  },

  store
};

</script>

<style  scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
 .main_slider();
  .user_content{
    background-color: @white;
    padding: 15px;
    min-height: 500px;
    .winUser{
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
  }
</style>
