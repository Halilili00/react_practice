import * as actions from "./actions";

export const addToCart = (cartItem) => {
    return {type: actions.add_to_cart, payload:cartItem}
}

export const removeFromCart = (cartItem) => {
    return {type: actions.remove_from_cart, payload:cartItem}
}