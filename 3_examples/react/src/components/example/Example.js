import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const exampleQuery = gql`
  query IngredientsList {
    ingredients {
      id
      name
    }
  }
`;

const Example = () => (
  <Query query={exampleQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.ingredients.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
      ));
    }}
  </Query>
);

export default Example;
