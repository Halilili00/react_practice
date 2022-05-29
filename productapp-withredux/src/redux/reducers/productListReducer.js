import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function productListReducer(state = initialState.products, action) {
    switch (action.type) {
        case actions.get_products_success:
            return action.payload
        case actions.create_product_success:
            return [...state,action.payload]
        case actions.update_product_success:
            return state.map(product => (product.id === action.payload.id ? action.payload : product))
        default:
            return state;
    }
}

/*case actions.update_product_success:
            return state.map(product => {
                if(product.id === action.payload.id) {
                    return {...product, ...action.payload}
                }
                else {
                    return product
                }
            })*/