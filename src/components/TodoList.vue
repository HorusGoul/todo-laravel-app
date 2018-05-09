<template>
  <div class="todo-list">
      {{ taskList }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'todo-list',
  props: [
    'taskList'
  ]
})
</script>
