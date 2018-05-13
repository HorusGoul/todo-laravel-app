<template>
  <div class="dashboard">
    <div class="topbar">
      <h1>Todo-Laravel</h1>

      <span class="username">
        {{ user && user.name }}
      </span>

      <button class="logout" v-on:click="logout">
        Logout
      </button>
    </div>

    <task-editor class="panel" :create-task="createTask" />

    <div class="toolbar panel">
      <button @click="setAllFilter">
        Todas
      </button>

      <button @click="setActiveFilter">
        Activas
      </button>

      <button @click="setCompletedFilter">
        Completadas
      </button>
    </div>

    <todo-list :taskList="filteredTaskList" :delete-task="deleteTask"></todo-list>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import AuthService from '@/AuthService';
import UserService,{ IUser } from '@/UserService';
import TodoList from './TodoList.vue';
import TaskEditor from './TaskEditor.vue';
import TodoService,{ ITask } from '@/TodoService';
import { create } from 'domain';

const MODE_ALL = 'all';
const MODE_COMPLETED = 'completed';
const MODE_ACTIVE =  'active';

export default Vue.extend({
  name: 'dashboard',
  components: {
    TodoList,
    TaskEditor
  },
  data() {
    const user: IUser = null;

    return { user, taskList: [], mode: 'all' };
  },
  methods: {
    logout() {
      AuthService.logout();
    },
    setUser(user: IUser) {
      this.user = user;
    },
    async fetchTasks() {
      const tasks = await TodoService.getAll();

      this.setTasks(tasks);
    },
    async deleteTask(task: ITask) {
      await TodoService.delete(task);

      this.setTasks(this.taskList.filter(value => value !== task));
    },
    async createTask(task: ITask) {
      const newTask = await TodoService.create(task);

      this.setTasks([newTask, ...this.taskList]);
    },
    setTasks(tasks: ITask[]) {
      this.taskList = tasks.sort((a, b) => {
        const aDate = +new Date(a.created_at);
        const bDate = +new Date(b.created_at);

        return bDate - aDate;
      });
    },
    setCompletedFilter() {
      this.mode = MODE_COMPLETED;
    },
    setActiveFilter() {
      this.mode = MODE_ACTIVE;
    },
    setAllFilter() {
      this.mode = MODE_ALL;
    },
  },
  mounted() {
    UserService.addUserListener(this.setUser.bind(this));
    this.fetchTasks();
  },
  computed: {
    filteredTaskList: function (): ITask[] {
      if (this.mode === 'completed') {
        return this.taskList.filter(task => task.completed);
      }

      switch (this.mode) {
        case MODE_ACTIVE:
          return this.taskList.filter(task => !task.completed);
        case MODE_COMPLETED: 
          return this.taskList.filter(task => task.completed);
        default:
          return this.taskList;
      }
    }
  }
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #42b983;
  color: #fff;
  height: 56px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

h1 {
  margin: 0;
  font-size: 16pt;
  padding: 0 16px;
  color: #fff;
}

.logout {
  background-color: transparent;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 16px;
  color: #fff;
  cursor: pointer;
}

.logout:hover {
  background-color: rgba(0, 0, 0, 0.05);
  height: 100%;
}

.username {
  color: rgba(255, 255, 255, 0.8);
  margin-left: auto;
  padding: 0 16px;
}

.panel {
  background-color: #fff;
  max-width: 720px;
  margin: 16px auto;
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

button {
  background-color: transparent;
  border: none;
  padding: 16px;
  margin: 0;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: #42b983;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

