<template>
  <el-table
    class="table"
    :data="configTableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="参数名"
      width="250"
    >
    </el-table-column>
    <el-table-column
      prop="value"
      label="参数值"
      width="300"
    >
    </el-table-column>
    <el-table-column
      prop="memo"
      label="参数说明">
    </el-table-column>
    <el-table-column  prop="addTime" :formatter="formatDate" label="添加时间" />
    <el-table-column
      prop="state"
      label="状态"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === '禁用' ? 'danger' : 'success'"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="160">
      <template slot-scope="scope">
        <el-button @click="configHandleClick(scope.row)"
                   type="text" size="medium"
        >
          {{(+scope.row.state == 1)?'禁用': '启用'}}
        </el-button>
        <el-button type="text" size="medium" @click="editSystemConfig(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script type="text/ecmascript-6">
'use strict';
import { mapMutations } from 'vuex';
const base = require('@/assets/vaq/base');
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  props: ['configTableData'],
  methods: {
    ...mapMutations('system', ['editSystemConfig']),
    configHandleClick (tab) {
      ubase.request({
        url: url.editConfig,
        data: {
          id: tab.id || '',
          state: (+tab.state === 1) ? 0 : 1
        }
      }, (data) => {
        this.$emit('reload');
      });
    },
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
