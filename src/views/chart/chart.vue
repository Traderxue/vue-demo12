<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getKline, getDetail } from "@/api/coin.js";
import { init, dispose } from "klinecharts";

const router = useRouter();
const route = useRoute();

const type = route.query.type;

const chart = ref(null);

const bannerList = ref({
  current: "",
  vol: "",
  high: "",
  low: "",
  parcent: "",
  up: 0,
});

const timeList = ref([
  {
    time: "1M",
    period:"1min"
  },
  {
    time: "5M",
    period:"5min"
  },
  {
    time: "15M",
    period:"15min"
  },
  {
    time: "30M",
    period:"30min"
  },
  {
    time: "1H",
    period:"60min"
  },
  {
    time: "4H",
    period:"4hour"
  },
  {
    time: "1D",
    period:"1day"
  },
]);

const goBack = () => {
  router.back();
};

const getBannerData = async () => {
  const { data: res } = await getDetail(type);
  console.log(res);
  bannerList.value.current = res.tick.close;
  bannerList.value.vol = parseFloat(res.tick.vol).toFixed(2);
  bannerList.value.high = res.tick.high;
  bannerList.value.low = res.tick.low;
  bannerList.value.parcent =
    ((res.tick.close - res.tick.open) / res.tick.open).toFixed(4) * 100;
  if (parseFloat(bannerList.value.parcent) > 0) {
    bannerList.value.up = 1;
  }
};

let charts;

const option = {
  grid: {
    show: false,
    horizontal: {
      show: true,
      size: 1,
      color: "#EDEDED",
      style: "dashed",
      dashedValue: [2, 2],
    },
  },
};

onMounted(() => {
  getBannerData();
  console.log(route.query);

  charts = init(chart.value);

  charts.setStyles(option)

  charts.applyNewData([
    {
      close: 4976.16,
      high: 4977.99,
      low: 4970.12,
      open: 4972.89,
      timestamp: 1587660000000,
      volume: 204,
    },
    {
      close: 4977.33,
      high: 4979.94,
      low: 4971.34,
      open: 4973.2,
      timestamp: 1587660060000,
      volume: 194,
    },
    {
      close: 4977.93,
      high: 4977.93,
      low: 4974.2,
      open: 4976.53,
      timestamp: 1587660120000,
      volume: 197,
    },
    {
      close: 4966.77,
      high: 4968.53,
      low: 4962.2,
      open: 4963.88,
      timestamp: 1587660180000,
      volume: 28,
    },
    {
      close: 4961.56,
      high: 4972.61,
      low: 4961.28,
      open: 4961.28,
      timestamp: 1587660240000,
      volume: 184,
    },
    {
      close: 4964.19,
      high: 4964.74,
      low: 4961.42,
      open: 4961.64,
      timestamp: 1587660300000,
      volume: 191,
    },
    {
      close: 4968.93,
      high: 4972.7,
      low: 4964.55,
      open: 4966.96,
      timestamp: 1587660360000,
      volume: 105,
    },
    {
      close: 4979.31,
      high: 4979.61,
      low: 4973.99,
      open: 4977.06,
      timestamp: 1587660420000,
      volume: 35,
    },
    {
      close: 4977.02,
      high: 4981.66,
      low: 4975.14,
      open: 4981.66,
      timestamp: 1587660480000,
      volume: 135,
    },
    {
      close: 4985.09,
      high: 4988.62,
      low: 4980.3,
      open: 4986.72,
      timestamp: 1587660540000,
      volume: 76,
    },
  ]);
});
</script>

<template>
  <div class="chart">
    <div class="header">
      <span class="material-symbols-outlined arrow" @click="goBack">
        arrow_back_ios
      </span>
      <span>{{ type.toUpperCase() }}/USDT</span>
      <span></span>
    </div>
    <div class="banner">
      <div :class="bannerList.up == 1 ? 'up' : 'down'">
        <h3>{{ bannerList.current }}</h3>
        <p>{{ parseFloat(bannerList.parcent).toFixed(2) }}%</p>
      </div>
      <div>
        <span>最高价</span>
        <span>最低价</span>
        <span>成交量</span>
      </div>
      <div>
        <span>{{ bannerList.high }}</span>
        <span>{{ bannerList.low }}</span>
        <span>{{ bannerList.vol }}</span>
      </div>
    </div>
    <div class="time">
      <span v-for="(item,index) in timeList" :key="index">{{item.time}}</span>
    </div>
    <div class="chart_box">
      <div ref="chart" style="width: 100%; height: 500px"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: auto;
  height: auto;
  padding: 15px;
  color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow {
      font-size: 22px;
    }
  }
  .banner {
    margin: 15px 0px;
    font-size: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    div {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      span {
        padding: 5px 0px;
      }
      h3 {
        padding-bottom: 10px;
        font-size: 18px;
      }
      p {
        font-size: 18px;
        font-weight: 600;
      }
    }
    .up {
      color: #00b8a9;
    }
    .down {
      color: #e84545;
    }
  }
  .time{
    padding: 10px 0px;
    margin: 15px 0px;
    display: flex;
    justify-content: space-around;
  }
}
</style>