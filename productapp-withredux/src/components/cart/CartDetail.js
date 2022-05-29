import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { removeFromCart } from '../../redux/actions/cartActions';
import alertify from 'alertifyjs';

const CartDetail = () => {
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const deleteItem = (cartItem) => {
    dispatch(removeFromCart(cartItem))
    alertify.error(cartItem.product.name + " is deleted")
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
              <td>{cartItem.product.name}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button onClick={() => deleteItem(cartItem)} >Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CartDetail
