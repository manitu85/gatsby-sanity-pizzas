import React from 'react';
import { graphql } from 'gatsby';
import PizzasList from 'components/pizzas/PizzasList';
import ToppingsFilter from 'components/toppingsFilter';
import SEO from 'components/seo/Seo';

const PizzasPage = ({ data, pageContext }) => {
  // console.log('SANITY_PIZZAS :>> ', data.pizzas);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzasList pizzas={pizzas} />
    </>
  );
};

export default PizzasPage;

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
