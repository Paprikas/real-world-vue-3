<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <BaseSelect
        label="Select a category:"
        v-model="event.category"
        :options="categories"
      />

      <fieldset>
        <legend>Name & describe your event</legend>

        <BaseInput v-model="event.title" label="Title" type="text"></BaseInput>

        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
          error="This input has an error!"
        ></BaseInput>
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>

        <BaseInput
          v-model="event.location"
          label="Location"
          type="text"
        ></BaseInput>
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <div>
          <BaseRadioGroup
            v-model="event.pets"
            name="pets"
            :options="petOptions"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        <div>
          <BaseCheckbox label="Catering" v-model="event.extras.catering" />
        </div>

        <div>
          <BaseCheckbox label="Live music" v-model="event.extras.music" />
        </div>
      </fieldset>

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
<style scoped>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
</style>
