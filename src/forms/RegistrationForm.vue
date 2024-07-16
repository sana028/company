<template>
   <div class="container-re">
    <h3>Register As User</h3>
    <form>
    <div class="form">
      <div class="form-group">
        <label for="fullname">Full Name:<span class="required">*</span></label>
        <input type="text" id="fullname" name="fullname" placeholder="Enter your name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="fullname">Email:<span class="required">*</span></label>
        <input type="email" id="email" name="email" placeholder="Enter your email" v-model="email" required>
      </div>
    </div>
    <div class="form">
      <div class="form-group">
        <label for="fullname">Phone number:<span class="required">*</span></label>
        <input type="text" id="phone" name="phone" placeholder="Enter your phone number" v-model="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="fullname">Company Name:<span class="required">*</span></label>
        <input type="text" id="company" name="company" placeholder="Enter your company name" v-model="company" required>
      </div>
    </div>
 
      <div class="form-group">
        <label for="fullname">Address:</label>
        <input type="text" id="location" name="location" placeholder="Enter your address" v-model="location">
      </div>
      <div class="form-group">
        <label for="fullname">Password:<span class="required">*</span></label>
        <input type="password" id="password" name="password" placeholder="Enter your password" v-model="password" required>
        <small>Min length is 8 characters</small>
      </div>
    
      <div class="checkbox">
        <input type="checkbox" id="agree" name="agree" v-model="agree" required>
        <label for="agree">I agree with Terms of Service, Terms of Payments and Privacy Policy</label>
      </div>
      <button type="submit" @click.prevent="register" >Register</button>
    </form>
    <div class="login-options">
      <RouterLink :to="{name:'signIn'}"><p class="message">Already registered? <a href="#">Login Into account</a></p></RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore';
import { useRouter } from 'vue-router';
import '../styles/register.css';

const router = useRouter();
const store = userRegistrationStore();
const name =  ref('');
const email = ref('');
const password = ref('');
const phoneNumber = ref('');
const company = ref('');
const location = ref('');
const agree = ref(false);

const register = async( ) =>{
   if(company.value && email.value && name.value && phoneNumber.value){
    if(password.value.length >= 8){
        if(agree.value){
            const data={
                company:company.value,
                email:email.value,
                name:name.value,
                phoneNumber:phoneNumber.value,
                password:password.value,
                location:location.value
            }
           const result= await store.register_user(data);
           if(result){
             router.push({name:'home'})
           }
          }else{
          alert('check the box as you are agree for the terms and policy conditions');
        }
        }else{
          alert('password length must be greater than 8 characters');
        }
   }
   else{
    alert('Enter all required fields');
   }
}

</script>
<style scoped>


    .container-re {
      width: 400px;
      margin: 100px auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border:1px solid #8080807a;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
      margin-right: 4px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
      font-size: 16px;
    }

    input[type="radio"] {
      margin-right: 5px;
    }

    .checkbox {
      margin-top: 10px;
      display: flex;
    }

    .checkbox label {
      display: inline-block;
      margin-left: 5px;
    }

    button[type="submit"] {
      background-color: #ffc107;
      color: #fff;
      padding: 12px 20px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
    }

    .login-options {
      margin-top: 20px;
      text-align: center;
    }

    .login-options a {
      margin: 0 10px;
      text-decoration: none;
      color: #333;
    }

    .login-options .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #333;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
    }

    .form{
        display: flex;
        justify-content: space-between;
    }

    .required {
  color: #FF0000; /* red color */
  font-weight: bold;
}
label{
    display: flex;
}
</style>
