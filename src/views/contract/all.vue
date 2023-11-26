<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const route = useRouter()

const dataList = ref([
  {
    time:"2023/11/26 12:15:11",
    type:"BTC",
    direction:1,
    profit:113
  },
  {
    time:"2023/11/26 12:15:11",
    type:"ETH",
    direction:0,
    profit:642
  },
  {
    time:"2023/11/26 12:15:11",
    type:"DOGE",
    direction:1,
    profit:156
  },
  {
    time:"2023/11/26 12:15:11",
    type:"APE",
    direction:0,
    profit:642
  }
])

const goBack = () =>{
  route.back()
}
</script>

<template>
  <div class="all">
    <div class="header">
      <span class="material-symbols-outlined" @click="goBack"> arrow_back_ios </span>
      <span>全部仓位</span>
      <span></span>
    </div>
    <div class="per" v-for="(item,index) in dataList" :key="index">
      <div>
        <span>时间</span>
        <span>{{item.time}}</span>
      </div>
      <div>
        <span>种类</span>
        <span>{{item.type}}/USDT</span>
      </div>
      <div>
        <span>方向</span>
        <span :class="item.direction==1?'many':'null'">{{item.direction==1?'多':'空'}}</span>
      </div>
      <div>
        <span>盈亏</span>
        <span :class="item.direction==1?'many':'null'">{{item.profit}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all{
    width: auto;
    height: auto;
    padding: 15px;
    color: #FFF;
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .per{
      font-size: 13px;
      padding-bottom: 10px;
      margin-top: 25px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      border-bottom: 1px solid gray;
      font-weight: 600;
      padding: 10px;
      div{
        display: flex;
        justify-content: space-between;
        padding: 5px 0px;
        .many{
          color: #e84545;
        }
        .null{
          color: #00b8a9;
        }
      }

    }
}
</style>