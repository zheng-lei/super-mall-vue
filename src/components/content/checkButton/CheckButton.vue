<template>
    <div id="checkBox">
        <div class="icon-check" :class="{'check': isChecked}">
            <img src="~/assets/img/cart/tick.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isChecked: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    methods: {
        
    }
}
</script>

<style>
    #checkBox {
        display: flex;
        align-items: center;
    }
    .icon-check {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #ccc;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon-check img {
        height: 20px;
    }
    .check {
        background-color: #ff8198;
        border-color: #ff8198;
    }
</style>