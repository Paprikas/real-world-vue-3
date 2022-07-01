<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <BaseSelect
        label="Select a category:"
        v-model="event.category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>

      <BaseInput v-model="event.title" label="Title" type="text"></BaseInput>

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
      ></BaseInput>

      <h3>Where is your event?</h3>

      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
      ></BaseInput>

      <h3>Are pets allowed?</h3>
      <div>
        <BaseRadioGroup
          v-model="event.pets"
          name="pets"
          :options="petOptions"
        />
      </div>

      <h3>Extras</h3>
      <div>
        <BaseCheckbox label="Catering" v-model="event.extras.catering" />
      </div>

      <div>
        <BaseCheckbox label="Live music" v-model="event.extras.music" />
      </div>

      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { useEventStore } from '@/store/EventStore'
import { useUserStore } from '@/store/UserStore'
import { useFlashStore } from '@/store/FlashStore'

export default {
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    const flashStore = useFlashStore()

    return {
      eventStore,
      userStore,
      flashStore,
    }
  },
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false,
        },
      },
      petOptions: [
        {
          label: 'Yes',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ],
    }
  },
  methods: {
    sendForm() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.userStore.name,
      }
      this.eventStore
        .createEvent(event)
        .then(() => {
          this.flashStore.setFlashMessage(
            'Event ' + event.title + ' successfully created!'
          )
          setTimeout(() => {
            this.flashStore.setFlashMessage('')
          }, 3000)
          this.$router.push({ name: 'EventDetails', params: { id: event.id } })
        })
        .catch((error) => {
          this.$router.push({ name: 'ErrorDisplay', params: { error: error } })
        })
    },
  },
}
</script>
