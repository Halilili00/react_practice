import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import { changeCategory } from '../../redux/actions/categoryActions'
import { getProducts } from '../../redux/actions/productActions'
import './CategoryList.css'
import { HiMenu } from "react-icons/hi";

const CategoryList = () => {
    const currenCategory = useSelector(state => state.changeCategoryReducer);
    const categories = useSelector((state) => state.categoryListReducer);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const selectCategory = (category) => {
        dispatch(changeCategory(category))
        dispatch(getProducts(category.categoryID))
    }

    return (
        <div>
            <div className='app_category'>
                <h3>
                    <Badge color='success'>Categories</Badge>

                </h3>
                <ListGroup>
                    {categories && categories.map(category => (
                        <ListGroupItem
                            active={category.categoryID === currenCategory.categoryID}
                            onClick={() => selectCategory(category)}
                            key={category.categoryID}
                        >
                            {category.name}
                        </ListGroupItem>
                    ))}
                    <ListGroupItem
                        active={currenCategory === ""}
                        onClick={() => selectCategory("")}
                    >
                        All
                    </ListGroupItem>
                </ListGroup>
            </div>
            <div className='app_category-smallscreen'>
                <h3>
                    <Badge className='badge_smallscreen' color='success' onClick={() => setIsOpen(!isOpen)}><span className='category'>Categories</span><HiMenu className="categoty_icon"/></Badge>
                </h3>
                {isOpen && (
                    <ListGroup>
                        {categories && categories.map(category => (
                            <ListGroupItem
                                active={category.categoryID === currenCategory.categoryID}
                                onClick={() => selectCategory(category)}
                                key={category.categoryID}
                            >
                                {category.name}
                            </ListGroupItem>
                        ))}
                        <ListGroupItem
                            active={currenCategory === ""}
                            onClick={() => selectCategory("")}
                        >
                            All
                        </ListGroupItem>
                    </ListGroup>
                )}
            </div>
        </div>
    )
}

export default CategoryList
