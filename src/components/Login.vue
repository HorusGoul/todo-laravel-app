<template>
  <div class="login">
    <form v-on:submit.prevent="onSubmit">
      <h1>Iniciar sesión</h1>

      <div class="input-group">
        <input v-model="email" id="email" type="email" required placeholder="example@example.com"/>
        <label for="email">
          Email
        </label>
      </div>

      <div class="input-group">
        <input v-model="password" id="password" type="password" required placeholder="Password"/>
        <label for="password">
          Contraseña
        </label>
      </div>

      <button :disabled="!email || !password">
        Conectar
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthService, { ILoginData } from '@/AuthService';

export default Vue.extend({
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    onSubmit() {
      const { email, password } = this;

      AuthService.login({ email, password });
    }
  }
});
</script>

<style scoped>
  .login {
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    max-width: 320px;
    margin: 16px auto;
  }

  h1 {
    margin: 0;
    padding: 0 0 8px;
  }

  .input-group {
    display: flex;
    flex-direction: column-reverse;
    margin: 16px 0;
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

  button {
    width: 100%;
    border: none;
    padding: 16px;
    background-color: #42b983;
    color: #fff;
    font-weight: bold;
    font-size: 11pt;
    cursor: pointer;

    transition: background-color 180ms linear;
  }

  button:hover {
    background-color: #3ba173;
  }

  button[disabled] {
    background-color: #a5a5a5;
  }
</style>
