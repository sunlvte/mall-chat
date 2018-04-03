<template>
  <div class="layout_out">
    <Layout />
    <div class="main" :class="getListActive?'big': 'small'">
      <div class="message_content">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="企业信息列表" name="first" class="message_list" >
            <div >
              <el-col :span="5"  class="top">
                <el-input
                  placeholder="搜索企业"
                  v-model="iptConpamy"
                  clearable
                  max="300"
                  class="ipt"
                  @change="search"
                >
                </el-input>
              </el-col>
              <el-col :span="5"  class="iptcode">
                <el-input
                  placeholder="总机号"
                  v-model="iptCode"
                  clearable
                  max="300"
                  class="ipt"
                  @change="search"
                >
                </el-input>
              </el-col>
              <el-col  :span="10" >
                <el-select v-model="status" placeholder="请选择" @change="search">
                  <el-option value=""  label="全部状态"></el-option>
                  <el-option value="0" label="未审核"></el-option>
                  <el-option value="1" label="已提交"></el-option>
                  <el-option value="2" label="审核通过"></el-option>
                  <el-option value="3" label="已支付"></el-option>
                </el-select>
                <!--<el-radio-group v-model="status"  @change="search">-->
                  <!--<el-radio-button label="">全部状态</el-radio-button>-->
                  <!--<el-radio-button label="0">未审核</el-radio-button>-->
                  <!--<el-radio-button label="1">已提交</el-radio-button>-->
                  <!--<el-radio-button label="2">审核通过</el-radio-button>-->
                  <!--<el-radio-button label="3">已支付</el-radio-button>-->
                <!--</el-radio-group>-->
              </el-col>
              <MessageTable :tableData="tableData" />
              <MessageContent :reload="getMessageTableList"></MessageContent>
              <MessageCombo :reload="getMessageTableList"></MessageCombo>
              <MessageOrder :reload="getMessageTableList"></MessageOrder>
              <MessageInvoice :reload="getMessageTableList"></MessageInvoice>
              <MessageTelBill :reload="getMessageTableList"></MessageTelBill>
              <MessageAdmin :reload="getMessageTableList"></MessageAdmin>
              <MessageIvr :reload="getMessageTableList"></MessageIvr>
              <div class="block">
                <el-pagination
                  layout="prev, pager, next"
                  :total="messageListCount"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script >
'use strict';
import Layout from '../widget/layout';
import store from '@/store/';
import MessageTable from './message_table';
import MessageContent from './message_content';
import MessageCombo from './message_combo.vue';
import MessageOrder from './message_order.vue';
import MessageInvoice from './message_invoice.vue';
import MessageTelBill from './message_telbill';
import MessageAdmin from './message_admin.vue';
import MessageIvr from './message_ivr.vue';
import { mapState, mapActions } from 'vuex';


export default {
  data () {
    return {
      activeName: 'first',
      iptConpamy: '',
      iptCode: '',
      status: ''
    };
  },
  methods: {
    ...mapActions('message', ['getMessageTableList']),
    handleCurrentChange (val) {
      let options = {
        page: val
      };
      this.getMessageTableList(options);
    },
    search () {
      let options = {
        state: this.status,
        switchBoard: this.iptCode,
        entName: this.iptConpamy,
        page: 1
      };
      this.getMessageTableList(options);
    }
  },
  created () {
    this.getMessageTableList();
  },
  components: {
    Layout,
    MessageTable,
    MessageContent,
    MessageCombo,
    MessageOrder,
    MessageInvoice,
    MessageTelBill,
    MessageAdmin,
    MessageIvr
  },
  computed: {
    ...mapState('root', {
      getListActive: () => store.state.root.listActiveState
    }),
    ...mapState('message/msgDetail', {
      state: () => store.state,
      title: () => store.state.title,
      modalShow: () => store.state.modalShow
    }),
    ...mapState('message', {
      messageListCount: () => store.state.message.messageListCount,
      tableData: () => store.state.message.tableData
    })
  },
  store
};

</script>

<style  scoped lang="less">
  @import (reference) '../../assets/css/common/public.less';
 .main_slider();
  .message_content{
    background-color: @white;
    padding: 15px;
    min-height: 500px;
    position: relative;
    .message_list{
      width: 100%;
      padding:30px 20px;
      .top{
         margin-left: 100px;
        margin-right: 30px;
      }
      .iptcode{
        margin-right: 30px;
      }
      .add{
        position: absolute;
        right: 100px;
        top: 30px;
      }
      .table{
        transform: translateY(20px);
      }
      .block{
        float: right;
        margin-top: 40px;
      }
    }
  }
</style>
