import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// NOTE: if i pass id back from requests, dataIdFromObject will update data without having to re-request it
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' }),
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

// test component for routing
const About = () => {
  return <h1>About</h1>;
};

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Switch>
            <App>
              <Route path="/about" component={About} />
            </App>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
