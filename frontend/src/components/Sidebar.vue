<script setup>
import { ref } from 'vue'
const isMenu = ref(false)

const toggleMenu = () => {
  isMenu.value = !isMenu.value
}
</script>

<template>
  <aside :class="{ 'sidebar-expanded': isMenu }">
    <div class="logo">
      <span class="material-icons">home</span>
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-icons">menu</span>
      </button>
    </div>

    <h3>Menu</h3>
    <nav class="menu">
      <router-link to="/" class="menu-button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/register" class="menu-button">
        <span class="material-icons">create</span>
        <span class="text">Register</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

aside {
  background-color: $primary;
  display: flex;
  flex-direction: column;
  width: 2rem;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 300ms ease-out;

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    align-items: center;

    position: relative;
    top: 0;
    transition: 300ms ease-out;

    .material-icons {
      &:hover {
        color: white;
        transform: translateX(0.5rem);
        background-color: $neutral;
      }
    }
  }

  &.sidebar-expanded {
    width: $sidebar-width;
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(180deg);
      }
    }

    h3,
    .menu-button .text {
      opacity: 1;
    }

    .material-icons {
      margin-right: 1rem;
    }
  }

  h3,
  .menu-button .text {
    opacity: 0;
    transition: 300ms ease-out;
  }

  .menu {
    margin: 0 -1rem;
    .menu-button {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      transition: color 300ms ease;

      &:hover {
        background-color: $neutral;
      }
    }
    & .router-link-exact-active {
      background-color: $secondary;
      border-right: 5px solid $neutral;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.material-icons {
  font-size: 2rem;
  color: $primary-content;
  transition: 300ms ease-out;
}
</style>
