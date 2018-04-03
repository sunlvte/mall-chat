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
            <el-form-item label="邮件地址： ">
              <span>{{ props.row.post_address }}</span>
            </el-form-item>
            <el-form-item label="申请时间： ">
              <span>{{ props.row.apply_time }}</span>
            </el-form-item>
            <el-form-item label="开票时间： ">
              <span>{{ props.row.invoice_date }}</span>
            </el-form-item>
            <el-form-item label="邮寄时间： ">
              <span>{{ props.row.post_date }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="ent_name"
        label="企业名称"
      >
      </el-table-column>
      <el-table-column
        prop="invoice_type"
        label="发票类型">
      </el-table-column>
      <el-table-column
      prop="content"
      label="发票内容">
      </el-table-column>
      <el-table-column
        prop="invoice_address"
        label="开票地址">
      </el-table-column>
      <el-table-column
        prop="tax_code"
        label="纳税人识别号">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.typeColor"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        >
        <template slot-scope="scope">
          <el-button type="text" v-if="+scope.row.state ===2" size="medium" @click="mail(scope.row)">邮寄</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" plain  @click="messageHid" class="btn">确 &nbsp;&nbsp;定</el-button>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
'use strict';
import {mapState, mapMutations, mapActions} from 'vuex';
import store from '@/store/';
export default {
  data () {
    return {

    };
  },
  methods: {
    ...mapMutations('message/msgInvoice', ['messageHid']),
    ...mapActions('message/msgInvoice', ['mail']),
    cancelReload () {

    }
  },
  computed: {
    ...mapState({
      state: () => store.state.message.msgInvoice,
      title: () => store.state.message.msgInvoice.title,
      modalShow: () => store.state.message.msgInvoice.modalShow
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
