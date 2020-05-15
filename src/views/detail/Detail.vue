<template>
  <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar"
    import DetailSwiper from "./childComps/DetailSwiper"
    import DetailBaseInfo from "./childComps/DetailBaseInfo"
    import DetailShopInfo from "./childComps/DetailShopInfo"
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
    import DetailParamInfo from "./childComps/DetailParamInfo"
    import DetailCommentInfo from "./childComps/DetailCommentInfo"
    import DetailBottomBar from "./childComps/DetailBottomBar"

    import Scroll from "components/common/scroll/Scroll"
    import GoodsList from "components/content/goods/GoodsList"

    import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
    import {debounce} from "common/utils"
    import {itemListenerMixin} from "common/mixin"
    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar
        },
        mixins: [itemListenerMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeY: null,
                currentIndex: 0
            }
        },
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid;
            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                const data = res.result;
                //1.获取顶部的图片轮播图数据
                this.topImages = data.itemInfo.topImages;
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo);
                //4.获取商品详情信息
                this.detailInfo = data.detailInfo;
                //5.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
                //6.取出评论信息
                if(data.rate.cRate != 0){
                    this.commentInfo = data.rate.list[0];
                }
                this.$nextTick(() => {
                    //根据最新的数据，对应的DOM是已经被渲染出来
                    //但是图片依然是没有加载完（目前获取到offsetTop不包含图片）
                    this.themeTopYs = [];
                    this.themeTopYs.push(0);
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
                });
                
            })
            //3.请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list;
            })
            //4.给getThemeY赋值
            this.getThemeY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
            },50)
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh();
                this.getThemeY();
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500);
            },
            contentScroll(position) {
                //1.获取y值
                const positionY = -position.y;
                //2.positionY和themeTopY中值进行对比
                for(let i = 0;i < this.themeTopYs.length;i++){
                    if((this.currentIndex != i) && ((i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i == this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]))){
                        this.currentIndex = i;
                        console.log(this.currentIndex)
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }
            },
            addToCart() {
                //1.获取购物车需要展示的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                //2.将商品添加到购物车
                this.$store.dispatch('addCart', product);
            }
        },
        mounted() {
            
        },
        updated() {
            // this.themeTopYs = [];
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        },
        destroyed() {
            this.$bus.$off("itemImageLoad", this.itemImageListener);
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>