<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const navList = ref([
  {
    icon: "http://localhost:5173/icon_5.png",
    title: "实名认证",
    path:"/verify"
  },
  {
    icon: "http://localhost:5173/icon_1.png",
    title: "安全中心",
    path:"/security"
  },
  {
    icon: "http://localhost:5173/icon_3.png",
    title: "银行卡管理",
    path:"/card"
  },
  {
    icon: "http://localhost:5173/icon_2.png",
    title: "仓位记录",
    path:"/position"
  },
  {
    icon: "http://localhost:5173/icon_7.png",
    title: "区块管理",
    path:"/block"
  },
  {
    icon: "http://localhost:5173/icon_6.png",
    title: "版本更新",
    path:"/version"
  },
  {
    icon: "http://localhost:5173/icon_4.png",
    title: "设置",
    path:"/setting"
  },
]);

const goTabs = (item) =>{
  router.push(item.path)
}
</script>

<template>
  <div class="mine">
    <div class="header">
      <span>我的</span>
    </div>
    <div class="banner">
      <img src="https://avatars.githubusercontent.com/u/128983356" alt="" />
      <span>ID: 106412</span>
      <span>信用分: 100</span>
    </div>
    <div class="box">
      <div class="per" v-for="(item, index) in navList" :key="index" @click="goTabs(item)">
        <div>
          <img :src="item.icon" alt="" />
          <span>{{ item.title }}</span>
        </div>
        <span class="material-symbols-outlined arrow"> arrow_forward_ios </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mine {
  width: auto;
  height: auto;
  color: #fff;
  padding-bottom: 120px;
  .header {
    text-align: center;
  }
  .banner {
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    span {
      margin: 5px 0px;
      color: #08d9d6;
    }
  }
  .box {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    background: #364f6b;
    padding: 15px;
    margin-top: 20px;
    font-size: 14px;
    border-radius: 5px;    
    .per {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0px;
      padding: 5px;
      div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
      }
      .arrow {
        font-size: 18px;
      }
    }
  }
}
</style>