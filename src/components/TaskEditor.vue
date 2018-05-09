<template>
  <div class="task-editor">
    <form v-on:submit.prevent="addTask">
      <div class="input-group">
        <input v-model="content" id="content" type="text" required placeholder="Hacer un proyectillo de Laravel"/>
        <label for="content">
          Nueva tarea
        </label>
      </div>

      <button v-if="content" class="create-task-btn">Añadir tarea</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'task-editor',
  props: ['createTask'],
  data: () => ({
    content: ''
  }),
  methods: {
    addTask() {
      this.createTask({
        content: this.content
      });

      this.clearForm();
    },
    clearForm() {
      this.content = '';
    }
  }
})
</script>

<style scoped>

.task-editor {
  padding: 15px;
}

.input-group {
  display: flex;
  flex-direction: column-reverse;
}

.input-group label {
  font-weight: bold;
  font-size: 11pt;
}

.input-group input {
  padding: 8px 0;
  border: none;
  border-bottom: 2px solid #2c3e50;
}

.input-group input:focus {
  border-color: #42b983;
}

.input-group input:focus ~ label {
  color: #42b983;
}

.input-group > * {
  transition: color 180ms linear;
}

.create-task-btn {
  width: 100%;
  border: none;
  padding: 16px;
  background-color: #42b983;
  color: #fff;
  font-weight: bold;
  font-size: 11pt;
  cursor: pointer;
  margin-top: 16px;

  transition: background-color 180ms linear;
}

.create-task-btn:hover {
  background-color: #3ba173;
}

.create-task-btn[disabled] {
  background-color: #a5a5a5;
}
</style>

