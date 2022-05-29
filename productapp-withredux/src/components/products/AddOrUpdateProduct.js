import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { getCategories } from '../../redux/actions/categoryActions'
import { saveProduct, updateProduct } from '../../redux/actions/productActions'
import alertify from "alertifyjs";
import { useParams } from 'react-router-dom'

const AddOrUpdateProduct = () => {
    const [postProduct, setpostProduct] = useState({})
    const categories = useSelector((state) => state.categoryListReducer);
    const param = useParams()
    const product = useSelector(state => param.productId ? state.productListReducer.find(p => p.id == param.productId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.length === 0)
            dispatch(getCategories())

        if (param.productId)
            setpostProduct(product)
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target
        setpostProduct({ ...postProduct, [name]: name === "categoryID" ? parseInt(value, 10) : value })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(postProduct)
        if (param.productId) {
            dispatch(updateProduct(param.productId, postProduct))
            alertify.success("Product is updated")
        }
        else {
            dispatch(saveProduct(postProduct))
            alertify.success("New product is added")
        }
    }
    return (
        <div>
            <h2>Add new product</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Label for="category">Category</Label>
                    <Input type="select" name="categoryID" value={postProduct.categoryID} onChange={handleInputChange}>
                        <option></option>
                        {categories.map(category => (
                            <option value={category.categoryID} key={category.categoryID}>
                                {category.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Product name</Label>
                    <Input type="text" name='name' placeholder="Enter product name" value={postProduct.name || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Unit Price</Label>
                    <Input type="text" name='unitPrice' placeholder="Enter unit price" value={postProduct.unitPrice || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Quantity Per Unit</Label>
                    <Input type="text" name='quantityPerUnit' placeholder="Enter quantity per unit" value={postProduct.quantityPerUnit || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Units in Stock</Label>
                    <Input type="text" name='unitsInStock' placeholder="Enter units in stock" value={postProduct.unitsInStock || ''} onChange={handleInputChange} />
                </FormGroup>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddOrUpdateProduct
