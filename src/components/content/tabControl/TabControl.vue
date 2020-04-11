<template>
    <div class="tab-control">
        <div v-for="(item,index)  in titles" :key="item" 
            class="tab-control-item" :class="{active: index === currentIndex}" 
            @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index){
                this.currentIndex = index;
                this.$emit("itemClick",index);
            }
        }

    }
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
    }
    .tab-control .tab-control-item{
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .tab-control .tab-control-item span{
        padding: 5px;
    }
    .active span{
        color: var(--color-high-text);
        border-bottom: 3px solid var(--color-tint);
    }
</style>