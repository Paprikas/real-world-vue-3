<template>
  <p>
    {{ event.time }} on {{ event.date }} @ {{ event.location }} by
    {{ event.organizer }}
  </p>
  <p>{{ event.description }}</p>
</template>

<script>
export default {
  props: ['event'],
}
</script>
