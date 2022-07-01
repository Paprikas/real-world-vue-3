<template>
  <div>
    <h1>Create an event</h1>
    <form>
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
        <input type="radio" v-model="event.pets" :value="1" name="pets" />
        <label>Yes</label>
      </div>

      <div>
        <input type="radio" v-model="event.pets" :value="0" name="pets" />
        <label>No</label>
      </div>

      <h3>Extras</h3>
      <div>
        <input type="checkbox" v-model="event.extras.catering" class="field" />
        <label>Catering</label>
      </div>

      <div>
        <input type="checkbox" v-model="event.extras.music" class="field" />
        <label>Live music</label>
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
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'

export default {
  components: { BaseSelect, BaseInput },
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
    }
  },
  methods: {
    onSubmit() {
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
