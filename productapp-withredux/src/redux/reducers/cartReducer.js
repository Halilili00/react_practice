import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function cartReducer(state=initialState.cart, action){
    switch(action.type){
        case actions.add_to_cart:
            let addedCartItem = state.find(cartItem => cartItem.product.productID === action.payload.product.productID)
            if(addedCartItem){
                let newState = state.map(cartItem => {
                    if(cartItem.product.productID === action.payload.product.productID){
                        return Object.assign({},addedCartItem,{quantity:addedCartItem.quantity+1})
                    }
                    return cartItem;
                })
                return newState
            }
            else{
                return [...state, action.payload]
            }
        case actions.remove_from_cart:
            return [...state.filter(cartItem => cartItem.product.productID !== action.payload.product.productID)]
        default:
            return state;
    }
}