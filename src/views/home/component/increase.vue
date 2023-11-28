<script setup>
import { onMounted, ref } from "vue";
import { getDetail } from "@/api/coin.js";

const typeList = ref([
  {
    type:"btc",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"eth",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"sol",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"doge",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"aca",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"stc",
    price:"",
    parcent:"",
    up:0
  },
  {
    type:"atom",
    price:"",
    parcent:"",
    up:0
  }

]);

const getData = () => {
  typeList.value.forEach(async item => {
    const { data: res } = await getDetail(item.type);
    console.log(res)
    item.parcent = ((parseFloat(res.tick.close)-parseFloat(res.tick.open))/parseFloat(res.tick.open)).toFixed(4)*100
    item.price = res.tick.close
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
},1000*10)
</script>

<template>
  <div class="increase">
    <div v-for="(item, index) in typeList" :key="index">
      <span class="span1"
        >{{ item.type.toUpperCase() }}
        <p>/USDT</p></span
      >
      <span class="span2" :class="item.up == '1' ? 'up' : 'down'">{{
        item.price
      }}</span>
      <span class="span3">
        <button :class="item.up == '1' ? 'up_btn' : 'down_btn'">
          {{ parseFloat(item.parcent).toFixed(2)}}%
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