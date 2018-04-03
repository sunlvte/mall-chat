<template>
  <div class="layout_out">
    <Layout />
    <div class="main" :class="getListActive?'big': 'small'">
      <div class="combo_content">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="套餐管理" name="first" class="combo_list">
            <el-col :span="5"  class="top">
              <el-input
                placeholder="搜索套餐"
                v-model="input10"
                clearable
                size="medium"
                max="300"
                class="ipt"
                disabled
              >
              </el-input>
            </el-col>
            <el-button type="primary" plain class="add" @click="changeComboFormVisible">新增套餐</el-button>
            <AddCombo  @reload="getComboTableList" />
            <comboTable :tableData="tableData" @reload="getComboTableList"/>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="comboListCount"
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
import AddCombo from './add_combo';
import ComboTable from './combo_table';
import { mapMutations, mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');

export default {
  data () {
    return {
      activeName: 'first',
      input10: '',
      comboListCount: 0,
      tableData: []
    };
  },
  methods: {
    ...mapMutations('combo', ['changeComboFormVisible']),
    handleCurrentChange (val) {
      this.getComboTableList(val);
    },
    getComboTableList (val) {
      ubase.request({
        url: url.getComboByPage,
        data: {
          page: val || 1
        }
      }, (data) => {
        this.comboListCount = data.count || 0;
        this.tableData = data.result || [];
        this.tableData.forEach(item => {
          item.status = (+item.state === 1) ? '启用' : '禁用';
        });
      });
    }
  },
  created () {
    this.getComboTableList();
  },
  components: {
    Layout,
    AddCombo,
    ComboTable
  },
  computed: {
    ...mapState('root', {
      getListActive: () => store.state.root.listActiveState
    }),
    ...mapState('combo', {
      state: () => store.state.combo
    })
  },

  store
};

</script>

<style  scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
 .main_slider();
  .combo_content{
    background-color: @white;
    padding: 15px;
    min-height: 500px;
    .combo_list{
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
  }
</style>
