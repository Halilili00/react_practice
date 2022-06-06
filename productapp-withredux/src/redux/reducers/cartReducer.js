import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.add_to_cart:
            let addedCartItem = state.cart.find(cartItem => cartItem.product.id === action.payload.product.id)
            if (addedCartItem && addedCartItem.product.unitsInStock - addedCartItem.quantity > 0) {
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
            else if (action.payload.product.unitsInStock > 0) {
                if (!addedCartItem) {
                    return {
                        cart: [...state.cart, action.payload],
                        totalSum: state.totalSum += action.payload.product.unitPrice
                    }
                }
                else {
                    return {
                        cart: state.cart,
                        totalSum: state.totalSum
                    }
                }
            }
            else {
                return {
                    cart: state.cart,
                    totalSum: state.totalSum
                }
            }
        case actions.remove_from_cart:
            return {
                totalSum: state.totalSum -= action.payload.product.unitPrice * action.payload.quantity,
                cart: [...state.cart.filter(cartItem => cartItem.product.id !== action.payload.product.id)]
            }
        case actions.decrement_quantity:
            let decrementCartItem = state.cart.find(cartItem => cartItem.product.id === action.payload.product.id)
            if (decrementCartItem.quantity > 0) {
                let newState = state.cart.map(cartItem => {
                    if (cartItem.product.id === action.payload.product.id && cartItem.quantity !== 0) {
                        return Object.assign({}, cartItem, { quantity: cartItem.quantity - 1 })
                    }
                    return cartItem
                })
                return {
                    cart: newState,
                    totalSum: state.totalSum -= action.payload.product.unitPrice
                }
            }
            else {
                return {
                    cart: [...state.cart.filter(cartItem => cartItem.product.id !== action.payload.product.id)],
                    totalSum: state.totalSum
                }
            }
        default:
            return state;
    }
}