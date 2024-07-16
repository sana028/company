<template>
  <div class="body">
    <div class="container">
      <div>
        <h1>Hello!</h1>
        <p>Please login with your account</p>
        <form>
          <input type="text" placeholder="Email" name="email" required v-model="email">
          <input type="password" placeholder="Password" name="password" required v-model="password">
          <button type="submit" @click.prevent="login">Login</button>
          <a href="#" class="forgot-password">Forget Password?</a>
        </form>
        <RouterLink :to="{name:'signUp'}"><p class="message">Not registered? <a href="#">Create an account</a></p></RouterLink>
      </div>
      <div class="image-container">
        <img src="../assets/images/clothing.jpg" alt="Living Room Interior Design">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore';
import { useRouter } from 'vue-router';

const router=useRouter();
const email = ref('');
const password = ref('');
const store = userRegistrationStore();

const login = async() => {
  const data = {
    email: email.value,
    password: password.value
  }
  const result = await store.user_login(data);
  if(result){
    router.push({name:'home'})
  }
}

</script>
<style scoped>
.body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 45%;
  border:1px solid #8080807a;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
}

button {
  background-color: #ffcc00;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
}

button:hover {
  opacity: 0.9;
}

.social-media {
  margin-top: 20px;
}

.social-media a {
  padding: 10px;
  margin: 5px;
  border-radius: 50%;
  text-decoration: none;
  color: #fff;
}

.social-media a:hover {
  opacity: 0.8;
}

.google {
  background-color: #dd4b39;
}

.facebook {
  background-color: #3b5998;
}

.forgot-password {
  margin-top: 10px;
  color: #666;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.image-container {
  margin-top: 20px;
}

.image-container img {
  width: 100%;
}

form {
  padding: 15px;
}
</style>