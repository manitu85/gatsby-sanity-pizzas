import React from 'react';
import styled from 'styled-components';
import SinglePizza from './SinglePizza';

const PizzasList = ({ pizzas }) => {
  console.log('PIZZAS :>> ', pizzas);
  return (
    <PizzasGrid>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzasGrid>
  );
};

export default PizzasList;

const PizzasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 400px;
  grid-gap: 4rem;
`;
