<template>
<div class="content">我是app。vue,1231</div>
<user/>
</template>

<script>
import User from "./components/user.vue";

export default {
  name: "App",
  components: {User},
  mounted() {
    this.handler()
  },
  methods:{
    handler(){

      console.log(1888)
    }
  }
}
</script>

<style scoped>

</style>
