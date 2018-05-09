<template>
  <div class="task" v-bind:class="{ completed: task.completed }">
      <div class="checkbox">
        <input type="checkbox" v-model="task.completed" />
      </div>

      <input :disabled="task.completed || task.completed === 1" type="text" v-model="task.content" class="content" />
      
      <button class="delete" v-on:click="deleteTask(task)">
        X
      </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoService from '@/TodoService';
import _ from 'lodash';

export default Vue.extend({
  name: 'todo-task',
  props: ['task', 'deleteTask'],
  watch: {
    task: {
      deep: true,
      handler: _.debounce((newTask) => {
        TodoService.update(newTask);
      }, 250)
    }
  }
})
</script>

<style scoped>
.task {
  display: flex;
}

.checkbox {
  display: flex;
  padding: 0 16px;
  align-items: center;
}

.task.completed .content {
  text-decoration: line-through;
}

.content {
  flex: 1;
  line-height: 1.6;
  font-size: 14pt;
  border: none;
  padding: 0;
  width: 0;
}

.content:disabled {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.2);
}

button {
  background-color: transparent;
  border: none;
  padding: 16px;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

