import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${JSON.parse(token).access_token}` : null
  return {
    headers: {
      ...headers,
      authorization: authorizationHeader,
    }
  }
});

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  createUploadLink({
    uri: GRAPHQL_URI,
    fetchOptions: {
      mode: 'cors',
    },
  }),
]);

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
