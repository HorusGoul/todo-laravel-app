<template>
  <div class="todo-list">
      <div v-for="task in taskList" v-bind:key="task.id" class="task" v-bind:class="{ completed: task.completed }">
        <div class="checkbox">
          <input type="checkbox" v-model="task.completed" />
        </div>

        <input  type="text" v-model="task.content" class="content" />
        
        <button class="delete">
          Delete
        </button>

        <button class="save">
          Save
        </button>
      </div>
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

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
