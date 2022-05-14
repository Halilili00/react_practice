import alertify from 'alertifyjs';
import React from 'react'
import { connect } from 'react-redux';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../../redux/actions/cartActions';

const CartSummery = (props) => {

    const removeFromCart = (cartItem) => {
        props.actions.removeFromCart(cartItem)
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
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Cart
                </DropdownToggle>
                <DropdownMenu end>
                    {
                        props.cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.productID}>
                                <Badge color='danger' onClick={() => removeFromCart(cartItem)}>Delete</Badge>
                                {cartItem.product.name}
                                <Badge color='success'>{cartItem.quantity}</Badge>
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    return (
        <div>
            {props.cart.length > 0 ? renderSummery() : renderEmpty()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cartReducer
})

const mapDispatchToProps = (dispatch) => ({
    actions:{
        removeFromCart: bindActionCreators(removeFromCart, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartSummery)
