<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="titles" @itemClick="itemClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="wrapper-content" ref="scroll" :probe-type=
    "3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="titles" @itemClick="itemClick" ref="tabControl2"></tab-control>
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
  import {debounce} from "common/utils.js";
  import TabControl from "components/content/tabControl/TabControl"
  import {itemListenerMixin} from "common/mixin"
  
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
      mixins: [itemListenerMixin],
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
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0,
        }
      },
      computed: {
        showGoods(){
          return this.goods[this.currentType].list;
        }
      },
      activated() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,0);
        
      },
      deactivated() {
        //1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY();
        //2.取消全局事件的监听
        this.$bus.$off("itemImageLoad",this.itemImageListener);
      },
      created() {
        //1.请求多个数据
        this.getHomeMultidata();
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
      },
      mounted() {
        
        
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
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        backClick() {
          this.$refs.scroll.scrollTo(0,0,500)
        },
        contentScroll(position) {
          //1.判断BackTop是否显示
          this.isShowBackTop = -position.y > 1000 ? true : false;
          //2.决定tabControl是否吸顶position:fixed
          this.isTabFixed = (-position.y) > this.tabOffsetTop;
        },
        loadMore() {
          this.getHomeGoods(this.currentType);
        },
        swiperImageLoad() {
          //2.获取tabControl的offsetTop
          //所有的组件都有一个属性$el:用于获取组件中的元素
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
          
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
            //完成上拉加载更多
            this.$refs.scroll.finishPullUp();
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
  }
  .wrapper-content{
    /* margin-top: 44px; */
    height: calc(100% - 93px);
    overflow: hidden;
  }
  .tab-control{

  }
</style> 