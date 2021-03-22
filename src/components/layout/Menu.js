import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from 'components/logo';

const Menu = () => (
  <Nav>
    <NavList>
      <NavItem>
        <NavLink to="/">Hot now</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/pizzas">Pizza Menu</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/slicemasters">Slice Master</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/order">Order Ahead!</NavLink>
      </NavItem>
    </NavList>
  </Nav>
);

export default Menu;

const Nav = styled.nav`
  /* margin-bottom: 3rem; */
  .logo {
    transform: translateY(-25%);
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  text-align: center;
  list-style: none;

  display: grid;
  grid-template-columns: 1fr 1fr auto 1fr 1fr;
  grid-gap: 2rem;
  align-items: center;
`;

const NavItem = styled.li`
  --rotate: -2deg;
  transform: rotate(var(--rotate));
  order: 1;
  transition: all 0.2 ease;

  &:nth-child(1) {
    --rotate: 1deg;
  }

  &:nth-child(2) {
    --rotate: -2.5deg;
  }

  &:nth-child(4) {
    --rotate: 2.5deg;
  }

  &:hover {
    --rotate: 3deg;
  }
`;

const NavLink = styled(Link)`
  font-size: 3rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--red);
  }
`;
