<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view></router-view>
  <router-link to="/login?id=12">Go to login</router-link>
  <router-link to="/home?id=13">Go to home</router-link>
  <router-link to="/store">Go to store</router-link>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
