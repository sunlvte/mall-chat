<template>
  <el-dialog :title="title" :visible.sync="state.winUserFormVisible" center close-on-click-modal :before-close="cancelReload">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="姓名"
                    :label-width="formLabelWidth"
                    prop="username"
      >
        <el-input v-model="form.username" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth"
                    prop="mobile"
      >
        <el-input v-model="form.mobile" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="QQ号" :label-width="formLabelWidth">
        <el-input v-model="form.qq" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.wechat" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="座机号" :label-width="formLabelWidth">
        <el-input v-model="form.telNo" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeWinUserFormVisibleFalse">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
'use strict';
import store from '@/store';
import { mapMutations, mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');

export default {
  data () {
    const validateMobile = (rule, value, callback) => {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      callback();
    };
    return {
      formLabelWidth: '80px',
      rules: {
        username: [
          {required: true, message: '姓名不能为空'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空'},
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations('user', ['changeWinUserFormVisibleFalse']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.winUserAdd();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancelReload (done) {
      this.$emit('reload');
      done();
    },
    winUserAdd () {
      ubase.request({
        url: (this.title === '编辑系统用户') ? url.editUser : url.addUser,
        data: this.form
      }, (data) => {
        this.changeWinUserFormVisibleFalse();
        this.$emit('reload');
      });
    }
  },
  computed: mapState({
    state: () => store.state.user,
    form: () => store.state.user.form,
    title: () => store.state.user.title
  })
};

</script>

<style lang="less" scoped>
  .winFormIpt{
    width: 80%;
  }
</style>
