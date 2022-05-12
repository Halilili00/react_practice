import * as actions from "./actions"

export function changeCategory(category) {
    return { type: actions.change_category, payload: category }
}

export function getCategoriesSuccess(categories) {
    return { type: actions.get_categories_succes, payload: categories }
}

export function getCategories() {
    return async (dispatch)  => {
        let url = "http://localhost:3000/categories"
        return fetch(url).then(response => response.json())
            .then(data => dispatch(getCategoriesSuccess(data)))
    }
}