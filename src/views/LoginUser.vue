<template>
  <form @submit.prevent="login">
    <BaseInput
      label="Email"
      type="email"
      :modelValue="email"
      @change="handleChange"
      :error="emailError"
    />

    <BaseInput
      label="Password"
      type="password"
      v-model="password"
      :error="passwordError"
    />

    <p v-if="error">{{ error }}</p>

    <BaseButton type="submit" class="-fill-gradient"> Submit </BaseButton>

    <router-link :to="{ name: 'RegisterUser' }"
      >Don't have an account? Register here!</router-link
    >
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import { useUserStore } from '@/store/UserStore'

export default {
  setup() {
    const userStore = useUserStore()

    const validations = {
      email: (value) => {
        if (!value) return 'This field is required'

        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(String(value).toLowerCase())) {
          return 'Please enter a valid email address'
        }

        return true
      },
      password: (value) => {
        const requiredMessage = 'This field is required'

        if (value === undefined || value === null) return requiredMessage
        if (!String(value).length) return requiredMessage

        return true
      },
    }

    const { setFieldValue } = useForm({
      validationSchema: validations,
    })

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } =
      useField('password')

    const handleChange = (event) => {
      setFieldValue('email', event.target.value)
    }

    return {
      userStore,
      email,
      emailError,
      handleChange,
      password,
      passwordError,
    }
  },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    login() {
      this.userStore
        .login({
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'EventList' })
        })
        .catch((error) => {
          this.error = error.response.data.error
        })
    },
  },
}
</script>
