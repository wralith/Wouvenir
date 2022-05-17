<script setup>
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
// import {ref} from 'vue'

const registerSchema = object({
  username: string().min(3, 'Minimum 3 characters needed for username'),
  email: string()
    .email('Please enter a valid e-mail')
    .required('Email is required')
    .min(7, 'Please enter a valid e-mail'),
  password: string()
    .required('Password is required')
    .min(7, 'Minimum 7 characters needed for password'),
  passwordConfirmation: string()
    .required('Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
})

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: registerSchema })

const { value: username } = useField('username')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: passwordConfirmation } = useField('passwordConfirmation')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="form-element">
      <label for="username">Username</label>
      <input
        v-model="username"
        name="username"
        id="username"
        placeholder="Username"
        :class="{ 'error-border': errors.username }"
      />
      <Transition name="fade">
        <p class="error" v-if="errors.username">{{ errors.username }}</p>
      </Transition>
    </div>
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
    <div class="form-element">
      <label for="passwordConfirmation">Password Confirmation</label>
      <input
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        id="passwordConfirmation"
        type="password"
        :class="{ 'error-border': errors.passwordConfirmation }"
      />
      <Transition name="fade">
        <p class="error" v-if="errors.passwordConfirmation">{{ errors.passwordConfirmation }}</p>
      </Transition>
    </div>
    <button class="btn" :disabled="isSubmitting">Register</button>
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
