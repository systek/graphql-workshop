import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const exampleQuery = gql`
  query IngredientsList {
    ingredients {
      id
      name
    }
  }
`;

const Example = () => {
  const query = useQuery(exampleQuery);

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Example</h3>
      {query.data.ingredients.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Example;
