<script setup>
import { ref } from "vue";

const dataList = ref([
  {
    type: "BTC",
    price: "26485.21",
    parcent: "+1.89%",
    up: 1,
  },
  {
    type: "ETH",
    price: "2136",
    parcent: "+2.89%",
    up: 1,
  },
  {
    type: "APE",
    price: "1.41",
    parcent: "-2.10%",
    up: 0,
  },
  {
    type: "SOL",
    price: "57.45",
    parcent: "-2.15%",
    up: 0,
  },
  {
    type: "DOGE",
    price: "0.024",
    parcent: "+1.64%",
    up: 1,
  },
]);
</script>

<template>
  <div class="increase">
    <div v-for="(item, index) in dataList" :key="index">
      <span class="span1"
        >{{ item.type }}
        <p>/USDT</p></span
      >
      <span class="span2" :class="item.up == 1 ? 'up' : 'down'">{{
        item.price
      }}</span>
      <span class="span3">
        <button :class="item.up == 1 ? 'up_btn' : 'down_btn'">
          {{ item.parcent }}
        </button>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.increase {
  width: auto;
  height: auto;
  padding-bottom: 70px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    span {
      width: 33%;
      font-size: 13px;
      font-weight: 600;
    }
    .span1 {
      display: flex;
      p {
        color: #ccc;
      }
    }
    .span2 {
      text-align: center;
    }
    .span3 {
      text-align: right;
      button {
        width: 65px;
        height: 30px;
        border: 0;
        border-radius: 2px;
        font-weight: 500;
      }
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