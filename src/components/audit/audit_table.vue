<template>
  <el-table
    class="table"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="所在城市 ： ">
            <span>{{ props.row.prov_name }}</span>
          </el-form-item>
          <el-form-item label="地址 ： ">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="邮箱： ">
            <span>{{ props.row.email }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="ent_name"
      label="企业名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="ent_type"
      label="企业类型">
    </el-table-column>
    <el-table-column
      prop="linkman"
      label="联系人">
    </el-table-column>
    <el-table-column
      prop="switch_board"
      label="总机号">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="100"
    >
      <template slot-scope="scope">
        <el-tag
          type="danger"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="160">
      <template slot-scope="scope">
        <el-button type="text" size="medium" @click="eidtAudit(scope.row)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script type="text/ecmascript-6">
'use strict';
const ubase = require('@/util/base');
const url = require('@/util/url');
const base = require('@/assets/vaq/base');
export default {
  props: ['tableData'],
  methods: {
    comboHandleClick (tab) {
      ubase.request({
        url: url.editCombo,
        data: {
          id: tab.id || '',
          state: (+tab.state === 1) ? 0 : 1
        }
      }, (data) => {
        this.$emit('reload');
      });
    },
    eidtAudit (obj) {
      this.$emit('auditChange', obj);
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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
