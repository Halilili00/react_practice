import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function productListReducer(state = initialState.products, action){
    switch(action.type){
        case actions.get_products_success:
            return action.payload
        default:
            return state;
    }
}