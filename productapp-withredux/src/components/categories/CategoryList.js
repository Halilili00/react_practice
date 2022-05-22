import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import { changeCategory, getCategories } from '../../redux/actions/categoryActions'
import { getProducts } from '../../redux/actions/productActions'

const CategoryList = () => {
    const currenCategory = useSelector(state => state.changeCategoryReducer);
    const categories = useSelector((state) => state.categoryListReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    const selectCategory = (category) => {
        dispatch(changeCategory(category))
        dispatch(getProducts(category.categoryID))
    }

    return (
        <div>
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
                    active={currenCategory===""}
                    onClick={() => selectCategory("")}
                >
                    All
                </ListGroupItem>
            </ListGroup>
        </div>
    )
}

export default CategoryList
