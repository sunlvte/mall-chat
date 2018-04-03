<template>
  <div>
    <CompanyMessage :baseForm="baseForm" startInit="0"></CompanyMessage>
    <el-button type="success" plain class="agree" @click="agree" >审核通过</el-button>
    <el-button type="danger" plain class="disagree" @click="disagree">审核拒绝</el-button>
  </div>

</template>

<script type="text/ecmascript-6">
'use strict';

import CompanyMessage from '../widget/company_mesage';
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  props: ['form'],
  data () {
    return {
      baseForm: {}
    };
  },
  components: {
    CompanyMessage
  },
  create () {
  },
  methods: {
    agree () {
      ubase.request({
        url: url.auditAgreee,
        data: {
          entId: this.baseForm.ent_id || ''
        }
      }, (data) => {
        this.$notify({
          message: '审核通过！',
          type: 'success'
        });
        setTimeout(() => {
          this.$emit('reload');
        }, 500);
      }, e => {
        this.$notify({
          message: '服务异常！',
          type: 'error'
        });
      });
    },
    disagree () {
      ubase.request({
        url: url.auditDisagreee,
        data: {
          entId: this.baseForm.ent_id || ''
        }
      }, (data) => {
        this.$notify({
          message: '审核拒绝，退回！',
          type: 'success'
        });
        setTimeout(() => {
          this.$emit('reload');
        }, 500);
      }, e => {
        this.$notify({
          message: '服务异常！',
          type: 'error'
        });
      });
    }
  },
  watch: {
    form (curVal, oldVal) {
      this.baseForm = curVal;
    }
  }

};
</script>

<style lang="less" scoped>

  .agree{
    margin:50px 0 30px 200px;
  }
</style>
