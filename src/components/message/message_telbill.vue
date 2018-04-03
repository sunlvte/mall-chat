<template>
  <el-dialog :title="title" :visible.sync="modalShow" center close-on-click-modal :before-close="messageHid" width="80%">
    <el-row>
      <el-col  :span="6">
        <el-date-picker
        v-model="searchForm.date"
        type="date"
        value-format="yyyyMMdd"
        placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4" class="ipt_col">
        <el-input
          placeholder="主叫"
          v-model="searchForm.caller"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="4" class="ipt_col">
        <el-input
          placeholder="被叫"
          v-model="searchForm.called"
          clearable>
        </el-input>
      </el-col>
      <el-button type="primary" plain @click="search(searchForm)">搜 &nbsp;&nbsp;索</el-button>
    </el-row>
    <el-table
      class="table"
      :data="state.list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="callId"
        label="呼叫ID"
      >
      </el-table-column>
      <el-table-column
        prop="fromNumber"
        label="主叫">
      </el-table-column>
      <el-table-column
      prop="toNumber"
      label="被叫">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="callTime"
        label="通话时长(秒)">
      </el-table-column>
    </el-table>
    <el-button type="primary" plain  @click="messageHid" class="btn">确 &nbsp;&nbsp;定</el-button>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
'use strict';
import {mapState, mapMutations} from 'vuex';
import store from '@/store/';
export default {
  data () {
    return {
      searchForm: {
        date: '',
        caller: '',
        called: ''
      }
    };
  },
  methods: mapMutations('message/msgTelbill', ['messageHid', 'search']),
  computed: {
    ...mapState({
      state: () => store.state.message.msgTelbill,
      title: () => store.state.message.msgTelbill.title,
      modalShow: () => store.state.message.msgTelbill.modalShow
    })
  }

};
</script>

<style lang="less" scoped>
  .btn{
    display: block;
    margin: 40px auto 10px;
  }
  .ipt_col{
    margin-right: 30px;
  }
</style>
