import * as actions from "./actions"

export const getProductsSuccess = (products) => {
    return { type: actions.get_products_success, payload: products}
}

export const getProducts = (categotyId) => {
    return (dispatch) => {
        let url = "http://localhost:3000/products"
        if(categotyId){
            url = url + "?categoryID=" + categotyId;
        }
        fetch(url).then(response => response.json())
            .then(data => dispatch(getProductsSuccess(data)))
    }
}