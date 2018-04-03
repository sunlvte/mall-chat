<template>
  <router-view/>
</template>


<script>
export default {
  name: 'App'
};
</script>

<style lang="less">
  @import './assets/css/common/public.less';
  @import './assets/vaq/less/base.less';
  .main {
    .relative;
    top: @topBarHeight;
    box-sizing: border-box;
    padding: 15px;
    background-color: @adminContentBg;
    min-height: calc(~'100% + 50px');
    font-family:"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei";
  }
</style>
