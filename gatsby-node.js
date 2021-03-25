import path, { resolve } from 'path';
import fetch from 'isomorphic-unfetch';

// Function signature
const turnPizzasIntoPages = async ({ graphql, actions: { createPage } }) => {
  // 1. get pizza template
  const pizzaTemplate = resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const res = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and creat page for that pizza
  const pizzas = res.data.pizzas.nodes;
  // console.log(pizzas);

  pizzas.forEach((pizza) => {
    // console.log('Creating page for:', pizza.name);
    createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

// #############################################################################

const turnToppingsIntoPages = async ({ graphql, actions: { createPage } }) => {
  // get template, same as pizzaTemplate
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the toppings
  const res = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  const toppings = res.data.toppings.nodes;
  // console.log(toppings);

  // createPages for that topping
  toppings.forEach((topping) => {
    // console.log('Creating page for:', topping.name);
    createPage({
      path: `/topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};

// #############################################################################

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: 2. Turn each slicemaster into their own page (TODO)

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page!
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: resolve('./src/pages/slicemasters.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};
// #############################################################################

const fetchBeesAndTurnIntoNodes = async ({
  createNodeId,
  createContentDigest,
  actions: { createNode },
}) => {
  // 1. Fetch the list of beers
  const res = await fetch(process.env.GATSBY_API_URL);
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    createNode({
      ...beer,
      ...nodeMeta,
    });
  }
};

// #############################################################################

export const sourceNodes = async (params) => {
  // fetch a list of beers and source them into gatsby api
  await Promise.all([fetchBeesAndTurnIntoNodes(params)]);
};

// #############################################################################

// In params lives all node functions
export const createPages = async (params) => {
  // console.log('params', params);
  // create pages dynamically
  // wait for all promises to be resolved before finishing all pages
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};

// #############################################################################

// Config absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
