<template>
    <div class="sidebar">
        <div class="brand">
            <div>
                <img src="./../../assets/logo.png" />
            </div>
            <div class="title">Q&amp;A Manager</div>
        </div>
        <el-menu default-active="1">    
            <el-menu-item @click="navigate('/app')" index="1" ><i class="material-icons">loop</i> Approve or Reject</el-menu-item>
            <el-menu-item @click="navigate('/app/profile')" index="2"><i class="material-icons">account_box</i> Profile</el-menu-item>
            <el-menu-item @click="navigate('/app/security')" index="2"><i class="material-icons">security</i> Security</el-menu-item>
            <el-menu-item @click="navigate('/app/settings')" index="3"><i class="material-icons">build</i> Settings</el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" src="./SideBar">

</script>

<style lang="scss">
.sidebar {
    width: 260px;
    background-color: #EEF1F6;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    height: 100%;
    position: absolute;
    z-index: 100;

    .brand {
        text-align: center;
        padding: 10px;
        border-bottom: 1px solid #bfbebe;

        .title {
            font-size: 24px;
            color: #02648e;
        }

        img {
            width: 40%;
        }
    }
}
.el-menu {
    .el-menu-item.is-active{
        background-color: #dadada;
    }
}
</style>
