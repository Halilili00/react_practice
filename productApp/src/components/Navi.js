import {Grid, Toolbar, Typography, AppBar } from "@mui/material";
import React, { Component } from "react";
import CartSummary from "./CartSummary";

export default class Navi extends Component {

    render() {
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Grid container m={2}>
                            <Grid item>
                                <Typography variant="h4">ProductApp</Typography>
                            </Grid>
                            <Grid item ml={5} sx={{ marginLeft: 'auto' }}>
                                <CartSummary removeFromCart={this.props.removeFromCart} cart={this.props.cart}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}