import { Grid } from "@mui/material";
import React, { Component } from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";

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

  render() {
    let productInfo = { title: "Product list" };
    let categoryInfo = { title: "Category list" };
    return (
      <Grid container mr={5}>
        <Navi
          cart={this.state.cart}
        />
        <Grid container ml={5} mr={5} mt={10}>
          <Grid item xs={3} paddingRight={5}>
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={categoryInfo} />
          </Grid>
          <Grid item xs={9}>
            <ProductList
              products={this.state.products}
              currentCategory={this.state.currentCategory}
              info={productInfo}
              addToCart={this.addToCart} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
