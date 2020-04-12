<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type=
    "3" @scroll="contentScroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="titles" @itemClick="itemClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll.vue";
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import TabControl from "components/content/tabControl/TabControl"
  
  export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList,
        TabControl,
        Scroll,
        BackTop
      },
      data() {
        return {
          banners: [],
          recommends: [],
          titles: ["流行","新款","精选"],
          goods: {
            "pop": { page: 0, list: [] },
            "new": { page: 0, list: [] },
            "sell": { page: 0, list: [] }
          },
          currentType: "pop",
          isShowBackTop: false
        }
      },
      computed: {
        showGoods(){
          return this.goods[this.currentType].list;
        }
      },
      created() {
        //1.请求多个数据
        this.getHomeMultidata();
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
      },
      methods: {
        // 事件监听相关
        itemClick(index) {
          switch(index){
            case 0:
              this.currentType = "pop";
              break;
            case 1:
              this.currentType = "new";
              break;
            case 2:
              this.currentType = "sell";
              break;
          }
        },
        backClick() {
          this.$refs.scroll.scrollTo(0,0,500)
        },
        contentScroll(position) {
          console.log(position)
          this.isShowBackTop = -position.y > 1000 ? true : false;
        },
        // 网络请求相关
        getHomeMultidata() {
          getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1;
          getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;
          });
        }
      }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
  .content{
    margin-top: 44px;
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style> 