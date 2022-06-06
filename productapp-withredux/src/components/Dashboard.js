import React, { useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import CategoryList from './categories/CategoryList'
import ProductList from './products/ProductList'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../redux/actions/categoryActions'
import { getProducts } from '../redux/actions/productActions'

const Dashboard = () => {
  const currenCategory = useSelector(state => state.changeCategoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts(currenCategory.categoryID));
  }, [])

  return (
    <div>
      <div className='app_col'>
        <Row>
          <Col xs={3}>
            <CategoryList />
          </Col>
          <Col xs={9}>
            <ProductList />
          </Col>
        </Row>
      </div>
      <div className='app_dasboard-smallscreen'>
        <CategoryList />
        <ProductList />
      </div>
    </div>
  )
}

export default Dashboard
