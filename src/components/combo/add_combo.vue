<template>
  <el-dialog :title="title" :visible.sync="state.comboFormVisible" center close-on-click-modal :before-close="cancelReload">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="套餐名称"
                    :label-width="formLabelWidth"
                    prop="comboName"
      >
        <el-input v-model="form.comboName" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="套餐价 （元）" :label-width="formLabelWidth"
                    prop="comboPrice"
      >
        <el-input v-model="form.comboPrice" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="坐席数（个）" :label-width="formLabelWidth" prop="ext">
        <el-input v-model="form.ext" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="会议室 （个）" :label-width="formLabelWidth" prop="room">
        <el-input v-model="form.room" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="留存空间 （G）" :label-width="formLabelWidth" prop="storageSpace">
        <el-input v-model="form.storageSpace" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="时长 （分钟）" :label-width="formLabelWidth" prop="comboDuration">
        <el-input v-model="form.comboDuration" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="短信条数 （条）" :label-width="formLabelWidth" prop="smsNum">
        <el-input v-model="form.smsNum" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="每分机加价（元）" :label-width="formLabelWidth" prop="extPer">
        <el-input v-model="form.extPer" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="每会议室加价（元）" :label-width="formLabelWidth" prop="roomPer">
        <el-input v-model="form.roomPer" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="每G存储空间加价（元）" :label-width="formLabelWidth" prop="spacePerg">
        <el-input v-model="form.spacePerg" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="短信加价（元/条）" :label-width="formLabelWidth" prop="smsPer">
        <el-input v-model="form.smsPer" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="超时长单价（元/分钟）" :label-width="formLabelWidth" prop="pricePernim">
        <el-input v-model="form.pricePernim" auto-complete="off" class="winFormIpt"></el-input>
      </el-form-item>
      <el-form-item label="生效开始时间" :label-width="formLabelWidth" required prop="validityBegin">
        <el-col :span="16">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.validityBegin" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="生效结束时间" :label-width="formLabelWidth" required prop="validityEnd">
        <el-col :span="16">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.validityEnd" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeComboFormVisibleFalse">取 消</el-button>
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
    var validateTrim = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback(new Error('不能使用空字符'));
      }
      callback();
    };
    return {
      formLabelWidth: '180px',
      rules: {
        comboName: [
          {required: true, message: '套餐名称不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        comboPrice: [
          {required: true, message: '手机号不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        ext: [
          {required: true, message: '坐席数不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        room: [
          {required: true, message: '会议室不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        storageSpace: [
          {required: true, message: '留存空间不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        comboDuration: [
          {required: true, message: '时长不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        smsNum: [
          {required: true, message: '短信条数不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        extPer: [
          {required: true, message: '每分机加价不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        roomPer: [
          {required: true, message: '每会议室加价不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        spacePerg: [
          {required: true, message: '每G存储空间加价不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        smsPer: [
          {required: true, message: '短信加价不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        pricePernim: [
          {required: true, message: '超时长单价不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        validityBegin: [
          {required: true, message: '生效开始时间不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ],
        validityEnd: [
          {required: true, message: '生效结束时间不能为空'},
          { validator: validateTrim, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations('combo', ['changeComboFormVisibleFalse']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.comboAdd();
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
    comboAdd () {
      ubase.request({
        url: (this.title === '编辑系统套餐') ? url.editCombo : url.addCombo,
        data: this.form
      }, (data) => {
        this.changeComboFormVisibleFalse();
        this.$emit('reload');
      });
    }
  },
  computed: mapState({
    state: () => store.state.combo,
    form: () => store.state.combo.form,
    title: () => store.state.combo.title
  })
};

</script>

<style lang="less" scoped>
  .winFormIpt{
    width: 80%;
  }
</style>
