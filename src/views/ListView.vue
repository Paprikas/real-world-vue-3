<template>
  <div>
    <input type="text" v-model="newContact" placeholder="Name" />
    <BaseButton @click="addContact" type="button">Add Contact</BaseButton>
    <BaseButton @click="sortContacts" type="button">Sort</BaseButton>

    <transition-group tag="ul" name="slide-up" appear>
      <li v-for="contact in contacts" :key="contact">
        {{ contact }}
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newContact: '',
      contacts: ['Beau Thabeast', 'Cindy Rella', 'Alice Vunderlind'],
    }
  },
  methods: {
    addContact() {
      this.contacts.push(this.newContact)
      this.newContact = ''
    },
    sortContacts() {
      this.contacts.sort()
    },
  },
}
</script>
