<script>
import {defineComponent} from 'vue'
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace({name: from.name, params: from.params, query: from.query})
    })
  }
})
</script>
<template>
  <div></div>
</template>