<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () =>{
    router.back()
}
</script>

<template>
    <div class="security">
        <div class="header">
            <span class="material-symbols-outlined" @click="goBack"> arrow_back_ios </span>
            <span>安全中心</span><span></span>
        </div>
        <div class="banner">
            <span>安全中心</span>
        </div>
        <div class="secur">
            <span>安全中心</span> <span style="color: #00b8a9;margin-left: 5px;">高</span>
        </div>
        <div class="box">
            <div><span>手机</span><span>未绑定</span></div>
            <div><span>邮箱</span><span>xxx@qq.com</span></div>
        </div>
        <p>修改密码</p>
        <div class="pwd">
            <div><span>旧密码</span><input type="text" placeholder="请输入旧密码"></div>
            <div><span>新密码</span><input type="text" placeholder="请输入新密码"></div>
        </div>
        <div class="btn">
            <button>修改密码</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.security{
    width: auto;
    height: auto;
    padding: 15px;
    color: #FFF;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .banner{
        margin-top: 50px;
        margin-bottom: 20px;
        span{
            font-size: 22px;
        }
    }
    .secur{
        display: flex;
        align-items: center;
        padding: 10px 0px;
        border-bottom: 2px solid #00b8a9;
        span{
            margin-right: 10px;
        }
    }
    .box{
        margin: 35px 0px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        div{
            display: flex;
            justify-content: space-between;
            margin: 10px 0px;
            padding: 10px 0px;
            border-bottom: 1px solid gray;
        }
    }
    p{
        color: #CCC;
        font-size: 14px;
    }
    .pwd{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        font-size: 15px;
        div{
            display: flex;
            align-items: center;
            margin-top: 25px;
            span{
                font-size: 14px;
                margin-right: 25px;
            }
            input{
                padding-left: 15px;
                font-size: 14px;
                height: 30px;
                width: 70%;
                border: 0;
                color: #FFF;
                background: #2d4059;
                border-bottom: 1px solid gray;
            }
        }
    }
    .btn{
        margin-top: 35px;
        text-align: center;
        button{
            width: 60%;
            height: 40px;
            border-radius: 2px;
            background: linear-gradient(to right,#f6416c,#08d9d6);
            border: 0;
        }
    }
}
</style>