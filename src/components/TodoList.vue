<template>
  <div class="todo-list">
      <todo-task v-for="task in taskList" v-bind:key="task.id" :task="task" :delete-task="deleteTask"></todo-task>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoTask from './TodoTask.vue';

export default Vue.extend({
  name: 'todo-list',
  components: {
    TodoTask
  },
  props: [
    'taskList', 'deleteTask'
  ]
})
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 720px;
  margin: 0 auto;
}
</style>
