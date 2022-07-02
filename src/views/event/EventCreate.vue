<template>
  <div>
    <h1>Create an event</h1>
    <form @submit="submit">
      <BaseSelect
        label="Select a category:"
        v-model="category"
        :options="categories"
        :error="errors.category"
      />

      <fieldset>
        <legend>Name & describe your event</legend>

        <BaseInput
          v-model="title"
          label="Title"
          type="text"
          :error="errors.title"
        ></BaseInput>

        <BaseInput
          v-model="description"
          label="Description"
          type="text"
          :error="errors.description"
        ></BaseInput>
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>

        <BaseInput
          v-model="location"
          label="Location"
          type="text"
          :error="errors.location"
        ></BaseInput>
      </fieldset>

      <fieldset>
        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <div>
          <BaseRadioGroup
            v-model="pets"
            name="pets"
            :options="petOptions"
            :error="errors.pets"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        <div>
          <BaseCheckbox
            label="Catering"
            v-model="catering"
            :error="errors.catering"
          />
        </div>

        <div>
          <BaseCheckbox
            label="Live music"
            v-model="music"
            :error="errors.music"
          />
        </div>
      </fieldset>

      <BaseButton class="-fill-gradient" type="submit">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { useEventStore } from '@/store/EventStore'
import { useUserStore } from '@/store/UserStore'
import { useFlashStore } from '@/store/FlashStore'
import { useField, useForm } from 'vee-validate'

export default {
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    const flashStore = useFlashStore()

    const required = (value) => {
      const requiredMessage = 'This field is required'
      if (value === undefined || value === null) return requiredMessage
      if (!String(value).length) return requiredMessage
      return true
    }
    const minLength = (number, value) => {
      if (String(value).length < number)
        return 'Please type at least ' + number + ' characters'
      return true
    }
    const anything = () => {
      return true
    }

    const validationSchema = {
      category: required,
      title: (value) => {
        const req = required(value)
        if (req !== true) return req
        const min = minLength(3, value)
        if (min !== true) return min

        return true
      },
      description: required,
      location: undefined,
      pets: anything,
      catering: anything,
      music: anything,
    }

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        pets: 1,
        catering: false,
        music: false,
      },
    })

    const { value: category } = useField('category')
    const { value: title } = useField('title')
    const { value: description } = useField('description')
    const { value: location } = useField('location')
    const { value: pets } = useField('pets')
    const { value: catering } = useField('catering')
    const { value: music } = useField('music')

    const submit = handleSubmit((values) => {
      const event = {
        ...values,
        id: uuidv4(),
        organizer: userStore.name,
      }

      console.log('event', event)
      // this.eventStore
      //   .createEvent(event)
      //   .then(() => {
      //     this.flashStore.setFlashMessage(
      //       'Event ' + event.title + ' successfully created!'
      //     )
      //     setTimeout(() => {
      //       this.flashStore.setFlashMessage('')
      //     }, 3000)
      //     this.$router.push({ name: 'EventDetails', params: { id: event.id } })
      //   })
      //   .catch((error) => {
      //     this.$router.push({ name: 'ErrorDisplay', params: { error: error } })
      //   })
    })

    return {
      eventStore,
      userStore,
      flashStore,
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      submit,
      errors,
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
