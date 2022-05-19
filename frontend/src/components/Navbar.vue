<template>
  <nav>
    <router-link to="/" class="brand"><span>W</span>ouvenir</router-link>
    <input class="search-bar" placeholder="🔍 Search" />
    <div class="menu-group">
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 0.3rem;
  height: 4rem;
  padding: 0 2rem;
  background-color: $primary-content;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem $neutral;
  & a {
    color: $primary;
    &:hover {
      color: darken($primary, 10%);
    }
  }
}

.menu-group {
  display: flex;
  gap: 0.7rem;
}

.search-bar {
  width: 15rem;
  background: $neutral;

  @media (max-width: 768px) {
    display: none;
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
