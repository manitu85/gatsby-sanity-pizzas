import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SinglePizza = ({ pizza }) => {
  console.log('SINGLE_PIZZA :>> ', pizza);
  return (
    <SinglePizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} />
    </SinglePizzaStyles>
  );
};

export default SinglePizza;

const SinglePizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-columns: subgrid) {
    --rows: auto auto 1fr;
  }
  // take grid rules from grandparent PizzaList
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
`;
