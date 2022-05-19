<script setup>
import Navbar from './components/Navbar.vue'
import 'normalize.css'
import UserAuth from './stores/UserAuth'

let { userAuthData, userAuthError } = UserAuth()
</script>

<template>
  <Navbar />
  <p v-if="userAuthData">
    Welcome <span>{{ userAuthData.data.name }}</span>
  </p>
  <router-view />
</template>

<style scoped lang="scss">
p {
  text-align: center;
}
span {
  color: $secondary;
  text-transform: capitalize;
}
</style>
