import * as actions from "./actions"

export const changeCategory = (category) => {
    return { type: actions.change_category, payload: category }
}

export const getCategoriesSuccess = (categories) => {
    return { type: actions.get_categories_succes, payload: categories }
}

export const getCategories = () => {
    return (dispatch) => {
        let url = "http://localhost:3000/categories"
        fetch(url).then(response => response.json())
            .then(data => dispatch(getCategoriesSuccess(data)))
    }
}