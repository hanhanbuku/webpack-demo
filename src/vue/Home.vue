<template>
<div>{{msg}}</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Home",
  setup(){
    const msg = ref('Home test')
    return{
      msg
    }
  }
}
</script>

<style scoped>

</style>
