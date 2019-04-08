import React from 'react'

import {
  Appear,
  BlockQuote,
  Code,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Image,
  Slide,
  Text,
  CodePane,
} from 'spectacle'

import createTheme from 'spectacle/lib/themes/default'

require('normalize.css')

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
        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            while I talk
          </Heading>
          <Text textColor="tertiary">Go to</Text>
          <Code textColor="quaternary" size={3}>
            https://wrk.karl.run
          </Code>
          <Text textColor="tertiary">and check out the repository</Text>
          <Appear>
            <List textColor="tertiary">
              <ListItem>
                Java/Kotlin: <Code textColor="quaternary">./gradlew</Code>
              </ListItem>
              <ListItem>
                Node: <Code textColor="quaternary">yarn</Code>
              </ListItem>
              <ListItem>
                .NET Core: <Code textColor="quaternary">dotnet restore</Code>
              </ListItem>
            </List>
          </Appear>
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
        <Slide bgColor="tertiary">
          <Text textColor="primary" fit bold>
            #goals
          </Text>
          <Text margin="32px 0 0" textColor="secondary" size={1} fit bold>
            what you will do in this workshop
          </Text>
        </Slide>
        <Slide bgColor="secondary">
          <List textColor="tertiary">
            <Appear>
              <ListItem>
                Implement query resolvers
                <Text textColor="quaternary" margin="0 4rem 0" textSize="2rem">
                  Your classic "GET request endpoint"
                </Text>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Implement mutation resolvers
                <Text textColor="quaternary" margin="0 4rem 0" textSize="2rem">
                  Your classic "POST request endpoint"
                </Text>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Implement object resolvers
                <Text textColor="quaternary" margin="0 4rem 0" textSize="2rem">
                  Your "I have object X, how does it relate to Y" relationship.
                </Text>
              </ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Text textColor="primary" bold>
            next step
          </Text>
          <List textColor="tertiary" ordered>
            <Appear>
              <ListItem textSize="1.8rem">
                Get familiar with the code base, run the server, look at the build, interact with GraphiQL
                <Text textColor="quaternary" margin="0 4rem 0" textSize="1.5rem">
                  Play around!
                </Text>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textSize="1.8rem">Look at the goal description in the README in the repository</ListItem>
            </Appear>
            <Appear>
              <ListItem textSize="1.8rem">
                Start defining your schema and match a query resolver implementation to it
                <Text textColor="quaternary" margin="0 4rem 0" textSize="1.5rem">
                  If you don't want to spend time building mock datasources/clients, feel free to steal them from the
                  complete examples
                </Text>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textSize="1.8rem">
                Look at how mutations differ from queries, how are they implemented?
                <Text textColor="quaternary" margin="0 4rem 0" textSize="1.5rem">
                  Tip: They might not be very different
                </Text>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textSize="1.8rem">
                Define how two objects relate to each other, define a resolver between them and try to request them.
                <Text textColor="quaternary" margin="0 4rem 0" textSize="1.5rem">
                  Try making them circular!
                </Text>
              </ListItem>
            </Appear>
          </List>
        </Slide>
      </Deck>
    )
  }
}
