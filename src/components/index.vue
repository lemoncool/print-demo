<template>
  <div ref="printDom" class="printContainer">
    <el-form :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="上海市黄浦区中山东一路黄浦江畔128号" value="shanghai"></el-option>
          <el-option label="北京市东城区东长安街77号" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" v-model="form.date"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          <el-checkbox label="公司团建推广" name="type"></el-checkbox>
          <el-checkbox label="哈哈哈哈哈" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc" autosize></el-input>
      </el-form-item>
      <el-form-item class="noPrint">
        <el-button type="primary" @click="onPrint">打印</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '王小明今天来上学么',
          region: 'shanghai',
          date: '2020-12-25',
          delivery: true,
          type: ['线上活动', '地推活动'],
          resource: '线上品牌商赞助',
          desc: '三年级八班王小明同学,你妈妈拿了两罐旺仔牛奶在操场等你!...别看我，你再看我，你还在看我，你在看我就把你喝掉！你旺我旺，大家旺。粑粑，长大后我一定比你高，比你强，因为我有旺仔牛奶'
        }
      };
    },
    methods: {
      onPrint() {
        this.$print(this.$refs.printDom, {
          noPrint: '.noPrint',
          onStart: () => {
            console.log('打印开始');
          },
          onEnd: () => {
            console.log('打印完成');
          }
        });
      }
    }
  };
</script>
<style>
  .printContainer {
    width: 700px;
    -webkit-print-color-adjust: exact;
  }
</style>

<!--以下方式需要项目引入node-sass-->
<!--<style lang="scss">-->
<!--@media print {-->
<!--body {-->
<!-- -webkit-print-color-adjust: exact;-->
<!--}-->
<!--}-->
<!--</style>-->
