import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/index.css';

import App from './components/App';
import Login from './components/login/LoginForm';
import Signup from './components/login/SignupForm';
import UserNav from './components/UserNav';
import Settings from './components/settings/Settings';
import ListGroup from './components/lists/ListGroup';
import ListDetail from './components/lists/ListDetail';
import StartGame from './components/game/StartGame';
import requireAuth from './components/requireAuth';
import { AppProvider } from './components/AppProvider';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {}
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' });
// NOTE: stateLink should be before httpLink
// - If i would add the Apollo Link Error package, the stateLink should come after it,
const link = ApolloLink.from([stateLink, httpLink]);

// NOTE: if i pass id back from requests
// - dataIdFromObject will update data without having to re-request it
const client = new ApolloClient({
  cache,
  link,
  dataIdFromObject: o => o.id
});

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <AppProvider>
          <Switch>
            <App>
              <Route path="/" exact component={requireAuth(UserNav)} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/settings" component={requireAuth(Settings)} />
              <Route path="/lists" exact component={requireAuth(ListGroup)} />
              <Route path="/lists/:id" component={requireAuth(ListDetail)} />
              <Route path="/game" component={requireAuth(StartGame)} />
            </App>
          </Switch>
        </AppProvider>
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
