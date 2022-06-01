import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function productListReducer(state = initialState, action) {
    switch (action.type) {
        case actions.get_products_success:
            return {products: action.payload}
        case actions.create_product_success:
            return {products: [...state.products,action.payload]}
        case actions.update_product_success:
            return {products: state.products.map(product => (product.id === action.payload.id ? action.payload : product))}
        default:
            return state;
    }
}