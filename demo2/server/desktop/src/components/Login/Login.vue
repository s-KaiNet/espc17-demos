<template>
    <div class="login">
        <img src="./../../assets/logo.png">
        <h1>Q&amp;A Manager App</h1>
        <br>
        <div class="info">
            <h3>Sign in with your Office 365 Account</h3>
        </div>
        <br>
        <div>
            <el-button type="primary" size="large" @click="login" :loading="loading">Login</el-button>
        </div>
    </div>
</template>

<script lang="ts" src="./Login">

</script>

<style lang="scss" scoped>
.login .info {
    background-color: rgba(33, 150, 243, .12);
    padding: 10px;
}
.login {
    text-align: center;
}
</style>


