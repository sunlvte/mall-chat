<template>
  <div :class="(className || '') + ' plus'" >
    <div class="img" v-if="imagesrc">
      <img :src="imagesrc" class="samllImg">
      <img :src="imagesrc" class="bigImg">
      <input type="hidden" :value="imagesrc" :name="name">
      <div class="mask" v-if="!disabled" @click="click"><span>重新上传</span></div>
    </div>
    <div class="empty" v-if="!imagesrc" @click="click">
      <font>+</font>
    </div>
    <p class="desc" v-if="desc" v-text="desc"></p>
  </div>
</template>

<script>
'use strict';
const ubase = require('../../util/base');
const $ = window.$;
export default {
  name: 'UploadImage',
  props: {
    className: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    imgsrc: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
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
      } catch (e) {
        console.error(e);
        return ubase.tip('浏览器不支持上传图片', false);
      }

      this.upload(file);
    });
  },
  watch: {
    imgsrc (value) {
      this.$data.imagesrc = value;
    }
  },
  methods: {
    click () {
      this.$data.input.trigger('click');
    },
    upload (fileData) {
      const formData = new FormData();

      formData.append('file_data', fileData, fileData.name || 'file.png');

      ubase.request({
        url: '/api/uploadImage',
        data: {
          file: formData,
          isUpload: true
        },
        contentType: false,
        processData: false,
        cache: false
      }, data => {
        data = data || {};
        this.$data.imagesrc = data.url;
      });
    }
  }
};
</script>

<style scoped lang="less">
@import (reference) '../../assets/css/common/public.less';

.plus {
  //overflow: hidden;
  border: 1px solid #efefef;
  .relative;
  font-size: 12*5px;
  .user-select(none);
  width: 150px;
  height: 150px;
  background-color: @grayBgColor;
  .inline-block;
  text-align: center;
  .img {
    .inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    .samllImg {
      .inline-block;
      width: 100%;
      max-height: 100%;
    }
    .bigImg{
      position: absolute;
      top:0;
      left:105%;
      display: none;
      z-index: 1000;
      max-width: 450px;
      max-height: 450px;
      transition: all .3s ease;
      outline:1px solid @adminLightFont;
      outline-offset:0px;
    }
    &:hover {
      .bigImg{
        display: block;
      }
      .mask {
        .block;
      }
    }
    .mask {
      .none;
      top: 0;
      .absolute;
      .font14;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(0, 0, 0, 0.7);
      span {
        .block;
        color: @white;
        margin-top: 55px;
      }
    }
  }
  .empty {
    font {
      .inline-block;
      padding-top: 55px;
    }
  }
  p.desc {
    .center;
    .font12;
    .absolute;
    color: @gray;
    bottom: -1.5em;
    width: 100%;
  }
}

//营业执照图片特制
.squar.plus{
  height: 180px !important;
  .img{
    .bigImg{
      max-height: 540px !important;
    }
    .mask{
      span{
        margin-top: 75px;
      }
    }
  }
}
</style>
