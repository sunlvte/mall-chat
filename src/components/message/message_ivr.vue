<template>
  <el-dialog :title="title" :visible.sync="modalShow" center close-on-click-modal :before-close="messageHid" width="60%">
    <div>hello</div>
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
    ...mapMutations('message/msgIvr', ['messageHid']),
    cancelReload () {

    }
  },
  computed: {
    ...mapState({
      state: () => store.state.message.msgIvr,
      title: () => store.state.message.msgIvr.title,
      modalShow: () => store.state.message.msgIvr.modalShow
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
