<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import { getDepth } from "@/api/coin.js";

import { onMounted } from "vue";

const showLeft = ref(false);

const route = useRouter();

const value = ref(10);

const activeBtn = ref("买入");

const position = ref(true);

const current = ref({
  type: "btc",
  price: "23462",
  parcent: "1.6%",
  up: 1,
});

const bids = ref([]);

const asks = ref([]);

const buyBtn = ref([
  {
    title: "买入",
    buy: 1,
  },
  {
    title: "卖出",
    buy: 0,
  },
]);

const positionList = ref([
  {
    type: "BTC",
    direction: 1,
    price: "26346",
    income: 3114,
  },
  {
    type: "ETH",
    direction: 1,
    price: "2346",
    income: 244,
  },
  {
    type: "DOGE",
    direction: 0,
    price: "0.046",
    income: 123,
  },
  {
    type: "APE",
    direction: 1,
    price: "4.16",
    income: 464,
  },
]);

const listData = ref([
  {
    type: "BTC",
    price: "32465.12",
    parcent: "+1.4%",
    up: 1,
  },
  {
    type: "ETH",
    price: "1654.15",
    parcent: "-0.14%",
    up: 1,
  },
  {
    type: "DOGE",
    price: "0.0134",
    parcent: "+1.55%",
    up: 0,
  },
  {
    type: "APE",
    price: "3.14",
    parcent: "-1.8%",
    up: 0,
  },
  {
    type: "BTC",
    price: "32465.12",
    parcent: "+1.4%",
    up: 1,
  },
  {
    type: "ETH",
    price: "1654.15",
    parcent: "-0.14%",
    up: 0,
  },
  {
    type: "DOGE",
    price: "0.0134",
    parcent: "+1.55%",
    up: 1,
  },
  {
    type: "APE",
    price: "3.14",
    parcent: "-1.8%",
    up: 1,
  },
]);

const clickBtn = (item) => {
  activeBtn.value = item.title;
};

const goAll = () => {
  route.push("/all");
};

const showList = () => {
  showLeft.value = true;
};

const changeCurrent = (item) => {
  current.value = item;
  showLeft.value = false;
};

const getData = async () => {
  const { data: res } = await getDepth(current.value.type);
  bids.value = res.tick.bids;
  asks.value = res.tick.asks;
};

onMounted(() => {
  getData();
});

setInterval(()=>{
  getData()
},2000)
</script>

<template>
  <div class="contract">
    <div class="header">
      <span>合约</span>
    </div>
    <div class="top">
      <div class="div1">
        <span class="material-symbols-outlined reorder" @click="showList">
          menu
        </span>
        <van-popup
          v-model:show="showLeft"
          position="left"
          :style="{ width: '70%', height: '100%', background: '#2d4059' }"
        >
          <div class="leftList">
            <div
              v-for="(item, index) in listData"
              :key="index"
              @click="changeCurrent(item)"
            >
              <span>{{ item.type }}/USDT</span>
              <span :class="item.up == 1 ? 'up' : 'down'">{{
                item.price
              }}</span>
              <span :class="item.up == 1 ? 'up' : 'down'">{{
                item.parcent
              }}</span>
            </div>
          </div>
        </van-popup>
        <span>{{ current.type.toUpperCase() }}/USDT</span>
        <p :class="current.up == 1 ? 'up' : 'down'">{{ current.parcent }}</p>
      </div>
      <div>
        <span class="material-symbols-outlined"> candlestick_chart </span>
      </div>
    </div>
    <div class="banner">
      <div class="left">
        <div class="left_top">
          <span>价格</span>
          <span>数量</span>
        </div>
        <div class="box">
          <div v-for="(item, index) in bids" :key="index">
            <span class="span1">{{ item[0] }}</span
            ><span>{{ parseFloat(item[1]).toFixed(3) }}</span>
          </div>
          <span class="mid">{{}}</span>
          <div v-for="(item, index) in asks" :key="index">
            <span class="span2">{{ item[0] }}</span
            ><span>{{ parseFloat(item[1]).toFixed(3) }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right_top">
          <button
            v-for="(item, index) in buyBtn"
            :key="index"
            :class="item.buy == 1 ? 'buy' : 'sell'"
            @click="clickBtn(item)"
          >
            {{ item.title }}
          </button>
        </div>
        <div class="lever">
          <p>请选择杠杆</p>
          <van-stepper v-model="value" step="10" />
        </div>
        <div class="num">
          <p>请输入交易数量 USDT</p>
          <input type="text" placeholder="0.000 USDT" />
        </div>
        <div class="btn">
          <p>可用 0.000 USDT</p>
          <button :class="activeBtn == '买入' ? 'buy' : 'sell'">
            {{ activeBtn }}
          </button>
        </div>
      </div>
    </div>
    <div class="entrust">
      <span>当前持仓</span>
      <div>
        <span class="material-symbols-outlined description" @click="goAll">
          description
        </span>
        <span>全部</span>
      </div>
    </div>
    <div class="position">
      <div v-if="position">
        <div class="per" v-for="(item, index) in positionList" :key="index">
          <div>
            <span>种类</span>
            <span>方向</span>
            <span>开仓价格</span>
            <span>收益</span>
          </div>
          <div>
            <span>{{ item.type }}/USDT</span>
            <span :class="item.direction == 1 ? 'many' : 'null'">{{
              item.direction == 1 ? "多" : "空"
            }}</span>
            <span>{{ item.price }}</span>
            <span :class="item.direction == 1 ? 'many' : 'null'">{{
              item.income
            }}</span>
          </div>
          <div>
            <button>止盈止损</button>
            <button>平仓</button>
          </div>
        </div>
      </div>
      <div v-else>
        <van-empty description="暂无持仓" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contract {
  width: auto;
  height: auto;
  color: #fff;
  padding-bottom: 70px;
  .header {
    text-align: center;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .div1 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .up {
        color: #00b8a9;
      }
      .down {
        color: #e84545;
      }
      .leftList {
        padding: 15px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        div {
          display: flex;
          justify-content: space-between;
          padding: 10px 0px;
          margin: 10px 0px;
          .up {
            color: #00b8a9;
          }
          .down {
            color: #e84545;
          }
        }
      }
      .reorder {
        margin-right: 5px;
        font-size: 22px;
      }
      span {
        font-size: 14px;
        font-weight: 600;
      }
      p {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
  .banner {
    width: auto;
    height: auto;
    margin: 15px 0px;
    display: flex;
    justify-content: space-around;
    .left {
      width: 45%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .left_top {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
      }
      .box {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        div {
          display: flex;
          justify-content: space-between;
          padding: 4px 0px;
        }
        .span1 {
          color: #00b8a9;
        }
        .span2 {
          color: #e84545;
        }
        .mid {
          font-weight: 500;
          font-size: 16px;
          margin: 3px 0px;
        }
      }
    }
    .right {
      width: 45%;
      height: auto;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .right_top {
        display: flex;
        justify-content: space-between;
        button {
          width: 45%;
          height: 35px;
          border: 0;
          border-radius: 2px;
          font-size: 14px;
        }
      }
      .lever {
        margin: 10px 0px;
        p {
          font-size: 12px;
          margin: 5px 0px;
        }
        :deep(.van-stepper__minus) {
          width: 25%;
          height: 35px;
        }
        :deep(.van-stepper__input) {
          width: 50%;
          margin: 0;
          height: 35px;
          font-weight: 600;
          color: #666;
        }

        :deep(.van-stepper__plus) {
          width: 25%;
          height: 35px;
        }
      }
      .num {
        p {
          font-size: 12px;
          margin: 5px 0px;
        }
        input {
          width: auto;
          height: 33px;
          border-radius: 2px;
          border: 0;
          padding-left: 15px;
          color: #666;
          font-weight: 600;
        }
      }
      .btn {
        width: auto;
        margin-top: 10px;
        p {
          font-size: 12px;
          margin: 5px 0px;
        }
        button {
          width: 100%;
          height: 35px;
          border: 0;
          border-radius: 2px;
        }
      }
    }
    .buy {
      background: #00b8a9;
    }
    .sell {
      background: #e84545;
    }
  }
  .entrust {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    div {
      display: flex;
      align-items: center;
    }
    .description {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .position {
    width: auto;
    height: auto;
    margin-top: 25px;
    .per {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 15px;
      background: #364f6b;
      font-size: 14px;
      margin-top: 20px;
      border-radius: 5px;
      div {
        display: flex;
        justify-content: space-between;
        padding: 8px 0px;
        span {
          width: 25%;
          text-align: center;
        }
        .many {
          color: #00b8a9;
        }
        .null {
          color: #e84545;
        }
        button {
          width: 25%;
          height: 25px;
          background: #11999e;
          border: 0;
          border-radius: 3px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>