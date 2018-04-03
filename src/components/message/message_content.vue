<template>
  <el-dialog :title="title" :visible.sync="modalShow" center close-on-click-modal :before-close="messageHid" width="80%">
    <CompanyMessage :baseForm="state.form" startInit="1"></CompanyMessage>
    <el-form :inline="true" :model="state.formEnd" class="demo-form-inline" label-width="120px">
      <el-form-item label="企业余额">
        <el-input v-model="state.formEnd.money" placeholder="企业余额" disabled></el-input>
      </el-form-item>
      <el-form-item label="viop费率">
        <el-input v-model="state.formEnd.voipRate" placeholder="viop费率"></el-input>
      </el-form-item>
      <el-form-item label="会议费率">
        <el-input v-model="state.formEnd.zTPstnRate" placeholder="会议费率"></el-input>
      </el-form-item>
      <el-form-item label="剩余时长">
        <el-input v-model="state.formEnd.actDuration" placeholder="剩余时长" disabled></el-input>
      </el-form-item>
      <el-form-item label="app2pstn费率">
        <el-input v-model="state.formEnd.pstnTAppRate" placeholder="app2pstn费率"></el-input>
      </el-form-item>
      <el-form-item label="录音费率">
        <el-input v-model="state.formEnd.lyRate" placeholder="录音费率"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain class="agree" @click="agree" >保 &nbsp;&nbsp;存</el-button>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
'use strict';
import { mapState, mapMutations, mapActions } from 'vuex';
import store from '@/store/';
import CompanyMessage from '../widget/company_mesage';
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
  methods: {
    ...mapMutations('message/msgDetail', ['messageHid']),
    ...mapActions('message/msgDetail', ['agree']),
    cancelReload () {

    }
  },
  computed: {
    ...mapState({
      state: () => store.state.message.msgDetail,
      title: () => store.state.message.msgDetail.title,
      modalShow: () => store.state.message.msgDetail.modalShow
    })
  }

};
</script>

<style lang="less" scoped>

  .agree{
    margin: 30px auto;
    display: block;
  }
</style>
