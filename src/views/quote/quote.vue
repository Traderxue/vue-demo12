<script setup>
import { ref } from "vue";
import { getDetail } from "@/api/coin.js";
import { onMounted } from "vue";

const dataList = ref([
  {
    type: "sylo",
    volume: "2445.12",
    price: "1.164",
    parcent: "+1.62%",
    up: 0,
  },
  {
    type: "zig",
    volume: "2462",
    price: "24653.15",
    parcent: "+0.62%",
    up: 0,
  },
  {
    type: "wallet",
    volume: "2342",
    price: "1545.12",
    parcent: "-2.1%",
    up: 0,
  },
  {
    type: "hbb",
    volume: "34644",
    price: "2.2",
    parcent: "-2.2%",
    up: 0,
  },
  {
    type: "kok",
    volume: "55445.12",
    price: "57.13",
    parcent: "-1.12%",
    up: 0,
  },
  {
    type: "kct",
    volume: "20445.12",
    price: "64",
    parcent: "+1.62%",
    up: 1,
  },
  {
    type: "smt",
    volume: "2445.12",
    price: "1.164",
    parcent: "+1.62%",
    up: 0,
  },
  {
    type: "baby",
    volume: "2462",
    price: "24653.15",
    parcent: "+0.62%",
    up: 0,
  },
  {
    type: "sc",
    volume: "2342",
    price: "1545.12",
    parcent: "-2.1%",
    up: 0,
  },
  {
    type: "arix",
    volume: "34644",
    price: "2.2",
    parcent: "-2.2%",
    up: 0,
  },
  {
    type: "rly",
    volume: "55445.12",
    price: "57.13",
    parcent: "-1.12%",
    up: 0,
  },
  {
    type: "velo",
    volume: "20445.12",
    price: "64",
    parcent: "+1.62%",
    up:0,
  },
]);

const getData = () => {
  dataList.value.forEach(async item => {
    const { data: res } = await getDetail(item.type);
    item.parcent = ((parseFloat(res.tick.close)-parseFloat(res.tick.open))/parseFloat(res.tick.open)).toFixed(4)*100
    item.price = res.tick.close
    item.volume = parseFloat(res.tick.amount).toFixed(2)
    if(parseFloat(item.parcent)>0){
      item.up=1
    }
  })
};

onMounted(() => {
  getData()
});

setInterval(()=>{
  getData()
},1000*50)
</script>

<template>
  <div class="quote">
    <div class="header">
      <span>行情</span>
    </div>
    <div class="title">
      <span>名称</span><span style="text-align: center">最新价</span
      ><span style="text-align: right">涨跌幅</span>
    </div>
    <div class="box" v-for="(item, index) in dataList" :key="index">
      <div class="div1">
        <span>{{ item.type.toUpperCase() }}/USDT</span>
        <p>24H量{{ item.volume }}</p>
      </div>
      <div style="text-align: center">
        <span :class="item.up == 1 ? 'up' : 'down'">{{ parseFloat(item.price) }}</span>
      </div>
      <div style="text-align: right">
        <button :class="item.up == 1 ? 'up_btn' : 'down_btn'">
          {{ parseFloat(item.parcent).toFixed(2)}}%
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quote {
  width: auto;
  height: auto;
  padding-bottom: 65px;
  color: #fff;
  .header {
    text-align: center;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin: 15px 0px;
    span {
      width: 33%;
    }
  }
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
    div {
      width: 33%;
      margin: 10px 0px;
      padding: 5px 0px;
    }
    .div1 {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      span {
        font-size: 14px;
      }
      p {
        font-size: 12px;
        color: #888;
      }
    }
    button {
      width: 65px;
      height: 32px;
      border: 0;
      border-radius: 2px;
      font-weight: 500;
    }
    .up {
      color: #00b8a9;
    }
    .down {
      color: #e84545;
    }
    .up_btn {
      background: #00b8a9;
    }
    .down_btn {
      background: #e84545;
    }
  }
}
</style>