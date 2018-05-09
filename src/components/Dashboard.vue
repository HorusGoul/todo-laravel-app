<template>
  <div class="dashboard">
    <div class="topbar">
      <h1>Todo-Laravel</h1>

      <span class="username">
        {{ user && user.email }}
      </span>

      <button class="logout" v-on:click="logout">
        Logout
      </button>
    </div>

    
    <todo-list :taskList="['asdasd']"></todo-list>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import AuthService from '@/AuthService';
import UserService,{ IUser } from '@/UserService';
import TodoList from './TodoList.vue';

export default Vue.extend({
  name: 'dashboard',
  components: {
    TodoList
  },
  data() {
    const user: IUser = null;

    return { user };
  },
  methods: {
    logout() {
      AuthService.logout();
    },
    setUser(user: IUser) {
      this.user = user;
    }
  },
  mounted() {
    UserService.addUserListener(this.setUser.bind(this));
  },
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
</style>

