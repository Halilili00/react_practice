import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from 'reactstrap'
import { getProducts } from '../../redux/actions/productActions'
import { Table, Button } from 'reactstrap';
import { addToCart } from '../../redux/actions/cartActions'
import alertify from "alertifyjs";

const ProductList = () => {
  const currenCategory = useSelector(state => state.changeCategoryReducer);
  const products = useSelector(state => state.productListReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  const addItem = (product) => {
    dispatch(addToCart({quantity:1,product}))
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
          {currenCategory.name}
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
          {products.map(product => (
            <tr key={product.productID}>
              <th scope="row">{product.productID}</th>
              <td>{product.name}</td>
              <td>{product.unitPrice}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitsInStock}</td>
              <td>
                <Button onClick={() => addItem(product)} >Add</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductList
