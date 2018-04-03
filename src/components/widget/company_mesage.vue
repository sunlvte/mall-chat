<template>
  <div>
    <el-form ref="form" :inline="true" :model="baseFormWidget" label-width="120px" >
      <el-form-item label="企业名称">
        <el-input v-model="baseFormWidget.ent_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="企业类型">
        <el-input v-model="baseFormWidget.ent_type" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="baseFormWidget.tel_no" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="baseFormWidget.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="baseFormWidget.prov_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="baseFormWidget.cname" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮编">
        <el-input v-model="baseFormWidget.postcoce" disabled></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="baseFormWidget.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="baseFormWidget.linkman" disabled></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="baseFormWidget.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="总机号">
        <el-input v-model="baseFormWidget.switch_board" disabled></el-input>
      </el-form-item>
      <el-form-item label="人工分机">
        <el-input v-model="baseFormWidget.ext" disabled></el-input>
      </el-form-item>
      <el-form-item label="法人">
        <el-input v-model="baseFormWidget.corporate" disabled></el-input>
      </el-form-item>
      <el-form-item label="开票地址">
        <el-input v-model="baseFormWidget.invoiceAddress" disabled :minlength="300"></el-input>
      </el-form-item>
      <el-form-item label="开票电话">
        <el-input v-model="baseFormWidget.telNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="baseFormWidget.bankOf" disabled></el-input>
      </el-form-item>
      <el-form-item label="银行账号">
        <el-input v-model="baseFormWidget.bankAccount" disabled></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号">
        <el-input v-model="baseFormWidget.taxCoce" disabled></el-input>
      </el-form-item>

    </el-form>
    <el-form ref="form"  :model="baseFormWidget" label-width="120px"  class="imgBox">
      <el-form-item label="身份证">
        <upload-image name="cropPic" desc="身份证正面" :imgsrc="baseFormWidget.cropPic" class="pointer" :disabled="true" />
        <upload-image name="cropPicn" className="back" desc="身份证反面"
                      class="pointer"
                      :imgsrc="baseFormWidget.cropPicn"
                      :disabled="true"
        />
      </el-form-item>
      <el-form-item label="营业执照" class="">
        <upload-image name="businessLicencepic"
                      :imgsrc="baseFormWidget.businessLicencepic"
                      className="squar"
                      class="pointer"
                      :disabled="true"
        />
      </el-form-item>
      <el-form-item label="备注信息" size="small">
        <el-input type="textarea" :rows="6"
                  class="iptTextarea"
                  v-model="baseFormWidget.system_memo" disabled
        >
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
'use strict';
import store from '@/store';
import UploadImage from './upload-image';
import { mapState } from 'vuex';
const ubase = require('@/util/base');
const url = require('@/util/url');
export default {
  props: ['baseForm', 'startInit'],
  data () {
    return {
      baseFormWidget: {}
    };
  },
  created () {

  },
  mounted () {
    +this.startInit && this.init();
  },
  components: {
    UploadImage
  },
  methods: {
    async init () {
      let data = {};
      await ubase.request({url: url.getEntApDetail, data: { entId: this.baseForm.ent_id }}, res => (data = res));
      this.baseFormWidget = Object.assign(this.baseForm, data.result);
    }
  },
  watch: {
    baseForm () {
      this.baseFormWidget = {};
      this.baseForm.ent_id && this.init();
    }
  },
  destroyed () {
    this.baseFormWidget = {};
  },
  computed: mapState({
    state: () => store.state.message
  })
};
</script>

<style scoped lang="less">
@import (reference) '../../assets/css/common/public.less';
.iptTextarea{
  display: block;
  width: 490px;
}
.imgBox{
  .pointer.plus{
      vertical-align: top !important;
  }
}
</style>
