import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
