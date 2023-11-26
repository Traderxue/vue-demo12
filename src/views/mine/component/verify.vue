<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const goBack = ()=>{
    router.back()
}
</script>

<template>
  <div class="verify">
    <div class="header">
      <span class="material-symbols-outlined" @click="goBack"> arrow_back_ios </span>
      <span>实名认证</span><span></span>
    </div>
    <div class="box">
        <div>
            <span>姓名</span><input type="text" placeholder="请输入姓名">
        </div>
        <div>
            <span>身份证号</span><input type="text" placeholder="请输入身份证号码">
        </div>
            <button>立即验证</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.verify{
    color: #FFF;
    width: auto;
    height: auto;
    padding: 15px;
    .header{
        display: flex;
        justify-content: space-between;
    }
    .box{
        margin-top: 40px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        div{
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0px;
            input{
                height: 30px;
                padding-left: 15px;
                font-size: 14px;
                font-weight: 600;
                color: #F5F5F5;
                background: #2d4059;
                border: 0;
                border-bottom: 1px solid #FFF;
            }
        }
        button{
            margin-top: 20px;
            width: 50%;
            height: 40px;
            background:linear-gradient(to right,#f6416c,#08d9d6);
            border: 0;
            border-radius: 2px;
            font-size: 13px;
        }
    }
}
</style>