import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { changeCategory, getCategories } from '../../redux/actions/categoryActions'

const CategoryList = (props) => {
    useEffect(() => (
        props.actions.getCategories()
    ), [])

    const selectCategory = (category) => {
        props.actions.changeCategory(category)
    }

    return (
        <div>
            <h3>
                <Badge color='success'>Categories</Badge>
            </h3>
            <ListGroup>
                {props.categories.map(category => (
                    <ListGroupItem
                        active={category.categoryID === props.currenCategory.categoryID}
                        onClick={() => selectCategory(category)}
                        key={category.categoryID}
                    >
                        {category.name}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currenCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        getCategories: bindActionCreators(getCategories, dispatch),
        changeCategory: bindActionCreators(changeCategory, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
