<template>
    <div>
        <div v-for="item in loopValues" :key="item">
            <ui-collapsible title="This is open initially" open>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nemo suscipit ipsa molestias, tempora dolor natus modi et incidunt tenetur!
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
module.exports = require('./Accordion');
</script>

<style src="./Accordion.scss" lang="scss"></style>