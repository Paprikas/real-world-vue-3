<template>
  <h4>Oops there was an error!</h4>
  <p>{{ error }}</p>
  <h3>
    It looks like you're experiencing unknown issues!, please
    <a href="#" @click="$router.go(-1)">click here</a>
    to try again
  </h3>
</template>

<script>
export default {
  props: ['error'],
}
</script>
