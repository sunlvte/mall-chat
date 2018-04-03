<template>
  <el-table
    class="table"
    :data="codeTableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="main_phone"
      label="号码"
    >
    </el-table-column>
    <el-table-column
      prop="monthprice"
      label="月租"
    >
    </el-table-column>
    <el-table-column
      prop="ent_name"
      label="使用企业">
    </el-table-column>
    <el-table-column  prop="add_time" :formatter="formatDate" label="添加时间" />
    <el-table-column
      prop="state"
      label="状态"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status"
          align="center"
          close-transition>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="160">
      <template slot-scope="scope">
        <el-button type="text" size="medium" @click="editSystemCode(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script type="text/ecmascript-6">
'use strict';
import { mapMutations } from 'vuex';
const base = require('@/assets/vaq/base');
export default {
  props: ['codeTableData'],
  methods: {
    ...mapMutations('system', ['editSystemCode']),
    formatDate (row, column, timestamp) {
      if (!timestamp) {
        return;
      }
      return base.formatDate(timestamp, 'yyyy-mm-dd');
    }
  }
};

</script>

<style lang="less" scoped>

</style>
