<template>
  <el-table
    class="table"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="登录手机号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="qq"
      label="qq号">
    </el-table-column>
    <el-table-column
      prop="wechat"
      label="微信号">
    </el-table-column>
    <el-table-column
      prop="telNo"
      label="座机号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="100"
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
        <el-button @click="comboHandleClick(scope.row)"
                   type="text" size="medium"
        >
          {{(+scope.row.state == 1)?'禁用': '启用'}}
        </el-button>
        <el-button type="text" size="medium" @click="eidtWinUser(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script type="text/ecmascript-6">
'use strict';
import { mapMutations } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  props: ['tableData'],
  methods: {
    ...mapMutations('user', ['eidtWinUser']),
    comboHandleClick (tab) {
      ubase.request({
        url: url.editUser,
        data: {
          id: tab.id || '',
          state: (+tab.state === 1) ? 0 : 1
        }
      }, (data) => {
        this.$emit('reload');
      });
    }
  }
};

</script>

<style lang="less" scoped>

</style>
