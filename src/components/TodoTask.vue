<template>
  <div class="task" v-bind:class="{ completed: task.completed }">
      <div class="toolbar">
        <div class="checkbox">
          <input :id="'completed' + task.id" type="checkbox" v-model="task.completed" />

          <label :for="'completed' + task.id">
            Completada
          </label>
        </div>

        <button class="delete" v-on:click="deleteTask(task)">
          Borrar
        </button>
      </div>
      
      <auto-textarea 
        :disabled="task.completed || task.completed === 1"
        v-model="task.content"
        class="content"
        rows="1" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoService from '@/TodoService';
import AutoTextarea from './AutoTextarea.vue';
import _ from 'lodash';

export default Vue.extend({
  name: 'todo-task',
  components: {
    AutoTextarea
  },
  props: ['task', 'deleteTask'],
  watch: {
    task: {
      deep: true,
      handler: _.debounce((newTask) => {
        TodoService.update(newTask);
      }, 250)
    }
  },
})
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  margin: 8px 0;
}

.toolbar {
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.checkbox {
  display: flex;
  padding: 0 16px;
  align-items: center;
  user-select: none;
}

.checkbox > * {
  cursor: pointer;
}

.checkbox > input {
  margin-right: 8px;
}

.task.completed .content {
  text-decoration: line-through;
}

.content {
  flex: 1;
  line-height: 1.6;
  font-size: 14pt;
  border: none;
  padding: 16px;
  resize: none;
  overflow: hidden;
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

.delete {
  margin-left: auto;
}
</style>

