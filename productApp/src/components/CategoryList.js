import { Table, TableContainer, Paper, TableCell, TableRow, TableHead } from "@mui/material";
import React, { Component } from "react";

export default class CategoryList extends Component {
    state = {
        categories: []
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }))
    }

    render() {
        return (
            <div>
                <h2>{this.props.info.title}</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {
                                this.state.categories.map(category => (
                                    <TableRow
                                        onClick={() => this.props.changeCategory(category)}
                                        key={category.categoryID}
                                    >
                                        <TableCell>{category.name}</TableCell>
                                    </TableRow>
                                ))
                            }
                            <TableRow onClick={() => this.props.changeCategory("")}><TableCell>All</TableCell></TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}