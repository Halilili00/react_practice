import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function cartReducer(state=initialState.cart, action){
    switch(action.type){
        case actions.add_to_cart:
            let addedCartItem = state.find(cartItem => cartItem.product.id === action.payload.product.id)
            if(addedCartItem){
                let newState = state.map(cartItem => {
                    if(cartItem.product.id === action.payload.product.id){
                        //return {...addedCartItem, quantity:addedCartItem.quantity+1} -> we can use also this
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
            return [...state.filter(cartItem => cartItem.product.id !== action.payload.product.id)]
        default:
            return state;
    }
}