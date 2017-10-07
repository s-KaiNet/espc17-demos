<template>
    <div>
        <div v-for="q in questions" :key="q.id">
            <ui-collapsible :title="q.Question">
                <div v-html="q.Answer"></div>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
module.exports = require('./Accordion');
</script>

<style src="./Accordion.scss" lang="scss"></style>