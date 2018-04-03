<template>
  <el-table
    class="table"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="每分机加价（元） ： ">
            <span>{{ props.row.extPer }}</span>
          </el-form-item>
          <el-form-item label="每会议室加价（元） ： ">
            <span>{{ props.row.roomPer }}</span>
          </el-form-item>
          <el-form-item label="每G存储空间加价（元） ： ">
            <span>{{ props.row.spacePerg }}</span>
          </el-form-item>
          <el-form-item label="短信加价（元/条） ： ">
            <span>{{ props.row.smsPer }}</span>
          </el-form-item>
          <el-form-item label="超时长单价（元/分钟） ： ">
            <span>{{ props.row.pricePernim }}</span>
          </el-form-item>
          <el-form-item label="生效开始时间 ：">
            <span  v-text='formatDate(null, null, props.row.validityBegin)'></span>
          </el-form-item>
          <el-form-item label="生效结束时间 ： " >
            <span >{{ formatDate(null, null, props.row.validityEnd) }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="comboName"
      label="套餐名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="ext"
      label="坐席数（个）">
    </el-table-column>
    <el-table-column
      prop="room"
      label="会议室（个）">
    </el-table-column>
    <el-table-column
      prop="storageSpace"
      label="留存空间（G）">
    </el-table-column>
    <el-table-column
      prop="comboDuration"
      label="时长（分钟）">
    </el-table-column>
    <el-table-column
      prop="smsNum"
      label="短信条数（条）">
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
        <el-button type="text" size="medium" @click="eidtCombo(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script type="text/ecmascript-6">
'use strict';
import { mapMutations } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');
const base = require('@/assets/vaq/base');
export default {
  props: ['tableData'],
  methods: {
    ...mapMutations('combo', ['eidtCombo']),
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
