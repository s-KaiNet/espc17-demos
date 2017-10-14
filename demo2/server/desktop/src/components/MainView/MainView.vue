<template>
    <div class="container">
        <side-bar></side-bar>
        <div class="content">
            <top-bar></top-bar>
            <div class="view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./MainView">

</script>

<style lang="scss">
.content {
  padding-left: 260px;

  .view {
    margin: 20px;
  }
}
</style>
