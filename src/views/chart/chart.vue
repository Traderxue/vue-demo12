<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getKline, getDetail } from "@/api/coin.js";
import { init, dispose, registerIndicator } from "klinecharts";

const router = useRouter();
const route = useRoute();

const type = route.query.type;

const chart = ref(null);

const active = ref("1min");

const bannerList = ref({
  current: "",
  vol: "",
  high: "",
  low: "",
  parcent: "",
  up: "0",
});

const timeList = ref([
  {
    time: "1M",
    period: "1min",
  },
  {
    time: "5M",
    period: "5min",
  },
  {
    time: "15M",
    period: "15min",
  },
  {
    time: "30M",
    period: "30min",
  },
  {
    time: "1H",
    period: "60min",
  },
  {
    time: "4H",
    period: "4hour",
  },
  {
    time: "1D",
    period: "1day",
  },
]);

const goBack = () => {
  router.back();
};

const getBannerData = async () => {
  const { data: res } = await getDetail(type);
  // bannerList.value.current = res.tick.close;
  bannerList.value.vol = parseFloat(res.tick.vol).toFixed(2);
  bannerList.value.high = res.tick.high;
  bannerList.value.low = res.tick.low;
  // bannerList.value.parcent =
  //   ((res.tick.close - res.tick.open) / res.tick.open).toFixed(4) * 100;
  // if (parseFloat(bannerList.value.parcent) > 0) {
  //   bannerList.value.up = 1;
  // }
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
  xAxis: {
    show: true,
    size: "auto",
    // x轴线
    axisLine: {
      show: true,
      color: "#888888",
      size: 1,
    },
    // x轴分割文字
    tickText: {
      show: true,
      color: "#888888",
      family: "Helvetica Neue",
      weight: "normal",
      size: 12,
      marginStart: 6,
      marginEnd: 6,
    },
    // x轴分割线
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: "#888888",
    },
  },
  yAxis: {
    show: true,
    size: "auto",
    // 'left' | 'right'
    position: "right",
    // 'normal' | 'percentage' | 'log'
    type: "normal",
    inside: false,
    reverse: false,
    // y轴线
    axisLine: {
      show: true,
      color: "#888",
      size: 1,
    },
    // x轴分割文字
    tickText: {
      show: true,
      color: "#888",
      family: "Helvetica Neue",
      weight: "normal",
      size: 12,
      marginStart: 6,
      marginEnd: 6,
    },
    // x轴分割线
    tickLine: {
      show: true,
      size: 1,
      length: 5,
      color: "#888",
    },
  },
  separator: {
    size: 1,
    color: "#888",
    fill: true,
    activeBackgroundColor: "rgba(230, 230, 230, .15)",
  },
};

const dataList = ref([]);

const klineData = async () => {
  const { data: res } = await getKline(type, active.value);
  const arr = res.data.reverse();
  arr.forEach((item) => {
    bannerList.value.current = item.close;
    bannerList.value.parcent =
      ((item.close - item.open) / item.open).toFixed(4) * 100;
    if (parseFloat(bannerList.value.parcent) > 0) {
      bannerList.value.up = 1;
    }
    return dataList.value.push({
      close: item.close,
      high: item.high,
      low: item.low,
      open: item.open,
      timestamp: item.id * 1000,
      volume: item.vol,
    });
  });
  charts.applyNewData(dataList.value);
};

onMounted(() => {
  getBannerData();
  klineData();

  charts = init(chart.value);

  charts.setStyles(option);
  charts.createIndicator("VOL");
  charts.setPriceVolumePrecision(4, 2);
  charts.applyNewData(dataList.value);
});

const changeTime = (item) => {
  active.value = item.period;
  klineData();
  charts.applyNewData(dataList.value);
};

setInterval(() => {
  klineData();
}, 5000);
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
      <div :class="bannerList.up == '1' ? 'up' : 'down'">
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
      <span
        v-for="(item, index) in timeList"
        :key="index"
        :class="active == item.period ? 'active' : ''"
        @click="changeTime(item)"
        >{{ item.time }}</span
      >
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
  .time {
    padding: 10px 0px;
    margin: 15px 0px;
    display: flex;
    justify-content: space-around;
    .active {
      color: #3490de;
    }
  }
}
</style>