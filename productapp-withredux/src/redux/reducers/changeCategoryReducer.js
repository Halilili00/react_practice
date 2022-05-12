import * as actions from "../actions/actions"
import initialState from "./initialState";

export default function changeCategoryReducer(state=initialState.currentCategory, action){
    switch(action.type){
        case actions.change_category:
            return action.payload
        default:
            return state;
    }
}