<template>
  <div class="ui huge red header page-404">页面不存在！</div>
</template>

<script>
'use strict';

export default {
  name: 'PageNotFound'
};
</script>

<style scoped lang="less">
@import (reference) '../assets/css/common/public.less';

.page-404 {
  .center;
  padding-top: 5em;
}
</style>
