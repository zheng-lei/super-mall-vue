import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types"
export default {
    addCart(context, payLoad){
        console.log(context,payLoad)
        //payLoad新添加的商品
        let oldProduct = null;
        for(let item of context.state.cartList){
            if(item.iid === payLoad.iid) {
                oldProduct = item;
            }
        }
        //判断oldProduct
        if(oldProduct) {
            context.commit(ADD_COUNTER, oldProduct);
        }else {
            payLoad.count = 1;
            context.commit(ADD_TO_CART, payLoad);
        }
        
    }
}