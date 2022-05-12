import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { changeCategory, getCategories } from '../../redux/actions/categoryActions'

const CategoryList = (props) => {
    useEffect(() => (
        props.actions.getCategories()
    ), [])

    return (
        <div>
            <h3>Categories {props.categories.length}</h3>
            <ListGroup>
                {props.categories.map(category => (
                    <ListGroupItem onClick={() => props.actions.changeCategory(category)} key={category.categoryID}>
                        {category.name}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <h5>Secili kategori: {props.currenCategory.name}</h5>
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
