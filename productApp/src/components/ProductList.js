import React, { Component } from 'react'
import { Table, TableCell, TableContainer, Paper, TableBody, TableHead, TableRow, Button } from '@mui/material'

export default class ProductList extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.info.title}-{this.props.currentCategory}</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell variant='head'>#</TableCell>
                <TableCell variant='head'>Product Name</TableCell>
                <TableCell component="th">Unit Price</TableCell>
                <TableCell component="th">Quantity Per Unit</TableCell>
                <TableCell component="th">Units In Stock</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.products.map(product => (
                <TableRow
                  key={product.productID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="row">{product.productID}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>{product.quantityPerUnit}</TableCell>
                  <TableCell>{product.unitsInStock}</TableCell>
                  <TableCell><Button variant="outlined" onClick={()=>this.props.addToCart(product)}>Add</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div >
    )
  }
}
