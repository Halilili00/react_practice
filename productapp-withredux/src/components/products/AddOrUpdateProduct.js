import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { getCategories } from '../../redux/actions/categoryActions'
import { saveProduct, updateProduct } from '../../redux/actions/productActions'
import alertify from "alertifyjs";
import { useParams } from 'react-router-dom'
import FileBase from 'react-file-base64'
import './AddOrUpdateProduct.css'

const AddOrUpdateProduct = () => {
    const [postProduct, setpostProduct] = useState({})
    const categories = useSelector((state) => state.categoryListReducer);
    const param = useParams()
    const product = useSelector(state => param.productId ? state.productListReducer.products.find(p => p.id == param.productId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.length === 0)
            dispatch(getCategories())

        if (product)
            setpostProduct(product)
    }, [])

    const handleInputChange = event => {
        const { name, type, value } = event.target
        setpostProduct({
            ...postProduct, [name]: name === "categoryID" || type === "number"
                ? parseFloat(value, 10)
                : value
        })
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
            setpostProduct({})
        }
    }

    return (
        <div>
            {product ? <h2>Edit product</h2> : <h2>Add new product</h2>}
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Label for="category">Category</Label>
                    <Input type="select" required name="categoryID" value={postProduct.categoryID} onChange={handleInputChange}>
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
                    <Input type="text" name='name' required placeholder="Enter product name" value={postProduct.name || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Unit Price</Label>
                    <Input type="number" step={0.01} min={0} required placeholder="Enter unit price" name='unitPrice' value={postProduct.unitPrice || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Quantity Per Unit</Label>
                    <Input type="text" name='quantityPerUnit' placeholder="Enter quantity per unit" value={postProduct.quantityPerUnit || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Units in Stock</Label>
                    <Input type="number" min="0" required name='unitsInStock' placeholder="Enter units in stock" value={postProduct.unitsInStock || ''} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <FileBase type="img" multiple={false} name='productImage' onDone={({ base64 }) => base64.includes("data:image") ? setpostProduct({ ...postProduct, productImage: base64 }) : setpostProduct({ ...postProduct, productImage: '' })} />
                </FormGroup>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br />
                {postProduct.productImage && (
                    <img alt='Added img' src={postProduct.productImage} />)}
            </Form>
        </div>
    )
}

export default AddOrUpdateProduct
