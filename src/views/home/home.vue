<script setup>
import { onMounted, ref } from "vue";
import i18n from "@/lang/index.js";
import { useRouter } from "vue-router";
import { getDetail } from "@/api/coin.js";

const route = useRouter();

const showLeft = ref(false);

const showTop = ref(false);

const lang = ref("zh");

const active = ref("涨幅榜")

const dealData = ref([
    {
        title:"涨幅榜",
        path:"/increase"
    },
    {
        title:"成交额榜",
        path:"/deal"
    }
])


const navList = ref([
  {
    icon: "verified_user",
    title: "身份验证",
    path: "/verify",
  },
  {
    icon: "account_balance_wallet",
    title: "账户中心",
    path: "/account",
  },
  {
    icon: "list_alt",
    title: "收款方式",
    path: "/collection",
  },
  {
    icon: "support_agent",
    title: "咨询客服",
    path: "/service",
  },
  {
    icon: "info",
    title: "关于我们",
    path: "/info",
  },
]);

const langList = ref([
  {
    title: "简体中文",
    lang: "zh",
  },
  {
    title: "繁体中文",
    lang: "zh_hk",
  },
  {
    title: "English",
    lang: "en",
  },
]);

const tabList = ref([
  {
    type: "btc",
    price: "",
    parcent: "",
    price_cny: "",
    up: 0,
  },
  {
    type: "eth",
    price: "",
    parcent: "",
    price_cny: "",
    up: 0,
  },
  {
    type: "bch",
    price: "",
    parcent: "",
    price_cny: "",
    up: 0,
  },
]);

const showPopup = () => {
  showLeft.value = true;
};

const showLang = () => {
  showTop.value = true;
};

const changeLang = (item) => {
  i18n.global.locale = item.lang;
  lang.value = item.lang;
  showTop.value = false;
};

const dealDataList = (item)=>{
    active.value = item.title
    route.push(item.path)
}

const getData = () => {
  tabList.value.forEach(async item => {
    const { data: res } = await getDetail(item.type);
    console.log(res)
    item.parcent = ((parseFloat(res.tick.close)-parseFloat(res.tick.open))/parseFloat(res.tick.open)).toFixed(4)*100
    item.price = res.tick.close
    item.price_cny = parseFloat(item.price).toFixed(2)*7
    if(parseFloat(item.parcent)>0){
      item.up=1
    }
  })
};

onMounted(()=>{
  getData()
})

setInterval(()=>{
  getData()
},1000*15)
</script>

<template>
  <div class="home">
    <div class="header">
      <span class="material-symbols-outlined" @click="showPopup"> menu </span>
      <van-popup
        v-model:show="showLeft"
        position="left"
        :style="{ width: '60%', height: '100%' }"
      >
        <div class="showLeft">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/24/20/44/coins-1857222_640.png"
            alt=""
          />
          <div class="login_div">
            <h3>点击登录</h3>
            <p>欢迎来到MTBC</p>
          </div>
          <div class="nav">
            <div v-for="(item, index) in navList" :key="index">
              <span class="material-symbols-outlined"> {{ item.icon }} </span>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </van-popup>
      <span>{{$t("home.title")}}</span>
      <span class="material-symbols-outlined" @click="showLang">
        language
      </span>

      <van-popup
        v-model:show="showTop"
        position="top"
        :style="{ height: '30%' }"
      >
        <div class="showTop">
          <div
            v-for="(item, index) in langList"
            :key="index"
            @click="changeLang(item)"
          >
            <span>{{ item.title }}</span
            ><span class="material-symbols-outlined" v-show="item.lang == lang">
              check
            </span>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="http://localhost:5173/banner1.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://localhost:5173/banner2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://localhost:5173/banner3.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      text="2023年11月26日，新币上线，xx科技高峰论坛/新品发布会"
      background="#2d4059"
      color="#f6f6f6"
    />
    <div class="tab">
      <div v-for="(item, index) in tabList" :key="index">
        <span class="span1">{{ item.type.toUpperCase() }}/USDT</span>
        <span class="span2" :class="item.up == 1 ? 'up' : 'down'">{{
          parseFloat(item.price).toFixed(2)
        }}</span>
        <span class="span3" :class="item.up == 1 ? 'up' : 'down'">{{
          parseFloat(item.parcent).toFixed(2)
        }}%</span>
        <span class="span4">≈ {{ parseFloat(item.price_cny).toFixed(2) }} CNY</span>
      </div>
    </div>
    <div class="quickly">
      <div class="left">
        <div>
          <h3>法币交易</h3>
          <p>支持USDT</p>
        </div>
        <img src="http://localhost:5173/img_2.png" alt="" />
      </div>
      <div class="right">
        <div class="top">
            <span>快捷买币</span>
            <img src="http://localhost:5173/buy_1.png" alt="">
        </div>
        <div class="bottom">
            <span>大宗交易</span>
            <img src="http://localhost:5173/buy_2.png" alt="">
        </div>
      </div>
    </div>
    <div class="deal">
        <span v-for="(item,index) in dealData" :key="index" :class="active==item.title?'active':''" @click="dealDataList(item)">{{item.title}}</span>
    </div>
    <div class="box">
        <RouterView/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: auto;
  height: auto;
  color: #fff;
  .header {
    width: auto;
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-popup {
      background: #2d4059;
      padding: 30px;
      .showLeft {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-top: 40px;
        img {
          width: 50px;
          height: 50px;
          margin-bottom: 15px;
        }
        .login_div {
          h3 {
            font-size: 17px;
            margin-bottom: 5px;
          }
          p {
            margin-top: 5px;
            font-size: 12px;
          }
        }
        .nav {
          margin-top: 35px;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          div {
            display: flex;
            align-items: center;
            margin: 10px 0px;
            span {
              margin: 0px 10px;
            }
          }
        }
      }
      .showTop {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0px;
        }
      }
    }
  }
  .banner {
    width: auto;
    height: 160px;
    margin: 15px 0px;
    img {
      width: 100%;
      height: 160px;
      border-radius: 5px;
    }
  }
  .tab {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      background: #364f6b;
      padding: 5px 13px;
      border-radius: 2px;
      span {
        margin: 3px 0px;
        font-weight: 600;
        font-size: 14px;
      }
      .up {
        color: #00b8a9;
      }
      .down {
        color: #e84545;
      }
      .span1 {
        font-weight: 500;
      }
      .span4 {
        font-weight: 500;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .quickly {
    display: flex;
    justify-content: space-around;
    height: 125px;
    margin-top: 20px;
    .left {
      width: 50%;
      padding: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #364f6b;
      border-radius: 2px;
      p{
        margin-top: 5px;
        font-size: 13px;
      }
      img {
        right: 10%;
        top: 30px;
        width: 60px;
        height: 60px;
      }
    }
    .right {
      width: 40%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      div{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 45%;
        background: #364f6b;
        padding: 0px 15px ;
        border-radius: 2px;
        span{
            font-size: 13px;
        }
        img{
            width: 30px;
            height: 30px;
        }
      }
    }
  }
  .deal{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    .active{
        color: #f9ed69;
    }
  }
  .box{
    padding: 15px;
  }
}
</style>