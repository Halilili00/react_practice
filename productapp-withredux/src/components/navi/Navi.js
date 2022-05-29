import React from 'react'
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import CartSummery from '../cart/CartSummery';

const Navi = () => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">HK Market</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="ml-auto" navbar style={{ "marginLeft": "auto" }}>
            <NavItem>
              <NavLink tag={Link} to="/add">Add product</NavLink>
            </NavItem>
            <CartSummery />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Navi
