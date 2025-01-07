import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://192.168.11.16:3000/graphql",
  cache: new InMemoryCache(),
});
