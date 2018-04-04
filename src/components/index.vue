<template>
  <div class="container" >
    <h1>customer</h1>
    <ul class="ul">
      <li class="left">aaaaaaaaaa</li>
      <li v-for="item in arr" :class="item.type">{{item.msg}}</li>
    </ul>
    <!--<router-link to="service">Home</router-link>-->
    <div>
      <input type="text" class="form-control" @keyup.13="send($event)" v-model="iptContent">
    </div>
  </div>
</template>show

<script>
'use strict';

  const socket = io('/a', {
    path: '/chat',
    query: {
      token: 'alJO2V99Bw',
    },
    reconnection: true, // 重连
    reconnectionAttempts: 20, // 尝试重连次数
  });


export default {
  name: 'Index',

  data () {
    return {
      arr: [],
      data: {},
      iptContent:''
    };
  },
  mounted () {
    socket.on('error', (a, b, c) => {
      console.log(a, b, c);
    });
    socket.on('destory', data => {
      console.log('destory');
      socket.destroy();
    });
    socket.on('service message', (data) => {
      this.arr.push({msg:data.msg,type:'left'});
    });
  },
  methods: {
    send () {
      this.data.msg = this.iptContent;
      this.iptContent = '';
      socket.emit('user message', this.data, (result) => {
        console.log(result);
        result.code === 0 && this.arr.push({msg:this.data.msg,type:'right'});
      });
    }
  },
  components: {

  }
};
</script>

<style scoped lang="less">
  /*@import (reference) '../assets/css/common/variable.less';
  @import (reference) '../assets/css/common/public.less';*/
  ul li {
    list-style-type: none;
  }
  .left {
    text-align: left;
  }
  .right{
    text-align: right;
  }
</style>
