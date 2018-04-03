<template>
  <el-dialog :title="title" :visible.sync="modalShow" center close-on-click-modal :before-close="messageHid" width="60%">
    <!--<el-row>-->
      <!--<el-col :span="4" class="ipt_col">-->
        <!--<el-input-->
          <!--placeholder="企业名称"-->
          <!--v-model="name"-->
          <!--clearable>-->
        <!--</el-input>-->
      <!--</el-col>-->
      <!--<el-button type="primary" plain @click="search(name)">搜 &nbsp;&nbsp;索</el-button>-->
    <!--</el-row>-->
    <el-table
      class="table"
      :data="state.list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="登录手机号">
      </el-table-column>
      <el-table-column
      prop="ent_name"
      label="企业名称">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.typeColor"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-dialog
        width="30%"
        title="编辑管理员"
        :visible.sync="innerVisible"
        center
        :show-close="false"
        append-to-body>
        <el-form :model="innerForm" ref="form" :rules="rules">
          <el-form-item label="姓名"
                        :label-width="formLabelWidth"
                        prop="innerName"
          >
            <el-input v-model="innerForm.innerName" auto-complete="off" class="winFormIpt"></el-input>
          </el-form-item>
          <el-form-item label="手机登录号"
                        :label-width="formLabelWidth"
                        prop="mobile"
          >
            <el-input v-model="innerForm.mobile" auto-complete="off" class="winFormIpt"></el-input>
          </el-form-item>
          <el-form-item class="innerBtn">
            <el-button type="primary" @click="nowEdit(innerForm)">确认</el-button>
            <el-button @click="cancelNowEdit">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="medium" @click="disableEdit(scope.row)">{{(+scope.row.state === 0)?'启用':'禁用'}}</el-button>
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
      formLabelWidth: '100px',
      rules: {
        innerName: [
          {required: true, message: '姓名不能为空'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空'}
        ]
      }
    };
  },
  methods: {
    ...mapMutations('message/msgAdmin', ['messageHid', 'search', 'cancelNowEdit', 'edit']),
    ...mapActions('message/msgAdmin', ['nowEdit', 'disableEdit'])
  },
  computed: {
    ...mapState({
      state: () => store.state.message.msgAdmin,
      title: () => store.state.message.msgAdmin.title,
      modalShow: () => store.state.message.msgAdmin.modalShow,
      innerVisible: () => store.state.message.msgAdmin.innerVisible,
      innerForm: () => store.state.message.msgAdmin.innerForm
    })
  }

};
</script>

<style lang="less" scoped>
  .btn{
    display: block;
    margin: 40px auto 10px;
  }
  .ipt_col{
    margin-right: 30px;
  }
  .innerBtn{
    width: 160px;
    margin: 0 auto;
  }
</style>
