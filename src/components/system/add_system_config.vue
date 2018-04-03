<template>
  <el-dialog :title="title" :visible.sync="state.systemConfigFormVisible"
             center close-on-click-modal :before-close="cancelReload"
             :modal-append-to-body="false"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="参数名"
                    :label-width="formLabelWidth"
                    prop="name"
      >
        <el-input v-model="form.name" auto-complete="off" class="winFormIpt"  ></el-input>
      </el-form-item>
      <el-form-item label="参数值" :label-width="formLabelWidth"
                    prop="value"
      >
        <el-input v-model="form.value" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="参数说明" :label-width="formLabelWidth"
                    prop="memo"
      >
        <el-input
          type="textarea"
          autosize
          placeholder="请输入参数说明"
          class="winFormIpt"
          v-model="form.memo">
        </el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeSystemConfigFormVisibleFalse">取 消</el-button>
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
    return {
      formLabelWidth: '80px',
      rules: {
        name: [
          {required: true, message: '参数名不能为空'}
        ],
        value: [
          {required: true, message: '参数值不能为空'}
        ]
      }
    };
  },
  methods: {
    ...mapMutations('system', ['changeSystemConfigFormVisibleFalse']),
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
        url: (this.title === '编辑参数') ? url.editConfig : url.addConfig,
        data: this.form
      }, (data) => {
        this.changeSystemConfigFormVisibleFalse();
        this.$emit('reload');
      });
    }
  },
  computed: {
    ...mapState({
      state: () => store.state.system,
      form: () => store.state.system.configForm,
      title: () => store.state.system.configTitle
    })
  }
};

</script>

<style lang="less" scoped>
  .winFormIpt{
    width: 80%;
  }
</style>
