import alertify from 'alertifyjs';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';
import { removeFromCart } from '../../redux/actions/cartActions';
import './CartSummery.css'

const CartSummery = () => {
    const cart = useSelector(state => state.cartReducer.cart)
    const totalSum = useSelector(state => state.cartReducer.totalSum)

    const dispatch = useDispatch()

    const deleteItem = (cartItem) => {
        dispatch(removeFromCart(cartItem))
        alertify.error(cartItem.product.name + " is deleted")
    }

    const renderEmpty = () => {
        return (
            <div>
                <NavItem>
                    <NavLink>Cart is empty</NavLink>
                </NavItem>
            </div>
        )
    }

    const renderSummery = () => {
        return (
            <UncontrolledDropdown nav inNavbar direction="right">
                <DropdownToggle nav caret>
                    Cart
                </DropdownToggle>
                <DropdownMenu end className='cart_dropdown-menu'>
                    {
                        cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.id}>
                                <Badge color='danger' onClick={() => deleteItem(cartItem)}>Delete</Badge>
                                {cartItem.product.name} <Badge color='success'>{cartItem.quantity}</Badge>
                            </DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem><Link to={"/cart"}>Cart detail</Link><span className='totalsum'> {totalSum.toFixed(2)}</span></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    return (
        <div>
            {cart.length > 0 ? renderSummery() : renderEmpty()}
        </div>
    )
}

export default CartSummery
