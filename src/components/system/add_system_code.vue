<template>
  <el-dialog :title="title" :visible.sync="state.systemCodeFormVisible" center close-on-click-modal :before-close="cancelReload">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="主号码"
                    :label-width="formLabelWidth"
                    prop="main_phone"
      >
        <el-input v-model="form.main_phone" auto-complete="off" class="winFormIpt"  :disabled="editStatus"></el-input>
      </el-form-item>
      <el-form-item label="月费" :label-width="formLabelWidth"
                    prop="monthprice"
      >
        <el-input v-model="form.monthprice" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth"
                    v-if="editStatus"
      >
        <el-input v-model="form.state" auto-complete="off" class="winFormIpt" :disabled="editStatus"></el-input>
      </el-form-item>
      <el-form-item label="使用企业" :label-width="formLabelWidth"
                    v-if="editStatus"
      >
        <el-input v-model="form.ent_name" auto-complete="off" class="winFormIpt" :disabled="editStatus"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeSystemCodeFormVisibleFalse">取 消</el-button>
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
    const validateTrim = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback(new Error('不能使用空字符'));
      }
      callback();
    };
    return {
      formLabelWidth: '80px',
      rules: {
        main_phone: [
          {required: true, message: '主号码不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        monthprice: [
          {required: true, message: '月费不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations('system', ['changeSystemCodeFormVisibleFalse']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.SystemCodeAdd();
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
    SystemCodeAdd () {
      ubase.request({
        url: (this.title === '编辑号池') ? url.editSystemCode : url.addSystemCode,
        data: this.form
      }, (data) => {
        this.changeSystemCodeFormVisibleFalse();
        this.$emit('reload');
      });
    }
  },
  computed: {
    ...mapState({
      state: () => store.state.system,
      form: () => store.state.system.codeForm,
      title: () => store.state.system.codeTitle
    }),
    editStatus () {
      return Boolean((this.title !== '新增号池') ? 1 : 0);
    }
  }
};

</script>

<style lang="less" scoped>
  .winFormIpt{
    width: 80%;
  }
</style>
