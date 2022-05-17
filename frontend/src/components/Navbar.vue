<template>
  <nav>
    <router-link to="/" class="brand"><span>W</span>ouvenir</router-link>
    <input placeholder="🔍 Search"/>
    <div>
    <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap:0.3rem;
  height: 4rem;
  padding: 0 2rem;
  background-color: $primary-content;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow:0 0 0.5rem $neutral ;
  & a {
    color: $primary;
      &:hover {
        color: darken($primary, 10%)
      }
  }
  & input {
    width: 15rem;
    background: $neutral
  }
}

.brand {
  color: $primary;
  font-size: 1.2rem;
  font-weight: 600;
  & span {
    color: $secondary;
  }
}
</style>
