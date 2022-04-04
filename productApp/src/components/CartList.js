import { TableBody, TableCell, TableRow, TableContainer, Paper, Table, TableHead, Button, Typography } from '@mui/material'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CartList extends Component {

    renderCart() {
        return (
            <div>
                <Typography variant='h5' align='right' mt={5}><Link to="/">Go to product list</Link></Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">#</TableCell>
                                <TableCell component="th">Category Id</TableCell>
                                <TableCell component="th">Product Name</TableCell>
                                <TableCell component="th">Unit Price</TableCell>
                                <TableCell component="th">Units In Stock</TableCell>
                                <TableCell component="th">Quantity</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.cart.map(cartItem => (
                                <TableRow key={cartItem.product.productID}>
                                    <TableCell component="th" scope="row">{cartItem.product.productID}</TableCell>
                                    <TableCell>{cartItem.product.categoryID}</TableCell>
                                    <TableCell>{cartItem.product.name}</TableCell>
                                    <TableCell>{cartItem.product.unitPrice}</TableCell>
                                    <TableCell>{cartItem.product.unitsInStock}</TableCell>
                                    <TableCell>{cartItem.quantity}</TableCell>
                                    <TableCell>
                                        <Button color="warning" variant="outlined" onClick={() => this.props.removeFromCart(cartItem.product)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderCart()}
            </div>
        )
    }
}
