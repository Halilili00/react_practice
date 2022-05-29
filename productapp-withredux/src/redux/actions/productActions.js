import * as actions from "./actions"

export const getProductsSuccess = (products) => {
    return { type: actions.get_products_success, payload: products }
}

export const createProductSuccess = (product) => {
    return { type: actions.create_product_success, payload: product }
}

export const updateProductSuccess = (product) => {
    return { type: actions.update_product_success, payload: product }
}

export const getProducts = (categotyId) => {
    return (dispatch) => {
        let url = "http://localhost:3000/products"
        if (categotyId) {
            url = url + "?categoryID=" + categotyId;
        }
        fetch(url).then(response => response.json())
            .then(data => dispatch(getProductsSuccess(data)))
    }
}

export const saveProduct = (product) => async (dispatch) => {
    return fetch("http://localhost:3000/products/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => dispatch(createProductSuccess(data)))
}

export const updateProduct = (id, product) => async (dispatch) => {
    return fetch("http://localhost:3000/products/" + (id), {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => dispatch(updateProductSuccess(data)))
}