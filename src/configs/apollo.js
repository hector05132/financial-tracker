import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/",
});

// Cache implementation
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  // Leer el storage almacenado
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});
// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;
