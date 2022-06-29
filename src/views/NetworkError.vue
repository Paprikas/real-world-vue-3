<template>
  <div class="network-error">
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing connectivity issues, please
      <a href="#" @click="$router.go(-1)">click here</a>
      to try again
    </h3>
  </div>
</template>
