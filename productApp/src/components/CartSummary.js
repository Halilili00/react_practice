import { Badge, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { Component } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from 'reactstrap';

export default class CartSummary extends Component {
    render() {
        return (
            <div>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel><ShoppingCartIcon fontSize="large"/>{this.props.cart.length}</InputLabel>
                    {this.props.cart.length > 0 ? 
                    <Select>
                        {this.props.cart.map(cartItem => (
                            <MenuItem key={cartItem.product.productID}>
                                <Button onClick={()=> this.props.removeFromCart(cartItem.product)}>X</Button>
                                {cartItem.product.name}
                                <Badge badgeContent={cartItem.quantity} color="primary"></Badge>
                            </MenuItem>
                        ))}
                    </Select>
                        : <div></div>}

                </FormControl>

            </div>
        )
    }
}
