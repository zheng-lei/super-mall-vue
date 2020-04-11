<template>
  <div class="goods-list-item">
      <img :src="goodsItem.show.img" alt="">
      <div>
            <p class="title">{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
          
      </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style>
    .goods-list-item{
        width: calc((100% - 30px) / 2);
        font-size: 14px;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: center;
    }
    .goods-list-item>img{
        width: 100%;
        border-radius: 2px;
    }
    .goods-list-item .title{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .goods-list-item .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-list-item .collect{
        position: relative;
    }
    .goods-list-item .collect::before{
        content: "";
        position: absolute;
        left: -15px;
        top: 0px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/star.png") 0 0/14px 14px;
    }
</style>