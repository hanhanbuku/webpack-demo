<template>
  <div class="content">8888</div>
<button @click="handlerLoad">home</button>
</template>

<script>
export default {
  name: "home",
  methods:{
    handlerLoad(){
      import(/* webpackChunkName: "count" */ '/src/js/count').then(count=>{
        // 异步加载需要在回调函数中使用引入的东西
        console.log(count)
        const total = count.sum([1, 2, 3, 4])

        console.log(total)
      })
    }
  }
}
</script>

<style scoped>

</style>
