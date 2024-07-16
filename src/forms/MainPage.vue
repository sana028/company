<template>
    <v-container>
        <v-row justify="center">
            <v-col >
                <v-card class="card">
                    <div class="overlay">
                        <v-card-title class="title">Welcome</v-card-title>
                    </div>
                    <v-card-text class="card-text">
                        <v-carousel :show-arrows="false" class="carousel">
                            <v-carousel-item class="background" cover >
                            </v-carousel-item>
                            <v-carousel-item class="background-1" cover></v-carousel-item>
                            <v-carousel-item class="background-2"cover></v-carousel-item>
                        </v-carousel>
                    </v-card-text>
                    <v-card-actions class="actions">
                        <v-btn color="warning" variant="outlined" @click="login">Login</v-btn>
                        <v-btn color="warning" variant="flat" @click="register">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = () => {
    router.push({ name: 'signIn' });
}

const register = () => {
    router.push({ name: 'signUp' })
}

</script>
<style scoped>
.card {
    position: relative;
    min-height: 80vh;
    display: flex;
    min-width:300px;
    flex-direction: column;
    justify-content: center;
    overflow: hidden; /* Ensure the overlay is properly contained */
}

.carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100% !important;
    z-index: 0;
}

.background, .background-1, .background-2 {
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.background {
    background-image: url('../assets/images/clothing.jpg');
}

.background-1 {
    background-image: url('../assets/images/clothing.jpg');
}

.background-2 {
    background-image: url('../assets/images/clothing.jpg');
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    pointer-events: none; /* Ensure the overlay does not interfere with interactions */
}

.title {
    color: white;
    font-size: 24px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    pointer-events: auto; /* Allow interaction with the title */
}

.actions {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 65px;
    pointer-events: auto; /* Allow interaction with the buttons */
}

.v-card {
    padding: 0; /* Remove default padding */
}

.v-btn--icon.v-btn--density-default{
    width:auto !important;
    height:auto !important;
    background-color: black !important;
}

.v-carousel__controls{
    background-color: black !important;
}
</style>



