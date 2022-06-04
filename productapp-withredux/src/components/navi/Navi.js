import React, { useState } from 'react'
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
import { AiOutlineStar } from "react-icons/ai";

const Navi = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">HK Market <AiOutlineStar/></NavbarBrand>
        <NavbarToggler onClick={() => setToggleMenu(!toggleMenu)} />
        <Collapse isOpen={toggleMenu} navbar>
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
