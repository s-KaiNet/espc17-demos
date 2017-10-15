<template>
    <div>
        <div v-for="(q, index) in questions" :key="q.id">
            <el-row class="row">
                <el-col :span="12">
                    <div class="question" @click="q.shown = !q.shown">
                        <span>{{q.question}}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="buttons">
                        <el-button type="success" @click="approveItem(q)">Approve</el-button>
                        <el-button type="danger" @click="rejectItem(q)">Reject</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row v-show="q.shown">
                <el-col :span="24" class="answer">
                    <div v-html="q.answer"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" src="./QuestionList">

</script>

<style lang="scss" scoped>
.row {
    margin: 10px;
    background-color: #eef1f6;
}

.question:hover {
    background-color: #bfe6f1;
    cursor: pointer;
}

.question,
.answer {
    padding: 14px;
}

.answer {
    margin-left: 10px;
}

.buttons {
    margin-left: 10px;
    padding-top: 5px;
}
</style>
