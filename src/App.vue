<script setup lang="ts">
import { useValidatorForm } from "./composable/validateForm.ts";

const initValue: any = {
  username: '',
  email: '',
  password: '',
  age: '',
}

const rules = {
  username: [
    (value: string) => value.length >= 4 || "Имя должно быть больше 3 символов"
  ],
  email: [
    (value: string) => !!value || "Поле обязательно",
    (value: string) => value.includes('@') && value.length > 5|| "Неккоректный email"
  ],
  password: [
    (value: string) => value.length >= 8 || "Пароль должен содержать минимум 8 символов"
  ],
  age: [
    (value: string) => Number(value) >= 18 || "Вам должно быть больше 17 лет"
  ]
}

const { values, errors, isFormValid, validateForm,resetForm } = useValidatorForm(initValue, rules);

function onSubmit() {
  if (validateForm()) {
    alert('Форма валидна')
  }
  else
    alert('Возникли ошибки, исправьте их')
  console.log(errors)
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit" class="form">
      <div class="input-group">
        <input v-model="values.username" placeholder="Username" />
        <span v-for="error in errors.username" :key="error" class="error">{{ error }}</span>
      </div>

      <div class="input-group">
        <input v-model="values.email" placeholder="Email" />
        <span v-for="err in errors.email" :key="err" class="error">{{ err }}</span>
      </div>

      <div class="input-group">
        <input v-model="values.password" placeholder="Password" type="password" />
        <span v-for="err in errors.password" :key="err" class="error">{{ err }}</span>
      </div>

      <div class="input-group">
        <input v-model="values.age" placeholder="Age" type="number" />
        <span v-for="err in errors.age" :key="err" class="error">{{ err }}</span>
      </div>

      <button type="submit" :disabled="!isFormValid" class="submit-btn">Отправить</button>


      <button v-if="!isFormValid" class="reset-btn" type="reset" @click="resetForm">Заполнить форму заново</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

.error {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

.submit-btn {
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.reset-btn {
  color: white;
  padding: 10px;
  background: #402224;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}
</style>