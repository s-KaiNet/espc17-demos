<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="site in computedSites" :label="site.title" :key="site.title">
        <div>
          {{fullSiteUrl(site)}}
        </div>
        <question-list :initialQuestions="site.questions" :serverRelativeUrl="site.serverRelativeUrl"></question-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" src="./ListManager">

</script>

<style lang="scss">

</style>
