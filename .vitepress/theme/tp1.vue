<script setup>
const  props = defineProps({
  list:{
    type:Array
  }
})
</script>

<template>
<div v-for="item in props.list">{{item}}</div>
</template>

<style scoped>

</style>