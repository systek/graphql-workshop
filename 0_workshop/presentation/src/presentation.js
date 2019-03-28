import React from "react";

import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

import createTheme from "spectacle/lib/themes/default";

require("normalize.css");

const theme = createTheme(
  {
    primary: "white",
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
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            GraphQL workshop
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            quick intro so we can get started
          </Text>
        </Slide>
        <Slide bgColor="tertiary">
          <Text margin="10px 0 0" size={1} fit bold>
            TODO
          </Text>
        </Slide>
      </Deck>
    );
  }
}
