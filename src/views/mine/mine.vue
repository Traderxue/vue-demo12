<template>
    <div class="mine">
        <div class="header">
            <span>我的</span>
        </div>
        <div class="banner">
            <img src="https://avatars.githubusercontent.com/u/128983356" alt="">
            <span>ID: 106412</span>
            <span>信用分: 100</span>
        </div>
        <div class="box">
            <div class="per">
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mine{
    width: auto;
    height: auto;
    color: #FFF;
    .header{
        text-align: center;
    }
    .banner{
        width: auto;
        height: auto;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
        img{
            width: 70px;
            height: 70px;
            border-radius: 50%;            
            margin-bottom: 20px;
        }
        span{
            margin: 5px 0px;
        }
    }
}
</style>