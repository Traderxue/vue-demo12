<script setup>
import { ref } from "vue";
import i18n from "@/lang/index.js"

const showLeft = ref(false);

const showTop = ref(false);

const lang = ref("zh");

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
        title:"简体中文",
        lang:"zh"
    },
    {
        title:"繁体中文",
        lang:"zh_hk"
    },
    {
        title:"English",
        lang:"en"
    }
])

const showPopup = () => {
  showLeft.value = true;
};

const showLang = () => {
  showTop.value = true;
};

const changeLang = (item) =>{
    i18n.global.locale = item.lang
    lang.value = item.lang    
    showTop.value = false
}
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
      <span>首页</span>
      <span class="material-symbols-outlined" @click="showLang">
        language
      </span>

      <van-popup
        v-model:show="showTop"
        position="top"
        :style="{ height: '30%' }"
      >
      <div class="showTop">
            <div v-for="(item,index) in langList" :key="index" @click="changeLang(item)">
                <span>{{item.title}}</span><span class="material-symbols-outlined" v-show="(item.lang==lang)"> check </span>
            </div>
      </div>
      </van-popup>
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
        div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0px;
        }
      }
    }
  }
}
</style>