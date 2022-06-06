import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { addToCart, removeFromCart, decrementQuantity } from '../../redux/actions/cartActions';
import alertify from 'alertifyjs';

const CartDetail = () => {
  const cart = useSelector(state => state.cartReducer.cart);
  const total = useSelector(state => state.cartReducer.totalSum)
  const dispatch = useDispatch();

  const deleteItem = (cartItem) => {
    dispatch(removeFromCart(cartItem))
    alertify.error(cartItem.product.name + " is deleted")
  }

  const increaseQantity = (product) => {
    dispatch(addToCart({ quantity: 1, product }))
  }

  const decrementquantity = (product) => {
    dispatch(decrementQuantity(product))
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(cartItem => (
            <tr key={cartItem.product.id}>
              <th scope="row">{cartItem.product.id}</th>
              <td>{cartItem.product.productImage && (<img className='product_img' src={cartItem.product.productImage} />)} {cartItem.product.name}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button onClick={() => increaseQantity(cartItem.product)}>+</Button>
                <Button onClick={() => decrementquantity(cartItem)}>-</Button>
                <Button onClick={() => deleteItem(cartItem)} >Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Cart sum: {total.toFixed(2)}</h2>
    </div>
  )
}

export default CartDetail


/*
Also can do this way but I want do it in reducer
{cartItem.quantity >0 
                ? <Button onClick={() => decrementquantity(cartItem)}>-</Button>
                : <Button disabled>-</Button>}*/