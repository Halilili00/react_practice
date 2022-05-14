import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { getProducts } from '../../redux/actions/productActions'
import { Table, Button } from 'reactstrap';
import { addToCart } from '../../redux/actions/cartActions'
import alertify from 'alertifyjs'

const ProductList = (props) => {
  useEffect(() => {
    props.actions.getProducts();
  }, [])

  const addToCart = (product) => {
    props.actions.addToCart({quantity:1,product})
    alertify.success(product.name + " is added in cart")
  }

  return (
    <div>
      <h3>
        <Badge color='warning'>
          Products
        </Badge>
        -
        <Badge>
          {props.currenCategory.name}
        </Badge>
      </h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity Per Unit</th>
            <th>Units in Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map(product => (
            <tr key={product.productID}>
              <th scope="row">{product.productID}</th>
              <td>{product.name}</td>
              <td>{product.unitPrice}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitsInStock}</td>
              <td>
                <Button onClick={() => addToCart(product)} >Add</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currenCategory: state.changeCategoryReducer,
  products: state.productListReducer
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getProducts: bindActionCreators(getProducts, dispatch),
    addToCart: bindActionCreators(addToCart, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
