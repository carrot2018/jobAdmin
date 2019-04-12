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
  /* -webkit-overflow-scrolling: touch; */
  font-family:'MicrosoftYaHei';
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
  font-size: 14px;
  min-width:1366px;
}
#app{
  width: 100%;
  height: 100%;
}
.el-message{
   min-width: 180px;
}
</style>
