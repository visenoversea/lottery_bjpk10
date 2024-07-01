<template>
  <div></div>
</template>
<script>
import { defineComponent } from 'vue'
import router from '@/router/index.js'
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.log('from.query', from.query)
    console.log('from.fullPath', from.fullPath)
    next(() => { router.replace({ path: from.fullPath, query: from.query }) })
  }
})

</script>

<script setup>
</script>
