import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.add_to_cart:
            let addedCartItem = state.cart.find(cartItem => cartItem.product.id === action.payload.product.id)
            if (addedCartItem) {
                let newState = state.cart.map(cartItem => {
                    if (cartItem.product.id === action.payload.product.id) {
                        //return {...addedCartItem, quantity:addedCartItem.quantity+1} -> we can use also this
                        return Object.assign({}, addedCartItem, { quantity: addedCartItem.quantity + 1 })
                    }
                    return cartItem;
                })
                return {
                    cart: newState,
                    totalSum: state.totalSum += action.payload.product.unitPrice
                }
            }
            else {
                return {
                    cart: [...state.cart, action.payload],
                    totalSum: state.totalSum += action.payload.product.unitPrice
                }
            }
        case actions.remove_from_cart:
            return {
                totalSum: state.totalSum -= action.payload.product.unitPrice * action.payload.quantity,
                cart: [...state.cart.filter(cartItem => cartItem.product.id !== action.payload.product.id)]
            }
        default:
            return state;
    }
}