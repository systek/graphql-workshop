import React from "react";

import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Image,
  Slide,
  Text
} from "spectacle";

import createTheme from "spectacle/lib/themes/default";

require("normalize.css");

const theme = createTheme(
  {
    primary: "#EEEEEE",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quaternary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["slide"]} transitionDuration={500} theme={theme}>
        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            GraphQL workshop
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            quick practical intro
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Quote>
            GraphQL is a query language for APIs and a runtime for fulfilling
            those queries with your existing data.
          </Quote>
          <Cite textColor="primary">GraphQL.org</Cite>
        </Slide>
      </Deck>
    );
  }
}
