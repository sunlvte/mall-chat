<template>
  <el-dialog :title="title" :visible.sync="modalShow" center close-on-click-modal :before-close="messageHid" width="80%">
    <el-table
      class="table"
      :data="state.list"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"  class="demo-table-expand">
            <el-form-item label="开始时间 ： ">
              <span>{{ props.row.add_time_show }}</span>
            </el-form-item>
            <el-form-item label="结束时间 ： ">
              <span>{{ props.row.end_time_show }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="combo_name"
        label="套餐名称"
      >
      </el-table-column>
      <el-table-column
        prop="room"
        label="会议室（个）">
      </el-table-column>
      <el-table-column
      prop="storage_space"
      label="留存空间（G）">
      </el-table-column>
      <el-table-column
        prop="act_duration"
        label="时长（分钟）">
      </el-table-column>
      <el-table-column
        prop="act_sms"
        label="短信条数（条）">
      </el-table-column>
      <el-table-column
        prop="month_price"
        label="号码月费">
      </el-table-column>
      <el-table-column
        prop="total"
        label="套餐总价">
      </el-table-column>
      <el-table-column
        prop="pay_total"
        label="实际支付">
      </el-table-column>
      <el-table-column
        prop="inv_status"
        label="发票状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.typeColor"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain  @click="messageHid" class="btn">确 &nbsp;&nbsp;定</el-button>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
'use strict';
import { mapState, mapMutations } from 'vuex';
import store from '@/store/';
export default {
  data () {
    return {

    };
  },
  methods: {
    ...mapMutations('message/msgOrder', ['messageHid']),
    cancelReload () {

    }
  },
  computed: {
    ...mapState({
      state: () => store.state.message.msgOrder,
      title: () => store.state.message.msgOrder.title,
      modalShow: () => store.state.message.msgOrder.modalShow
    })
  }

};
</script>

<style lang="less" scoped>

.btn{
  display: block;
  margin: 40px auto 10px;
}
</style>
