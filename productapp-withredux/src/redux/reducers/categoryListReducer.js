import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function categoryListReducer(state=initialState.categories, action){
    switch(action.type){
        case actions.get_categories_succes:
            return action.payload
        default:
            return state;
    }
}