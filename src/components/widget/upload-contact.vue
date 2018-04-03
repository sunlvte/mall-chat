<template>
  <el-button type="primary" plain class="button primary upload" @click="click">{{text}}</el-button>
</template>

<script>
'use strict';

const ubase = require('../../util/base');
const url = require('@/util/url');

const $ = window.$;
export default {
  name: 'UploadContact',
  props: {
    text: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      imagesrc: '',
      input: $('<input type="file" class="none">')
    };
  },
  created () {
    this.$data.imagesrc = this.$props.imgsrc;

    $('body').append(this.$data.input);

    this.$data.input.on('change', e => {
      let file;

      try {
        file = e.target.files[0];

        this.$data.input.val('');
      } catch (e) {
        console.error(e);
        return ubase.tip('浏览器不支持文件上传', false);
      }

      this.upload(file);
    });
  },
  methods: {
    click () {
      this.$data.input.trigger('click');
    },
    upload (fileData) {
      const formData = new FormData();

      formData.append('file', fileData, fileData.name);

      ubase.request({
        url: url.upload,
        data: {
          file: formData,
          isUpload: true
        },
        contentType: false,
        processData: false,
        cache: false
      }, data => {
        ubase.tip('通讯录导入成功！', true);
        this.$emit('contact-upload-success');
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>
