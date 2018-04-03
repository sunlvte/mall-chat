<template>
  <div >
    <Top></Top>
    <Left></Left>
  </div>
</template>

<script>
'use strict';

import Top from './top';
import Left from './left';

export default {
  name: 'Layout',
  components: {
    Top, Left
  }
};
</script>

<style scoped lang="less">
@import (reference) '../../assets/css/common/public.less';
</style>
