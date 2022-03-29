import { Grid } from "@mui/material";
import React, { Component } from "react";
import Navi from "./components/Navi"
import CategoryList from "./components/CategoryList"
import ProductList from "./components/ProductList"
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import CartList from "./components/CartList";

export default class App extends Component {

  state = { currentCategory: "", products: [], cart: [] }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.name })
    this.getProducts(category.categoryID)
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = categoryID => {

    let url = "http://localhost:3000/products"
    if (categoryID) {
      url += "?categoryID=" + categoryID;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
  }

  addToCart = (product) => {
    let newCart = this.state.cart
    let addedItem = newCart.find(c => c.product.productID === product.productID)
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 })
    }
    this.setState({ cart: newCart })
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.productID !== product.productID)
    this.setState({ cart: newCart })
  }

  render() {
    let productInfo = { title: "Product list" };
    let categoryInfo = { title: "Category list" };
    return (
      <Grid container mr={5}>
        <Navi
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
        />
        <Grid container ml={5} mr={5} mt={10}>
          <Grid item xs={3} paddingRight={5}>
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={categoryInfo} />
          </Grid>
          <Grid item xs={9}>
            <Routes>
              <Route path="/" element={
                <ProductList
                  products={this.state.products}
                  currentCategory={this.state.currentCategory}
                  info={productInfo}
                  addToCart={this.addToCart} />
              }/>
              <Route path="/cart" element={
                <CartList
                  cart={this.state.cart}
                  removeFromCart={this.removeFromCart}
                  />
              }/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
