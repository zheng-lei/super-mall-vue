<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span></span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            goods: {
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
.info-title{
    margin: 15px 10px 15px 10px;
}
.info-price{
    margin: 0 10px 20px 10px;
}
.info-price .n-price{
    font-size: 26px;
    color: var(--color-tint);
    margin-right: 5px;
}
.info-price .o-price{
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
}
.info-other{
    padding: 0px 10px 5px 10px;
    display: flex;
    border-bottom: 1px solid #eee;
}
.info-other span{
    flex: 1;
    text-align: center;
    color: #999;
    font-size: 14px;
}
.info-service{
    padding: 20px 10px;
    border-bottom: 4px solid #eee;
    display: flex;
}
.info-service-item{
    flex: 1;
    font-size: 14px;
}
.info-service-item img{
    height: 16px;
}
</style>