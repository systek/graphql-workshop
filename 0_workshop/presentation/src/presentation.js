import React from 'react'

import { Appear, BlockQuote, Cite, Deck, Heading, ListItem, List, Quote, Image, Slide, Text, CodePane } from 'spectacle'

import createTheme from 'spectacle/lib/themes/default'

require('normalize.css')

const theme = createTheme(
  {
    primary: '#EEEEEE',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  },
)

const code = {
  graphql: `{
  thing {
    name
    value
    location
  }
}`,
  graphql_res: `{
  "thing": {
    "name": "Very cool thing",
    "value": 199,
    "location": "Somewhere"
  }
}`,
  nested: `{
  "thing": {
    "name": "Very cool thing",
    "value": 199,
    "owner": {
      "name": "Per Son",
      "country": {
        "name": "Norway",
        "region": "Nordic",
        "climate": "Cold"
      }
    }
  }
}`,
  multiple: `{
  "thing": {
    "name": "Very cool thing",
    "value": 199
  },
  "weather": {
    "current": "Sunny",
    "tomorrow": "Rain"
  }
}`,
  schema: `type Query {
  thing(id: Int!): Thing
  weather(location: String!): Weather
}

type Thing {
  name: String!
  value: Int
  location: String
  owner: [Person]!
}

type Person {
  name: String!
  country: Country!
}

type Country {
  name: String!
  region: String!
  climate: Climate!
  weather: Weather
}

type Weather {
  current: String!
  tomorrow: String
}
`,
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={['slide']} transitionDuration={500} theme={theme}>
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
            GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
          </Quote>
          <Cite textColor="primary">GraphQL.org</Cite>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} lineHeight={1} textColor="primary">
            Get exactly what you ask for
          </Heading>
          <Appear>
            <div>
              <Text textColor="primary">Request</Text>
              <CodePane lang="graphql" source={code.graphql} theme="dark" />
            </div>
          </Appear>
          <Appear>
            <div>
              <Text textColor="primary">Response</Text>
              <CodePane lang="json" source={code.graphql_res} theme="dark" />
            </div>
          </Appear>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} lineHeight={1} textColor="primary">
            Ask for multiple resources in a single request
          </Heading>
          <Appear>
            <div>
              <Text textColor="primary">Deeply nested values </Text>
              <CodePane lang="json" source={code.nested} theme="dark" />
            </div>
          </Appear>
          <Appear>
            <div>
              <Text textColor="primary">Even several unrelated values</Text>
              <CodePane lang="json" source={code.multiple} theme="dark" />
            </div>
          </Appear>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} lineHeight={1} textColor="primary">
            Everything represented by a strong type system
          </Heading>
          <Appear>
            <div>
              <CodePane lang="graphql" source={code.schema} theme="dark" />
            </div>
          </Appear>
        </Slide>
      </Deck>
    )
  }
}
