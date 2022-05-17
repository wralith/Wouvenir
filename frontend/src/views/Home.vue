<template>
  <main class="container-center">
    <img alt="logo" src="../assets/logo.svg" height="240" id="logo" />
    <h1>Wouvenir</h1>
    <p>
      Souvenir shop interface made with
      <span>Node Express MongoDB and Vue</span>
    </p>
  </main>
</template>

<style lang="scss">
#logo {
  margin-top: 12rem;
  padding: 1rem;
  background-color: gray;
  border-radius: 5px;
  transition: all ease 500ms;
  &:hover {
    background-color: $accent;
  }
}
main p span {
  color: $accent;
}
</style>
