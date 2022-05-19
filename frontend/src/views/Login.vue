<script setup>
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import axios from 'redaxios'

const apiUrl = import.meta.env.VITE_API_URL
const loginSchema = object({
  email: string().required('Email is required'),
  password: string().required('Password is required')
})

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: loginSchema })

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    await axios.post('api/sessions', values)
  } catch (e) {
    console.log(e)
  }

  resetForm()
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="form-element">
      <label for="email">Email</label>
      <input
        v-model="email"
        name="email"
        id="email"
        type="email"
        placeholder="example@mail.com"
        :class="{ 'error-border': errors.email }"
      />
      <Transition name="fade">
        <p class="error" v-if="errors.email">{{ errors.email }}</p>
      </Transition>
    </div>
    <div class="form-element">
      <label for="password">Password</label>
      <input
        v-model="password"
        name="password"
        id="password"
        type="password"
        :class="{ 'error-border': errors.password }"
      />
      <Transition name="fade">
        <p class="error" v-show="errors.password">{{ errors.password }}</p>
      </Transition>
    </div>
    <button class="btn" :disabled="isSubmitting">Login</button>
  </form>
</template>

<style scoped lang="scss">
form {
  @extend .container;
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  gap: 2rem;
  background: $neutral;
  padding: 3rem;
  border-radius: 1rem;

  @media (max-width: 768px) {
    margin: 0 2.5%;
  }
}

.form-element {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.error {
  color: $error;
  position: absolute;
  right: 0.5rem;
  bottom: -1rem;
  margin: 0;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  align-self: flex-end;
  width: fit-content;
  background: $neutral-darker;
}

.error-border {
  box-shadow: 0 0 0 3px inset $error;
}
</style>
