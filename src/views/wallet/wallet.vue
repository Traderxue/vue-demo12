<script setup>
import { ref } from "vue";

const dataList = ref([
    {
        type:"BTC",
        amount:"1.55",
        num:"22464"
    },
    {
        type:"ETH",
        amount:"1.55",
        num:"3464"
    },
    {
        type:"SOL",
        amount:"5.55",
        num:"224"
    },
    {
        type:"DOGE",
        amount:"242155",
        num:"124"
    },
    {
        type:"APE",
        amount:"1.75",
        num:"2142"
    },
    {
        type:"MINA",
        amount:"525",
        num:"22"
    },
])
</script>

<template>
  <div class="wallet">
    <div class="header">
      <span>钱包</span>
    </div>
    <div class="banner">
        <span class="span1">总资产折合(USDT)</span>
        <h3>46424 USDT</h3>        
        <span class="span2">≈201244.28 CNY</span>
    </div>  
    <div class="box" v-for="(item,index) in dataList" :key="index">
        <div>
            <span >{{item.type}}/USDT</span>
            <span style="text-align: center;">冻结</span>
            <span style="text-align: right;">可用</span>
        </div>
        <div>
            <span>{{item.amount}}</span>
            <span style="text-align: center;">0.0000</span>
            <span style="text-align: right;">{{item.amount}}</span>
        </div>
        <div>
            <span>{{item.num}}USDT</span>
            <span style="text-align: center;">0.0000</span>
            <span style="text-align: right;">{{item.num}}</span>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wallet {
  width: auto;
  height: auto;
  color: #fff;
  padding-bottom: 70px;
  .header {
    width: auto;
    height: auto;
    text-align: center;
  }
  .banner{
    margin-top: 15px;
    height: 140px;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    background: linear-gradient(to right bottom,#00b8a9,#3d84a8);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .span1{
        font-size: 14px;
    }
    .span2{
        font-size: 12px;
        color: #CCC;
    }
  }
  .box{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-top: 20px;
    border-radius: 5px;
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #364f6b;
        padding: 10px 20px;
        span{
            width: 33%;
        }
    }
  }
}
</style>