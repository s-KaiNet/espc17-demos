<template>
    <div class="topbar">
        <div class="text">Q&amp;A Manager App</div>
        <div class="text login">Welcome, {{userName}}
            <img src="./../../assets/avatar.png" />&nbsp;
        </div>
    </div>
</template>

<script lang="ts" src="./TopBar">

</script>
<style lang="scss">
.topbar {
    height: 64px;
    background-color: rgb(9, 142, 199);

    .text {
        font-size: 20px;
        color: white;
        font-weight: 400;
        padding: 20px;
        float: left;
    }
    .login {
        float: right;

        img {
            vertical-align: middle;
            height: 34px;
            border-radius: 17px;
        }

        i {
            cursor: pointer;
        }
    }
}
</style>