import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Col, Row, Table, Button, ListGroup, ListGroupItem } from 'reactstrap'
import { addToCart } from '../../redux/actions/cartActions'
import alertify from "alertifyjs";
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import './ProductList.css'
import { getProducts } from '../../redux/actions/productActions'

const ProductList = () => {
  const currenCategory = useSelector(state => state.changeCategoryReducer);
  const products = useSelector(state => state.productListReducer.products);
  const [favorite, setFavorite] = useState(() => {
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  })
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorite))
  }, [favorite])

  const addItem = (product) => {
    dispatch(addToCart({ quantity: 1, product }))
    alertify.success(product.name + " is added in cart")
  }

  const addfavorite = (product) => {
    setFavorite([...favorite, product])
    alertify.notify("Added to favorites")
  }

  const deleteFromFavorite = (product) => {
    setFavorite([...favorite.filter(o => o.id !== product.id)])
    alertify.warning("Deleted from favorites")
  }

  const selectSort = (sort) => {
    dispatch(getProducts(currenCategory.categoryID, sort))
  }

  return (
    <div>
      <Row>
        <Col xs={8}>
          {currenCategory
            ? <h3><Badge color='warning'>Products</Badge>-<Badge>{currenCategory.name}</Badge></h3>
            : <h3><Badge color='warning'>Products</Badge></h3>}
        </Col>
        <Col xs={4}>
          <Button className='short_button' onClick={() => setIsOpen(!isOpen)}><span>sort by: </span><BiSortAlt2 className='sort_icon'/></Button>
          {isOpen && (
            <ListGroup>
              <ListGroupItem className='Sort_listItem' onClick={() => {selectSort('unitPrice'); setIsOpen(!isOpen)}}>Price: Low to High</ListGroupItem>
              <ListGroupItem className='Sort_listItem' onClick={() => {selectSort('unitPrice&_order=desc'); setIsOpen(!isOpen)}}>Price: High to Low</ListGroupItem>
            </ListGroup>
          )}
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity Per Unit</th>
            <th>Units in Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td><Link to={"/add/" + product.id}>{product.productImage && (<img alt='product img' className='product_img' src={product.productImage} />)}</Link> <Link to={"/add/" + product.id}>{product.name}</Link></td>
              <td>{product.unitPrice}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitsInStock}</td>
              <td>
                <Button onClick={() => addItem(product)} >Add</Button>
              </td>
              <td>
                {favorite.find(o => o.id === product.id)
                  ? <AiFillStar style={{ 'color': 'yellow' }} className='product-favorite' onClick={() => deleteFromFavorite(product)} />
                  : <AiOutlineStar className='product-favorite' onClick={() => addfavorite(product)} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  )
}

export default ProductList
