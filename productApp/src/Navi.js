import {Grid, Toolbar, Typography, AppBar } from "@mui/material";
import React, { Component } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
                                <ShoppingCartIcon fontSize="large"/>{this.props.cart.length}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}