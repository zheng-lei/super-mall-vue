<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="@/assets/img/detail/arrow_left.png" alt="">
          </div>
          <div slot="center" class="title">
              <div class="title-item"
                 v-for="(item,index) in titles"
                 :key="item"
                 :class="{active: index === currentIndex}"
                 @click="titleClick(index)">
                 {{item}}   
                </div>
                 
          </div>
      </nav-bar>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar.vue"
    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ["商品","参数","评论","推荐"],
                currentIndex: 0
            }
        },
        methods: {
            titleClick(index){
                this.currentIndex = index;
                this.$emit("titleClick",index);
            },
            backClick(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text)
    }
    .back img{
        height: 30px;
        width: 30px;
        margin-top: 7px;
    }
</style>