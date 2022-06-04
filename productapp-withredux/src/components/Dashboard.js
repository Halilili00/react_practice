import React from 'react'
import { Col, Row } from 'reactstrap'
import CategoryList from './categories/CategoryList'
import ProductList from './products/ProductList'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div className='app_col'>
        <Row>
          <Col xs={3}>
            <CategoryList/>
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
