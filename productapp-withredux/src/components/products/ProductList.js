import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { getProducts } from '../../redux/actions/productActions'
import { Table } from 'reactstrap';

const ProductList = (props) => {
  useEffect(() => {
    props.actions.getProducts();
  }, [])

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
    getProducts: bindActionCreators(getProducts, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
