<template>
  <div id="app">
    <img src="./../assets/logo.png">
    <h1>Q&amp;A Manager App</h1>
    <br>
    <ui-alert :dismissible="false" remove-icon>
      <h3>Please, you login button below in order to sign in using your Office 365 Account</h3>
    </ui-alert>
    <div>
      <ui-button size="large" color="primary" @click="login" >Loign</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as spauth from 'node-sp-auth';
import { AuthData } from '../common/authData';

@Component
export default class App extends Vue {
  public msg = 'app sdfasdf';
  public html = '<p>cool!!!</p>';

  public login() {
    spauth.getAuth('https://mvapps.sharepoint.com/sites/dev', { ondemand: true, force: true })
      .then(options => {
        AuthData.auth = options.headers;
        console.log(AuthData.auth);
      });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
