<script setup>
import { ref } from "vue";
import { getDetail } from "@/api/coin.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";


const router = useRouter()

const typeList = ref([
 
  {
    type: "eth",
    price: "",
    parcent: "",
    up: 0,
  },
  {
    type: "ape",
    price: "",
    parcent: "",
    up: 0,
  },
  {
    type: "clv",
    price: "",
    parcent: "",
    up: 0,
  },
]);

const getData = () => {
  typeList.value.forEach(async item => {
    const { data: res } = await getDetail(item.type);
    item.parcent = ((parseFloat(res.tick.close)-parseFloat(res.tick.open))/parseFloat(res.tick.open)).toFixed(4)*100
    item.price = res.tick.close
    if(parseFloat(item.parcent)>0){
      item.up=1
    }
  })
};

const goChart = (item)=>{
  router.push({
    path:"/chart",
    query:item
  })
}

onMounted(() => {
  getData()
});

setInterval(()=>{
  getData()
},1000*50)
</script>

<template>
  <div class="deals">
    <div v-for="(item, index) in typeList" :key="index"  @click="goChart(item)">
      <span class="span1"
        >{{ item.type.toUpperCase() }}
        <p>/USDT</p></span
      >
      <span class="span2" :class="item.up == 1 ? 'up' : 'down'">{{
        parseFloat(item.price)
      }}</span>
      <span class="span3">
        <button :class="item.up == 1 ? 'up_btn' : 'down_btn'">
          {{ parseFloat(item.parcent).toFixed(2) }}%
        </button>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.deals {
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