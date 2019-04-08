<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

</script>
<style>
*{
  margin: 0;padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
input,textarea{
  border: none;
  outline:none;
  -webkit-tap-highlight-color: transparent;
}
html,body{
  width: 100%;
  height: 100%;
  /* font-family: PingFang SC; */
  font-family:'微软雅黑';
  font-size: 14px;
  -webkit-overflow-scrolling: touch;
  min-width:1366px;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
